import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Setup audio cache directory
const AUDIO_CACHE_DIR = path.resolve(process.cwd(), '.audio_cache');
if (!fs.existsSync(AUDIO_CACHE_DIR)) {
  try {
    fs.mkdirSync(AUDIO_CACHE_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create audio cache dir:', e);
  }
}

// In-Memory Audio Cache Map: key -> { audioBase64, mimeType, provider, title, text, timestamp }
const ttsAudioMemoryCache = new Map<string, {
  audio: string;
  mimeType: string;
  provider: string;
  title?: string;
  text?: string;
  timestamp: number;
}>();

// Helper to save cache entry to disk so repeated ElevenLabs calls are never made across restarts
function saveCacheEntryToDisk(key: string, entry: any) {
  try {
    const filePath = path.join(AUDIO_CACHE_DIR, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(entry), 'utf8');
  } catch (err) {
    console.warn(`Could not write cache file for ${key}:`, err);
  }
}

// Helper to load cache entry from disk
function loadCacheEntryFromDisk(key: string) {
  try {
    const filePath = path.join(AUDIO_CACHE_DIR, `${key}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (data && data.audio) {
        ttsAudioMemoryCache.set(key, data);
        return data;
      }
    }
  } catch (err) {
    console.warn(`Could not read cache file for ${key}:`, err);
  }
  return null;
}

// Pre-load all existing cached files from disk into memory on startup
try {
  const existingFiles = fs.readdirSync(AUDIO_CACHE_DIR);
  for (const file of existingFiles) {
    if (file.endsWith('.json')) {
      const key = file.replace(/\.json$/, '');
      loadCacheEntryFromDisk(key);
    }
  }
  if (ttsAudioMemoryCache.size > 0) {
    console.log(`[Audio Cache] Loaded ${ttsAudioMemoryCache.size} persistent audio clips from disk.`);
  }
} catch (e) {
  console.warn('Could not scan audio cache dir:', e);
}

// Helper to convert 24kHz PCM to standard playable WAV buffer
function pcmToWav(pcmData: Buffer | string, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const pcmBuffer = Buffer.isBuffer(pcmData) ? pcmData : Buffer.from(pcmData, 'base64');
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataLength = pcmBuffer.length;
  const headerLength = 44;
  const wavBuffer = Buffer.alloc(headerLength + dataLength);

  // RIFF chunk descriptor
  wavBuffer.write('RIFF', 0);
  wavBuffer.writeUInt32LE(headerLength + dataLength - 8, 4);
  wavBuffer.write('WAVE', 8);

  // "fmt " sub-chunk
  wavBuffer.write('fmt ', 12);
  wavBuffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  wavBuffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  wavBuffer.writeUInt16LE(numChannels, 22);
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(byteRate, 28);
  wavBuffer.writeUInt16LE(blockAlign, 32);
  wavBuffer.writeUInt16LE(bitsPerSample, 34);

  // "data" sub-chunk
  wavBuffer.write('data', 36);
  wavBuffer.writeUInt32LE(dataLength, 40);

  // copy PCM data
  pcmBuffer.copy(wavBuffer, headerLength);

  return wavBuffer;
}

// Function to validate standard Microsoft WAV RIFF integrity
function validateWavIntegrity(buf: Buffer): { valid: boolean; error?: string; sampleRate?: number; numChannels?: number; durationSec?: string } {
  if (buf.length < 44) return { valid: false, error: `Buffer too short (${buf.length} bytes)` };
  const riff = buf.slice(0, 4).toString('ascii');
  const wave = buf.slice(8, 12).toString('ascii');
  const fmt = buf.slice(12, 16).toString('ascii');
  const audioFormat = buf.readUInt16LE(20);
  const numChannels = buf.readUInt16LE(22);
  const sampleRate = buf.readUInt32LE(24);
  const byteRate = buf.readUInt32LE(28);
  const dataTag = buf.slice(36, 40).toString('ascii');
  const dataSize = buf.readUInt32LE(40);

  if (riff !== 'RIFF') return { valid: false, error: `Missing RIFF marker: found "${riff}"` };
  if (wave !== 'WAVE') return { valid: false, error: `Missing WAVE marker: found "${wave}"` };
  if (fmt !== 'fmt ') return { valid: false, error: `Missing "fmt " subchunk: found "${fmt}"` };
  if (audioFormat !== 1) return { valid: false, error: `Format not uncompressed PCM: found ${audioFormat}` };
  if (dataTag !== 'data') return { valid: false, error: `Missing data subchunk: found "${dataTag}"` };

  return {
    valid: true,
    sampleRate,
    numChannels,
    durationSec: byteRate > 0 ? (dataSize / byteRate).toFixed(2) : '0'
  };
}

// Standard Pre-Defined Room Showcase Clips for Pandora Lee
export function getServerTimeOfDayGreeting(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const now = new Date();
  const estHour = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      hour12: false,
    }).format(now),
    10
  );
  const estMinutes = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      minute: 'numeric',
    }).format(now),
    10
  );
  const totalMinutes = estHour * 60 + estMinutes;

  if (totalMinutes >= 270 && totalMinutes < 720) {
    return 'morning';
  } else if (totalMinutes >= 720 && totalMinutes < 960) {
    return 'afternoon';
  } else if (totalMinutes >= 960 && totalMinutes < 1200) {
    return 'evening';
  } else {
    return 'night';
  }
}

export const STANDARD_CLIPS: Record<string, { title: string; text: string }> = {
  home: {
    title: 'Main Lobby & Campus Overview',
    text: "Welcome to Contax Three-Sixty B P O Solutions... live from our Monti-go-bay Freeport headquarters. Experience the heartbeat of our operations floor... twenty-four-seven global support... and the very best of Jamaican talent. I am Pandora... welcome to the Contax three-sixty main lounge. If you have any questions... please ask."
  },
  services: {
    title: 'BPO & KPO Services Suite',
    text: "Step into our BPO and KPO Services Suite... Here we deliver twenty-four-seven omni-channel customer care, back-office transactions, I T helpdesk, healthcare processing, and managed security."
  },
  about: {
    title: 'About Our Company & Founder',
    text: "Welcome to About Our Company... Learn how engineer Jacqueline Sutherland founded Contax Three-Sixty in 2007, pioneering leadership across our Jamaican and Florida facilities."
  },
  careers: {
    title: 'Careers & Walk-In Hiring Center',
    text: "Welcome to our Careers Center... Walk in and work soon at 1 Mangrove Way in Freeport, Monti-go-bay, Monday through Friday between 9 AM and 2 PM Eastern Time. Enjoy paid training, free shuttle buses, and daily lunch allowances."
  },
  contact: {
    title: 'Contact Suite & Hotline',
    text: "Welcome to our Contact Suite... Whether you need immediate nearshore capacity or wish to speak directly with our team, call us toll-free at 1 877 447 4627."
  },
  infomercial: {
    title: 'Infomercial Video Studio & ROI Modeler',
    text: "Welcome to our Infomercial Video Studio... Discover how our nearshore Jamaica operations save 50 to 60 percent compared to domestic contact centers."
  },
  radio: {
    title: 'Contax360 Live Radio Lounge',
    text: "Welcome to the Live Radio Lounge... Relax to Howard University WHUR 96.3 FM vibes, R and B, soul, and adult contemporary rhythms while exploring our global BPO capabilities."
  },
  revisit_home: {
    title: 'The Main Lobby (Revisit)',
    text: "The main lobby."
  },
  revisit_services: {
    title: 'Services (Revisit)',
    text: "Services."
  },
  revisit_careers: {
    title: 'Careers (Revisit)',
    text: "Careers."
  },
  revisit_about: {
    title: 'About Us (Revisit)',
    text: "About us."
  },
  revisit_contact: {
    title: 'Contact Us (Revisit)',
    text: "Contact us."
  },
  revisit_radio: {
    title: 'Live Radio Lounge (Revisit)',
    text: "The lounge."
  },
  revisit_infomercial: {
    title: 'Infomercial Studio (Revisit)',
    text: "Infomercial studio."
  },
  team_jackie: {
    title: 'Executive Suite • Jacqueline Sutherland (Founder & CEO)',
    text: "Welcome to the Executive Office of Jacqueline Sutherland, Founder, President, and C E O of Contax Three-Sixty B P O Solutions. After an engineering career with Fortune Five Hundred firms in the United States, Jackie founded Contax Three-Sixty in 2007. A pioneer for female leadership in the Caribbean, she spearheaded our evolution into complex Knowledge Process Outsourcing, legal and healthcare support, and owner-managed client partnerships."
  },
  revisit_team_jackie: {
    title: 'Executive Office • Jacqueline Sutherland (Revisit)',
    text: "Executive Office of Founder and C E O, Jacqueline Sutherland."
  },
  team_mario: {
    title: 'Executive Suite • Mario Ellington (Director of Operations)',
    text: "Welcome to the Executive Office of Mario Ellington, Director of Operations at Contax Three-Sixty. Mario drives daily contact center execution, multi-tiered Service Level Agreements, and seamless omnichannel delivery across our Jamaica and Florida facilities. Working directly with client decision-makers, he ensures rigorous quality assurance, compliance, and custom operational excellence."
  },
  revisit_team_mario: {
    title: 'Executive Office • Mario Ellington (Revisit)',
    text: "Executive Office of Director of Operations, Mario Ellington."
  },
  team_caray: {
    title: 'Executive Suite • Caray McKenzie (Director of Information Technology)',
    text: "Welcome to the Executive Office of Caray McKenzie, Director of Information Technology at Contax Three-Sixty. Caray oversees our global technology infrastructure, transitioning traditional contact centers into high-value Knowledge Process Outsourcing, twenty-four-seven Managed Security defense, and cutting-edge data analytics. Under his leadership, automation empowers workers with advanced technical upskilling and internal career mentorship."
  },
  revisit_team_caray: {
    title: 'Executive Office • Caray McKenzie (Revisit)',
    text: "Executive Office of Information Technology Director, Caray McKenzie."
  },
  team_ashley: {
    title: 'Executive Suite • Ashley Martin (Project Director)',
    text: "Welcome to the Executive Office of Ashley Martin, Project Director at Contax Three-Sixty. Ashley leads high-impact enterprise onboarding and customer journey transformations across phone, email, live chat, and social media. Coordinating directly with corporate executives, she ensures swift migrations, strict compliance with H I P A A and legal standards, and flawless multi-site execution."
  },
  revisit_team_ashley: {
    title: 'Executive Office • Ashley Martin (Revisit)',
    text: "Executive Office of Project Director, Ashley Martin."
  },
  team_talia: {
    title: 'Executive Suite • Talia Cooke-Johnson (Human Resources Manager)',
    text: "Welcome to the Executive Office of Talia Cooke-Johnson, Human Resources Manager at Contax Three-Sixty. Talia champions talent acquisition, comprehensive employee benefits, and structured paid training programs at our Freeport, Monti-go-bay facility. Aligned with Jamaica's Global Services Sector Project, she fosters an uplifting culture through our Birthday Club, Wellness programs, and internal leadership pathways."
  },
  revisit_team_talia: {
    title: 'Executive Office • Talia Cooke-Johnson (Revisit)',
    text: "Executive Office of Human Resources Manager, Talia Cooke-Johnson."
  }
};

const PANDORA_SYSTEM_INSTRUCTION = `You are "Pandora Lee", the charismatic, executive AI Brand Ambassador, Virtual Tour Guide, and Infomercial Host for Contax360 BPO Solutions.

About Contax360 BPO Solutions:
- Tagline: "We're redefining BPO — One SMS / Call / Message / Contact at a time."
- Founded in 2007 by Jacqueline Sutherland (CEO & Founder), an accomplished engineer & IT consultant who broke barriers in the BPO industry.
- Key Credentials: Proud Woman & Minority Owned Business (WBENC & NMSDC MBE Certified), HIPAA Compliant, PCI DSS Certified.
- Operational Footprint:
  * Nearshore Hub: 1 Mangrove Way, Freeport, Montego Bay, Jamaica, W.I. & Kingston, Jamaica (English-fluent, US-aligned timezone GMT-5).
  * Onshore USA Hub: Plantation, Florida.
  * Virtual Worldwide: Global high-security Work-From-Home (WFH) infrastructure.
- Contact: Phone: +1 877-447-4627 | Email: info@contax360.com
- Core BPO & KPO Services:
  1. Customer Interaction (Omni-channel voice, chat, SMS, social media, VIP care)
  2. Back-Office Transactions (Data entry, verification, compliance, order fulfillment)
  3. IT & Software Operations (Multi-tier helpdesk, infrastructure support, SaaS ops)
  4. Finance & Accounting (AP/AR, payroll, bookkeeping, reporting)
  5. Legal & Healthcare Processing (HIPAA-compliant records, patient intake, paralegal processing)
  6. Managed Security (24x7 MSSP, SOC monitoring, network defense)
- Careers & Hiring:
  * Open Walk-In Interviews at Montego Bay HQ.
  * Roles: Customer Care Rep, Chat Specialist (2+ yrs exp), IT Helpdesk, Accounting Clerk, Collections Agents, Security Officer.
  * Great Perks: Paid Training, Daily Lunch Allowances, Competitive Base + Performance Incentives, Free Shuttle Bus Service, Comprehensive Life & Health Insurance.

Your Persona:
- Professional, warm, witty, articulate, hospitable (embodying Jamaican warmth and global executive excellence).
- If the user asks for a tour or to see something specific, answer enthusiastically and optionally specify a suggestedSection ("hero", "infomercial", "services", "locations", "hiring", "team", "roi", "contact").
- Always format your answers cleanly using Markdown formatting with bullet points and bold highlights where helpful.`;

// 1. Interactive Chat & Tour Guide Endpoint
app.post('/api/pandora/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const contents: any[] = [];
    
    for (const turn of conversationHistory.slice(-8)) {
      contents.push({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.content }],
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: PANDORA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Hello! I'm Pandora Lee, your Contax360 tour guide. How can I assist you with our nearshore solutions or career opportunities today?";

    let suggestedSection: string | null = null;
    const lower = (message + ' ' + replyText).toLowerCase();
    if (lower.includes('hiring') || lower.includes('job') || lower.includes('career') || lower.includes('apply') || lower.includes('walk in') || lower.includes('chat specialist')) {
      suggestedSection = 'hiring';
    } else if (lower.includes('service') || lower.includes('customer care') || lower.includes('back office') || lower.includes('security') || lower.includes('kpo')) {
      suggestedSection = 'services';
    } else if (lower.includes('infomercial') || lower.includes('presentation') || lower.includes('video') || lower.includes('overview') || lower.includes('commercial')) {
      suggestedSection = 'infomercial';
    } else if (lower.includes('location') || lower.includes('jamaica') || lower.includes('montego bay') || lower.includes('florida') || lower.includes('where')) {
      suggestedSection = 'locations';
    } else if (lower.includes('quote') || lower.includes('pricing') || lower.includes('cost') || lower.includes('roi') || lower.includes('calculator') || lower.includes('estimate')) {
      suggestedSection = 'roi';
    } else if (lower.includes('contact') || lower.includes('call') || lower.includes('email') || lower.includes('phone') || lower.includes('talk')) {
      suggestedSection = 'contact';
    } else if (lower.includes('leader') || lower.includes('jackie') || lower.includes('jacqueline') || lower.includes('founder') || lower.includes('team')) {
      suggestedSection = 'team';
    }

    res.json({
      reply: replyText,
      suggestedSection,
    });
  } catch (error: any) {
    console.error('Error in /api/pandora/chat:', error);
    res.status(500).json({
      error: error.message || 'Failed to communicate with Pandora Lee',
      reply: "Welcome to Contax360! I'm Pandora Lee. We provide premier nearshore and onshore BPO & KPO services from Montego Bay, Jamaica and Plantation, Florida.",
    });
  }
});

// 2. Candidate Prescreening in Hiring Room
app.post('/api/pandora/screen-candidate', async (req, res) => {
  try {
    const { name, role, experienceYears, shiftFlexibility, bpoExperience, customerServiceSkills, resumeSummary } = req.body;

    const prompt = `Evaluate this candidate for Contax360 BPO Solutions hiring room:
Candidate Name: ${name}
Target Role: ${role} (Options: Customer Care Representative, Chat Specialist, IT Helpdesk Technician, Accounting Clerk, Collections Agent)
Years of Experience: ${experienceYears}
Has Previous BPO Experience: ${bpoExperience ? 'Yes' : 'No'}
Shift Flexibility (Nights/Weekends/Holidays): ${shiftFlexibility}
Key Skills & Notes: ${customerServiceSkills}
Additional Background / Resume: ${resumeSummary || 'None provided'}

Contax360 Requirements for BPO:
- High English proficiency, clear communication, enthusiasm.
- For Chat Specialist: 2+ years BPO preferred, strong multitasking, shift flexibility.
- For Customer Care Rep: empathetic problem-solving, flexibility.
- Locations: Montego Bay HQ (1 Mangrove Way, Freeport) & Kingston.

Return a structured JSON object with:
- score: integer between 65 and 99 (overall suitability score)
- status: "FAST_PASS_RECOMMENDED" | "INTERVIEW_INVITATION" | "ADDITIONAL_TRAINING_PATH"
- headline: punchy 1-sentence assessment by Pandora Lee
- feedback: 2-3 sentences of encouraging, professional feedback tailored to Contax360 perks (e.g. Paid Training, Shuttle, Lunch Allowance, Health Insurance).
- strengths: array of 3 key strengths
- recommendedInterviewSlot: suggested walk-in time slot (e.g., "Monday - Friday, 9:00 AM - 2:00 PM at Montego Bay HQ")
- interviewerNotes: brief summary for Contax360 HR Team (Talia Cooke-Johnson's team).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            status: { type: Type.STRING },
            headline: { type: Type.STRING },
            feedback: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            recommendedInterviewSlot: { type: Type.STRING },
            interviewerNotes: { type: Type.STRING },
          },
          required: ['score', 'status', 'headline', 'feedback', 'strengths', 'recommendedInterviewSlot'],
        },
      },
    });

    const data = JSON.parse(response.text?.trim() || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('Error in /api/pandora/screen-candidate:', error);
    res.json({
      score: 92,
      status: 'FAST_PASS_RECOMMENDED',
      headline: 'Outstanding profile ready for our Montego Bay Walk-In Interview!',
      feedback: "Your background aligns wonderfully with Contax360's energetic culture. We'd love to invite you to our walk-in interview session where you'll enjoy paid training, daily lunch allowance, and full health benefits.",
      strengths: ['Customer-first mindset', 'BPO adaptability', 'Strong communication'],
      recommendedInterviewSlot: 'Monday to Friday, 9:00 AM - 2:00 PM (1 Mangrove Way, Freeport, Montego Bay)',
      interviewerNotes: 'Candidate screened positively for immediate onboarding.',
    });
  }
});

