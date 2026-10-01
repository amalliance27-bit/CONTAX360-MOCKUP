// Contax360 Pandora Lee Audio Coordinator & Persistent Voice Cache

export interface CachedAudioEntry {
  key: string;
  title: string;
  text: string;
  dataUri: string;
  mimeType: string;
  provider: 'elevenlabs' | 'gemini' | 'browser';
  timestamp: number;
}

export function getTimeOfDayGreeting(): 'morning' | 'afternoon' | 'evening' | 'night' {
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

  // 4:30 AM (270 min) to 12:00 PM (720 min) = morning
  // 12:00 PM (720 min) to 4:00 PM (960 min) = afternoon
  // 4:00 PM (960 min) to 8:00 PM (1200 min) = evening
  // 8:00 PM (1200 min) to 4:30 AM = night
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

export function getFormattedEstTime(): string {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return timeFormatter.format(now);
}

export const MAIN_LOBBY_EVERGREEN_SCRIPT = "Welcome to Contax Three-Sixty B P O Solutions... live from our Monti-go-bay Freeport headquarters. Experience the heartbeat of our operations floor... twenty-four-seven global support... and the very best of Jamaican talent. I am Pandora... welcome to the Contax three-sixty main lounge. If you have any questions... please ask.";

export function getMainLobbyGreetingText(): string {
  return MAIN_LOBBY_EVERGREEN_SCRIPT;
}

export function getOptionalTimeSnippet(): string {
  const currentTime = getFormattedEstTime();
  return `The time is now ${currentTime}...`;
}

// 1. FULL FIRST-TIME INTRO SCRIPTS FOR EACH ROOM (Static Evergreen Templates for maximum caching & minimal ElevenLabs API calls)
export const ROOM_INTRO_SCRIPTS: Record<string, { title: string; roomId: string; text: string; bullet: string }> = {
  home: {
    title: 'Main Lobby & Campus Overview',
    roomId: 'home',
    text: MAIN_LOBBY_EVERGREEN_SCRIPT,
    bullet: 'Monti-go-bay HQ • 17+ Years Legacy • Nearshore Excellence'
  },
  services: {
    title: 'BPO & KPO Services Suite',
    roomId: 'services',
    text: "Step into our BPO and KPO Services Suite... Here we deliver twenty-four-seven omni-channel customer care, back-office transactions, I T helpdesk, healthcare processing, and managed security.",
    bullet: '6 Core Pillars • Omni-Channel • HIPAA & PCI DSS'
  },
  careers: {
    title: 'Careers & Walk-In Hiring Center',
    roomId: 'careers',
    text: "Welcome to our Careers Center... Walk in and work soon at 1 Mangrove Way in Freeport, Monti-go-bay, Monday through Friday between 9 AM and 2 PM Eastern Time. Enjoy paid training, free shuttle buses, and daily lunch allowances.",
    bullet: 'Daily Walk-Ins 9am-2pm EST • Chat Specialist • Paid Training'
  },
  about: {
    title: 'About Our Company & Founder',
    roomId: 'about',
    text: "Welcome to About Our Company... Learn how engineer Jacqueline Sutherland founded Contax Three-Sixty in 2007, pioneering leadership across our Jamaican and Florida facilities.",
    bullet: 'Founded 2007 • Jacqueline Sutherland • Nearshore & Onshore'
  },
  contact: {
    title: 'Contact Suite & Hotline',
    roomId: 'contact',
    text: "Welcome to our Contact Suite... Whether you need immediate nearshore capacity or wish to speak directly with our team, call us toll-free at 1 877 447 4627.",
    bullet: '+1 877-447-4627 • 1 Mangrove Way, Freeport'
  },
  radio: {
    title: 'Contax360 Live Radio Lounge',
    roomId: 'radio',
    text: "Welcome to the Live Radio Lounge... Relax to Howard University WHUR 96.3 FM vibes, R and B, soul, and adult contemporary rhythms while exploring our global BPO capabilities.",
    bullet: 'Howard University WHUR 96.3 FM • Washington D.C. & Maryland'
  },
  infomercial: {
    title: 'Infomercial Video Studio & ROI Modeler',
    roomId: 'infomercial',
    text: "Welcome to our Infomercial Video Studio... Discover how our nearshore Jamaica operations save 50 to 60 percent compared to domestic contact centers.",
    bullet: '50-60% Cost Reduction • Broadcast Presentation'
  },
  team_jackie: {
    title: 'Executive Suite • Jacqueline Sutherland (Founder & CEO)',
    roomId: 'team_jackie',
    text: "Jacqueline Sutherland, Founder, President and CEO. Jackie established Contax Three-Sixty in 2007 following an engineering career with Fortune Five Hundred firms. A pioneer for female leadership in the Caribbean, she spearheaded our evolution into complex Knowledge Process Outsourcing, legal and healthcare support, and owner-managed client partnerships.",
    bullet: 'Founder & CEO • 17+ Years Legacy • WBENC & NMSDC Certified'
  },
  team_mario: {
    title: 'Executive Suite • Mario Ellington (Director of Operations)',
    roomId: 'team_mario',
    text: "Mario Ellington, Director of Operations. Mario drives daily contact center execution, multi-tiered Service Level Agreements, and seamless omnichannel delivery across our Jamaica and Florida facilities. Working directly with client decision-makers, he ensures rigorous quality assurance, compliance, and custom operational excellence.",
    bullet: 'Director of Operations • Omnichannel SLA Execution • Workforce Command'
  },
  team_caray: {
    title: 'Executive Suite • Caray McKenzie (Director of Information Technology)',
    roomId: 'team_caray',
    text: "Caray McKenzie, Director of Information Technology. Caray oversees our global technology infrastructure, twenty-four-seven Managed Security defense, and cloud VDI systems. Under his leadership, automation empowers our workforce with advanced technical upskilling and career pathways.",
    bullet: 'Director of IT • 24/7 MSSP Cybersecurity • Cloud VDI & Data Analytics'
  },
  team_ashley: {
    title: 'Executive Suite • Ashley Martin (Project Director)',
    roomId: 'team_ashley',
    text: "Ashley Martin, Project Director. Ashley leads high-impact enterprise onboarding and customer journey transformations across phone, email, live chat, and messaging. Coordinating directly with corporate executives, she ensures swift migrations, strict compliance, and flawless multi-site execution.",
    bullet: 'Project Director • Enterprise Onboarding • Cross-Functional SLA Execution'
  },
  team_talia: {
    title: 'Executive Suite • Talia Cooke-Johnson (Human Resources Manager)',
    roomId: 'team_talia',
    text: "Talia Cooke-Johnson, Human Resources Manager. Talia champions talent acquisition, employee benefits, and structured paid training at our Freeport, Montego Bay facility. Aligned with Jamaica's Global Services Sector Project, she fosters an uplifting culture and internal leadership pathways.",
    bullet: 'HR Manager • GSS National Project • Paid Training & Employee Welfare'
  }
};

// 2. SHORT REVISIT SCRIPTS (When re-entering an already visited room)
export const ROOM_REVISIT_SCRIPTS: Record<string, { title: string; text: string }> = {
  home: {
    title: 'The Main Lobby (Revisit)',
    text: "The main lobby."
  },
  services: {
    title: 'Services (Revisit)',
    text: "Services."
  },
  careers: {
    title: 'Careers (Revisit)',
    text: "Careers."
  },
  about: {
    title: 'About Us (Revisit)',
    text: "About us."
  },
  contact: {
    title: 'Contact Us (Revisit)',
    text: "Contact us."
  },
  radio: {
    title: 'Live Radio Lounge (Revisit)',
    text: "The lounge."
  },
  infomercial: {
    title: 'Infomercial Studio (Revisit)',
    text: "Infomercial studio."
  },
  team_jackie: {
    title: 'Executive Office • Jacqueline Sutherland (Revisit)',
    text: "Executive Office of Founder and C E O, Jacqueline Sutherland."
  },
  team_mario: {
    title: 'Executive Office • Mario Ellington (Revisit)',
    text: "Executive Office of Director of Operations, Mario Ellington."
  },
  team_caray: {
    title: 'Executive Office • Caray McKenzie (Revisit)',
    text: "Executive Office of Information Technology Director, Caray McKenzie."
  },
  team_ashley: {
    title: 'Executive Office • Ashley Martin (Revisit)',
    text: "Executive Office of Project Director, Ashley Martin."
  },
  team_talia: {
    title: 'Executive Office • Talia Cooke-Johnson (Revisit)',
    text: "Executive Office of Human Resources Manager, Talia Cooke-Johnson."
  }
};

// Aliases for compatibility
export const STANDARD_TOUR_SCRIPTS = ROOM_INTRO_SCRIPTS;

const CACHE_PREFIX = 'contax_audio_cache_v7_';

class AudioCoordinator {
  private activeVoiceAudio: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private pauseTimer: number | null = null;

  // Local storage cache reader
  public getCachedAudio(key: string): CachedAudioEntry | null {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Integrity check: if it was cached as MPEG, invalidate so it upgrades to certified WAV
        if (parsed.mimeType && parsed.mimeType.includes('mpeg')) {
          localStorage.removeItem(CACHE_PREFIX + key);
          return null;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read audio cache from localStorage:', e);
    }
    return null;
  }

  // Local storage cache writer
  public saveAudioToCache(entry: CachedAudioEntry) {
    try {
      localStorage.setItem(CACHE_PREFIX + entry.key, JSON.stringify(entry));
      window.dispatchEvent(new CustomEvent('contax:cache-updated', { detail: { key: entry.key } }));
    } catch (e) {
      console.warn('Failed to write audio cache to localStorage:', e);
    }
  }

  public getAllCachedEntries(): Record<string, CachedAudioEntry> {
    const results: Record<string, CachedAudioEntry> = {};
    for (const key of Object.keys(ROOM_INTRO_SCRIPTS)) {
      const cached = this.getCachedAudio(key);
      if (cached) {
        results[key] = cached;
      }
    }
    // Also include revisit clips
    for (const key of Object.keys(ROOM_REVISIT_SCRIPTS)) {
      const revisitKey = `revisit_${key}`;
      const cached = this.getCachedAudio(revisitKey);
      if (cached) {
        results[revisitKey] = cached;
      }
    }
    return results;
  }

  public notifySpeechStart(source = 'pandora') {
    this.isSpeaking = true;
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    window.dispatchEvent(new CustomEvent('contax:speech-start', { detail: { source } }));
  }

  public notifySpeechEnd(pauseDelayMs = 10000) {
    this.isSpeaking = false;
    window.dispatchEvent(new CustomEvent('contax:speech-end', { detail: { pauseDelayMs } }));
  }

  public stopAllVoice() {
    if (this.activeVoiceAudio) {
      this.activeVoiceAudio.pause();
      this.activeVoiceAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  // Download audio as certified standard MP3 / WAV file
  public async downloadClip(key: string, textToSynth?: string, customFilename?: string): Promise<boolean> {
    const cleanKey = key.replace(/\.(mp3|wav)$/i, '').toLowerCase();
    const targetFilename = customFilename || `${cleanKey}_pandora_voice.mp3`;

    try {
      // 1. Fetch binary audio from the download endpoint directly
      const res = await fetch(`/api/pandora/download/${cleanKey}?filename=${encodeURIComponent(targetFilename)}`);
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const rawBlob = await res.blob();
      const isMp3 = targetFilename.toLowerCase().endsWith('.mp3');
      const audioBlob = new Blob([rawBlob], { type: isMp3 ? 'audio/mpeg' : 'audio/wav' });
      const objectUrl = URL.createObjectURL(audioBlob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = objectUrl;
      a.download = targetFilename;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(objectUrl);
      }, 3000);

      return true;
    } catch (e) {
      console.warn('Binary blob download failed, falling back to direct browser attachment link:', e);
      const link = document.createElement('a');
      link.href = `/api/pandora/download/${cleanKey}?filename=${encodeURIComponent(targetFilename)}`;
      link.download = targetFilename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 2000);
      return true;
    }
  }

  // Play Pandora Voice with cache lookup & 10s radio pause coordination
  public async playVoice(
    text: string, 
    options: {
      cacheKey?: string;
      title?: string;
      onStart?: () => void;
      onEnd?: () => void;
      pauseRadioDelayMs?: number; // default 10,000 ms (10 seconds)
    } = {}
  ): Promise<void> {
    const { cacheKey, title, onStart, onEnd, pauseRadioDelayMs = 10000 } = options;
    this.stopAllVoice();

    const cleanText = text.replace(/[*_#`[\]()]/g, '').trim();
    if (!cleanText) return;

    let effectiveKey = cacheKey || cleanText.slice(0, 40).replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();

    // 1. Check client-side persistent storage (evergreen cache hits prevent API usage)
    const cached = this.getCachedAudio(effectiveKey);
    if (cached && cached.dataUri) {
      const success = await this.playAudioElement(cached.dataUri, {
        onStart,
        onEnd,
        pauseRadioDelayMs
      });
      if (success) return;
    }

    // 2. Fetch from server (which checks server-side cache + ElevenLabs / Gemini WAV)
    try {
      const apiKey = localStorage.getItem('contax_eleven_key') || '';
      const voiceId = localStorage.getItem('contax_eleven_voice') || '21m00Tcm4TlvDq8ikWAM';

      const res = await fetch('/api/pandora/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          cacheKey: effectiveKey,
          title: title || effectiveKey,
          apiKey: apiKey.trim(),
          voiceId: voiceId.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const mimeType = data.mimeType || 'audio/wav';
          const dataUri = `data:${mimeType};base64,${data.audio}`;
          
          // Store in client-side persistent cache
          this.saveAudioToCache({
            key: effectiveKey,
            title: title || effectiveKey,
            text: cleanText,
            dataUri,
            mimeType,
            provider: data.provider || 'gemini',
            timestamp: Date.now()
          });

          const success = await this.playAudioElement(dataUri, {
            onStart,
            onEnd,
            pauseRadioDelayMs
          });
          if (success) return;
        }
      }
    } catch (err) {
      console.warn('Server TTS failed, falling back to Web Speech API:', err);
    }

    // 3. Fallback to Web Speech API if audio element fails to play
    this.playWebSpeechFallback(cleanText, { onStart, onEnd, pauseRadioDelayMs });
  }

  private playAudioElement(
    src: string, 
    options: {
      onStart?: () => void;
      onEnd?: () => void;
      pauseRadioDelayMs?: number;
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = src;
      this.activeVoiceAudio = audio;

      let hasFinished = false;

      const finishPlayback = (success: boolean) => {
        if (hasFinished) return;
        hasFinished = true;
        this.notifySpeechEnd(options.pauseRadioDelayMs ?? 10000);
        if (options.onEnd) options.onEnd();
        this.activeVoiceAudio = null;
        resolve(success);
      };

      audio.onplay = () => {
        this.notifySpeechStart('pandora-high-fidelity');
        if (options.onStart) options.onStart();
      };

      audio.onended = () => finishPlayback(true);
      audio.onerror = () => finishPlayback(false);

      audio.play()
        .then(() => {
          // Playback started successfully
        })
        .catch((err) => {
          console.warn('Audio play error:', err);
          finishPlayback(false);
        });
    });
  }

  private playWebSpeechFallback(
    text: string, 
    options: {
      onStart?: () => void;
      onEnd?: () => void;
      pauseRadioDelayMs?: number;
    }
  ) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.90; // Relaxed, natural, unhurried human pacing
    utterance.pitch = 1.03; // Warm, smooth, alluring feminine tone
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Victoria') || 
      v.name.includes('Karen') ||
      v.name.includes('Moira') ||
      v.name.includes('Google UK English Female') || 
      v.name.includes('Microsoft Jenny') ||
      v.name.includes('Microsoft Aria') ||
      v.name.includes('Zira') ||
      (v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.notifySpeechStart('pandora-speech-synth');
      if (options.onStart) options.onStart();
    };

    const finish = () => {
      this.notifySpeechEnd(options.pauseRadioDelayMs ?? 10000);
      if (options.onEnd) options.onEnd();
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    window.speechSynthesis.speak(utterance);
  }
}

export const audioCoordinator = new AudioCoordinator();