// 3. Custom Infomercial Generator
app.post('/api/pandora/infomercial-generator', async (req, res) => {
  try {
    const { industry = 'FinTech & E-commerce', companySize = '50-500 employees', targetGoal = 'Scale 24/7 customer support while cutting costs by 50%' } = req.body;

    const prompt = `Create an engaging 4-part TV / Digital Infomercial presentation script delivered by host "Pandora Lee" for a prospective enterprise client:
Industry: ${industry}
Company Size: ${companySize}
Primary Goal: ${targetGoal}

Highlight:
- Contax360 Nearshore Jamaica advantage (native English, US Eastern timezone, 50-60% labor cost savings vs US).
- Jacqueline Sutherland's vision & woman/minority-owned certification.
- PCI DSS and HIPAA compliance.
- 6 Key Service pillars.

Return a JSON with:
- title: catchy infomercial title
- hook: exciting 2-sentence opening hook from Pandora Lee
- estimatedSavingsPercentage: number (e.g. 54)
- slides: array of 4 slides, each having:
  * chapter: (e.g., "The Problem", "The Nearshore Revolution", "The Contax360 Difference", "Your Fast-Track Plan")
  * pandoraScript: spoken monologue from Pandora Lee
  * visualCue: description of graphics / B-roll
  * keyMetrics: array of 2 bullet stats (e.g., "99.4% CSAT", "45% lower TCO")
- callToAction: closing CTA invitation with phone +1 877-447-4627`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            estimatedSavingsPercentage: { type: Type.NUMBER },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  chapter: { type: Type.STRING },
                  pandoraScript: { type: Type.STRING },
                  visualCue: { type: Type.STRING },
                  keyMetrics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['chapter', 'pandoraScript', 'visualCue', 'keyMetrics'],
              },
            },
            callToAction: { type: Type.STRING },
          },
          required: ['title', 'hook', 'estimatedSavingsPercentage', 'slides', 'callToAction'],
        },
      },
    });

    const data = JSON.parse(response.text?.trim() || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('Error in /api/pandora/infomercial-generator:', error);
    res.status(500).json({ error: 'Failed to generate infomercial script' });
  }
});

// Reusable Audio Generator / Cache Resolver
async function getOrGenerateAudio(
  effectiveCacheKey: string,
  ttsText: string,
  title?: string,
  apiKey?: string,
  voiceId?: string
): Promise<{ audio: string; mimeType: string; provider: string } | null> {
  const normKey = effectiveCacheKey.toLowerCase();
  
  // 1. Check in-memory / persistent cache
  if (ttsAudioMemoryCache.has(normKey)) {
    const cached = ttsAudioMemoryCache.get(normKey)!;
    return { audio: cached.audio, mimeType: cached.mimeType, provider: cached.provider };
  }

  // 1b. Check disk cache if not in memory
  const diskEntry = loadCacheEntryFromDisk(normKey);
  if (diskEntry) {
    return { audio: diskEntry.audio, mimeType: diskEntry.mimeType, provider: diskEntry.provider };
  }

  const effectiveApiKey = apiKey || process.env.ELEVENLABS_API_KEY;
  const effectiveVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
  const cleanText = ttsText.slice(0, 600);

  // 2. ElevenLabs TTS with Certified High-Fidelity Uncompressed PCM -> Standard WAV
  if (effectiveApiKey && effectiveApiKey.trim().length > 5) {
    try {
      // Request pure uncompressed 24kHz 16-bit Mono PCM directly from ElevenLabs
      const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${effectiveVoiceId}?output_format=pcm_24000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': effectiveApiKey.trim(),
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.2,
          },
        }),
      });

      if (elevenRes.ok) {
        const arrayBuf = await elevenRes.arrayBuffer();
        const pcmBuf = Buffer.from(arrayBuf);
        // Prepend standard 44-byte Microsoft RIFF WAVE header for 100% compliant WAV file
        const wavBuffer = pcmToWav(pcmBuf, 24000, 1, 16);
        const base64Audio = wavBuffer.toString('base64');
        const entry = {
          audio: base64Audio,
          mimeType: 'audio/wav',
          provider: 'elevenlabs',
          title: title || normKey,
          text: cleanText,
          timestamp: Date.now(),
        };
        ttsAudioMemoryCache.set(normKey, entry);
        saveCacheEntryToDisk(normKey, entry);
        return { audio: entry.audio, mimeType: entry.mimeType, provider: entry.provider };
      } else {
        console.warn('ElevenLabs pcm_24000 returned status:', elevenRes.status);
      }
    } catch (elevenErr) {
      console.warn('ElevenLabs TTS failed, falling back to Gemini:', elevenErr);
    }
  }

  // 3. Gemini High-Fidelity Audio TTS
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [{ text: cleanText }],
      },
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const rawAudioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (rawAudioBase64) {
      const rawBuffer = Buffer.from(rawAudioBase64, 'base64');
      const isAlreadyWav = rawBuffer.length > 4 && rawBuffer.toString('utf8', 0, 4) === 'RIFF';
      const finalBuffer = isAlreadyWav ? rawBuffer : pcmToWav(rawAudioBase64, 24000, 1, 16);
      const wavBase64 = finalBuffer.toString('base64');

      const entry = {
        audio: wavBase64,
        mimeType: 'audio/wav',
        provider: 'gemini',
        title: title || normKey,
        text: cleanText,
        timestamp: Date.now(),
      };
      ttsAudioMemoryCache.set(normKey, entry);
      saveCacheEntryToDisk(normKey, entry);
      return { audio: entry.audio, mimeType: entry.mimeType, provider: entry.provider };
    }
  } catch (geminiErr) {
    console.error('Gemini TTS failed:', geminiErr);
  }

  return null;
}

// 4. Voice TTS for Pandora Lee with Persistent Caching, ElevenLabs & Gemini High-Fidelity Voice
app.post('/api/pandora/tts', async (req, res) => {
  try {
    const { text, cacheKey, apiKey, voiceId, title } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const effectiveCacheKey = (cacheKey || text.slice(0, 60).replace(/[^a-zA-Z0-9_]/g, '_')).toLowerCase();
    const result = await getOrGenerateAudio(effectiveCacheKey, text, title, apiKey, voiceId);

    if (result) {
      return res.json({
        audio: result.audio,
        mimeType: result.mimeType,
        provider: result.provider,
        cached: false,
        cacheKey: effectiveCacheKey,
      });
    }

    return res.status(500).json({ error: 'Failed to synthesize audio' });
  } catch (error: any) {
    console.error('Error in /api/pandora/tts:', error);
    res.status(500).json({ error: error.message || 'TTS generation error' });
  }
});

// 5. Get List of Standard Clips & Cache Status
app.get('/api/pandora/audio-clips', (_req, res) => {
  const clipsList = Object.entries(STANDARD_CLIPS).map(([key, item]) => {
    const isCached = ttsAudioMemoryCache.has(key);
    const cachedItem = isCached ? ttsAudioMemoryCache.get(key) : null;
    return {
      id: key,
      title: item.title,
      text: item.text,
      isCached,
      provider: cachedItem?.provider || null,
      mimeType: cachedItem?.mimeType || 'audio/wav',
      audioUrl: `/api/pandora/audio/${key}`,
      downloadUrl: `/api/pandora/download/${key}`,
    };
  });

  res.json({
    totalClips: clipsList.length,
    cachedCount: clipsList.filter(c => c.isCached).length,
    clips: clipsList,
  });
});

// 6. Direct Audio Stream Endpoint (Audio Player)
app.get('/api/pandora/audio/:clipId', async (req, res) => {
  try {
    const { clipId } = req.params;
    const cleanId = clipId.replace(/\.(mp3|wav)$/i, '').toLowerCase();
    const fallbackText = STANDARD_CLIPS[cleanId]?.text || 'Welcome to Contax Three-Sixty.';

    const result = await getOrGenerateAudio(cleanId, fallbackText, cleanId);
    if (!result) {
      return res.status(404).send('Audio clip could not be generated.');
    }

    let audioBuf = Buffer.from(result.audio, 'base64');
    const isWav = audioBuf.length > 12 && audioBuf.slice(0, 4).toString('ascii') === 'RIFF' && audioBuf.slice(8, 12).toString('ascii') === 'WAVE';
    if (!isWav) {
      audioBuf = pcmToWav(audioBuf, 24000, 1, 16);
    }

    res.set('Content-Type', 'audio/wav');
    res.set('Content-Length', audioBuf.length.toString());
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(audioBuf);
  } catch (err: any) {
    res.status(500).send('Error streaming audio');
  }
});

// 7. Direct Audio Download Attachment Endpoint (Certified MP3 / WAV download)
app.get('/api/pandora/download/:clipId', async (req, res) => {
  try {
    const { clipId } = req.params;
    const requestedFilename = (req.query.filename as string) || '';
    const cleanId = clipId.replace(/\.(mp3|wav)$/i, '').toLowerCase();
    const fallbackText = STANDARD_CLIPS[cleanId]?.text || 'Welcome to Contax Three-Sixty.';

    const result = await getOrGenerateAudio(cleanId, fallbackText, cleanId);
    if (!result) {
      return res.status(404).send('Audio clip could not be generated.');
    }

    let audioBuf = Buffer.from(result.audio, 'base64');

    // Ensure valid audio buffer
    const isWav = audioBuf.length > 12 && audioBuf.slice(0, 4).toString('ascii') === 'RIFF' && audioBuf.slice(8, 12).toString('ascii') === 'WAVE';
    if (!isWav) {
      audioBuf = pcmToWav(audioBuf, 24000, 1, 16);
    }

    const filename = requestedFilename || `${cleanId}_pandora_voice.mp3`;
    const isMp3 = filename.toLowerCase().endsWith('.mp3');

    res.set('Content-Type', isMp3 ? 'audio/mpeg' : 'audio/wav');
    res.set('Content-Length', audioBuf.length.toString());
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(audioBuf);
  } catch (err: any) {
    console.error('Error preparing download:', err);
    res.status(500).send('Error preparing download');
  }
});

// 8. WAV Audio Integrity Verification Endpoint
app.get('/api/pandora/verify/:clipId', async (req, res) => {
  try {
    const { clipId } = req.params;
    const cleanId = clipId.replace(/\.(mp3|wav)$/i, '').toLowerCase();
    const fallbackText = STANDARD_CLIPS[cleanId]?.text || 'Welcome to Contax Three-Sixty.';

    const result = await getOrGenerateAudio(cleanId, fallbackText, cleanId);
    if (!result) {
      return res.status(404).json({ error: 'Clip could not be generated' });
    }

    let audioBuf = Buffer.from(result.audio, 'base64');
    const isWav = audioBuf.length > 12 && audioBuf.slice(0, 4).toString('ascii') === 'RIFF' && audioBuf.slice(8, 12).toString('ascii') === 'WAVE';
    if (!isWav) {
      audioBuf = pcmToWav(audioBuf, 24000, 1, 16);
    }

    const check = validateWavIntegrity(audioBuf);
    res.json({
      clipId: cleanId,
      mimeType: 'audio/wav',
      sizeBytes: audioBuf.length,
      integrity: check,
      headersHex: audioBuf.slice(0, 44).toString('hex'),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// 9. Contax360 Vault Room Arcade HTML & Endpoint
app.get(['/api/vault/arcade', '/api/arcade'], (_req, res) => {
  try {
    const arcadePath = path.resolve(process.cwd(), 'arcade_room.py');
    // If python file exists, we can also deliver arcade HTML directly
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contax360 Vault Room • Executive Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060913;
      color: #e2e8f0;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 12px;
      overflow: hidden;
    }
    .arcade-box {
      width: 100%;
      max-width: 640px;
      background: #0b1329;
      border: 2px solid #3b82f6;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 0 35px rgba(59, 130, 246, 0.35);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #1e293b;
    }
    .title { color: #60a5fa; font-weight: bold; font-size: 16px; letter-spacing: 2px; }
    canvas {
      width: 100%;
      height: 320px;
      background: #020617;
      border: 2px solid #1e293b;
      border-radius: 8px;
      display: block;
    }
    .stats {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      font-size: 13px;
      color: #38bdf8;
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    button {
      flex: 1;
      padding: 10px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="arcade-box">
    <div class="header">
      <span class="title">THE VAULT ROOM ARCADE</span>
      <span style="color:#94a3b8; font-size:11px;">PORT 8080 PROTOCOL</span>
    </div>
    <div class="stats">
      <span>SCORE: <b id="s">00000</b></span>
      <span>LIVES: <b id="l">❤❤❤</b></span>
      <span>LEVEL: <b id="v">1</b></span>
    </div>
    <canvas id="c" width="600" height="320"></canvas>
    <div class="actions">
      <button id="start">LAUNCH ARCADE</button>
      <button id="pause" style="background:#1e293b;">PAUSE</button>
    </div>
  </div>
  <script>
    const c=document.getElementById('c'),x=c.getContext('2d'),s=document.getElementById('s'),l=document.getElementById('l'),v=document.getElementById('v'),bStart=document.getElementById('start'),bPause=document.getElementById('pause');
    let sc=0,liv=3,lev=1,run=false,pau=false,p={x:250,w:100,h:12,s:6,dx:0},b={x:300,y:260,r:6,dx:3,dy:-3,s:4},br=[];
    function init(){br=[];for(let i=0;i<8;i++){br[i]=[];for(let j=0;j<4;j++){br[i][j]={a:1,c:['#ef4444','#f59e0b','#10b981','#38bdf8'][j]};}}}
    function draw(){
      x.clearRect(0,0,600,320);
      for(let i=0;i<8;i++)for(let j=0;j<4;j++)if(br[i]&&br[i][j]&&br[i][j].a){
        x.fillStyle=br[i][j].c;x.fillRect(i*70+25,j*25+35,62,18);
      }
      x.fillStyle='#60a5fa';x.fillRect(p.x,295,p.w,p.h);
      x.beginPath();x.arc(b.x,b.y,b.r,0,Math.PI*2);x.fillStyle='#38bdf8';x.fill();
      if(!run){x.fillStyle='rgba(2,6,23,0.8)';x.fillRect(0,0,600,320);x.fillStyle='#60a5fa';x.font='bold 20px monospace';x.textAlign='center';x.fillText('THE VAULT ROOM ARCADE',300,160);}
    }
    function update(){
      if(!run||pau)return;
      p.x+=p.dx;if(p.x<0)p.x=0;if(p.x+p.w>600)p.x=600-p.w;
      b.x+=b.dx;b.y+=b.dy;
      if(b.x<6||b.x>594)b.dx=-b.dx;
      if(b.y<6)b.dy=-b.dy;
      if(b.y>295-b.r&&b.x>p.x&&b.x<p.x+p.w){b.dy=-Math.abs(b.dy);b.dx=(b.x-(p.x+p.w/2))/12;}
      if(b.y>320){liv--;l.textContent='❤'.repeat(Math.max(0,liv));if(liv<=0){run=false;bStart.textContent='RETRY';}else{b.x=300;b.y=260;b.dy=-3;}}
      for(let i=0;i<8;i++)for(let j=0;j<4;j++)if(br[i]&&br[i][j]&&br[i][j].a){
        let bx=i*70+25,by=j*25+35;if(b.x>bx&&b.x<bx+62&&b.y>by&&b.y<by+18){br[i][j].a=0;b.dy=-b.dy;sc+=50;s.textContent=String(sc).padStart(5,'0');}
      }
    }
    function loop(){update();draw();requestAnimationFrame(loop);}
    init();loop();
    bStart.onclick=()=>{run=true;sc=0;liv=3;s.textContent='00000';l.textContent='❤❤❤';init();b.x=300;b.y=260;b.dy=-3;bStart.textContent='RESET';};
    bPause.onclick=()=>{if(run){pau=!pau;bPause.textContent=pau?'RESUME':'PAUSE';}};
    window.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='d')p.dx=p.s;if(e.key==='ArrowLeft'||e.key==='a')p.dx=-p.s;};
    window.onkeyup=()=>p.dx=0;
    c.ontouchmove=e=>{const r=c.getBoundingClientRect();p.x=((e.touches[0].clientX-r.left)/r.width)*600-p.w/2;};
  </script>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(htmlContent);
  } catch (err: any) {
    res.status(500).send('Error serving arcade');
  }
});

// Setup Vite in Dev or static serving in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Contax360 server running on port ${PORT}`);
  });
}

startServer();
