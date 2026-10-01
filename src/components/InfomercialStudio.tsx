import React, { useState } from 'react';
import { 
  Play, Pause, Sparkles, Volume2, VolumeX, Tv, CheckCircle2, 
  ArrowRight, ShieldCheck, DollarSign, Users, Award, RefreshCw, 
  Copy, Check, FileText, ChevronRight
} from 'lucide-react';

interface Slide {
  chapter: string;
  pandoraScript: string;
  visualCue: string;
  keyMetrics: string[];
}

interface InfomercialData {
  title: string;
  hook: string;
  estimatedSavingsPercentage: number;
  slides: Slide[];
  callToAction: string;
}

const DEFAULT_INFOMERCIAL: InfomercialData = {
  title: "Contax360: Redefining Global BPO One Interaction at a Time",
  hook: "Are soaring US support costs and high agent turnover holding your business back? Welcome to Contax360 — where world-class Jamaican hospitality meets cutting-edge enterprise customer operations.",
  estimatedSavingsPercentage: 58,
  slides: [
    {
      chapter: "Chapter 1: The Nearshore Jamaica Advantage",
      pandoraScript: "Located just a short flight from Miami in Montego Bay, Contax360 delivers native English-speaking talent in your exact US time zones. Our clients experience zero cultural gap and save up to 60% compared to onshore domestic operations.",
      visualCue: "B-roll of Montego Bay HQ at 1 Mangrove Way, high-energy modern contact center floor, and Jamaican coastline.",
      keyMetrics: ["US Eastern Time Zone Alignment", "100% Native English Fluency"]
    },
    {
      chapter: "Chapter 2: Omni-Channel & Chat Superpower",
      pandoraScript: "From SMS and live chat to voice, email, and social care, our teams don't just answer tickets — we cultivate brand loyalty. With multi-tiered escalation and real-time QA, we consistently deliver over 99.4% CSAT.",
      visualCue: "Split-screen showcasing live chat multitasking, CRM integration, and customer resolution metrics.",
      keyMetrics: ["99.4% CSAT Benchmark", "Sub-30s First Response Time"]
    },
    {
      chapter: "Chapter 3: Enterprise Compliance & Back-Office",
      pandoraScript: "Whether you operate in Healthcare requiring strict HIPAA compliance, or FinTech demanding PCI DSS Level 1 security, our state-of-the-art infrastructure in Jamaica and Florida ensures zero compromise on data privacy.",
      visualCue: "Infographic displaying HIPAA, PCI DSS, WBENC Women-Owned, and NMSDC MBE certified badges.",
      keyMetrics: ["HIPAA & PCI DSS Certified", "24/7 Managed SOC Defense"]
    },
    {
      chapter: "Chapter 4: People First — Our Culture of Excellence",
      pandoraScript: "Founded in 2007 by Jacqueline Sutherland, our secret weapon is our people. With paid training, daily lunch allowances, free shuttle transport, and career growth, our employee retention leads the entire BPO industry.",
      visualCue: "Smiling Contax360 agents collaborating, award ceremony, and team walk-in interview floor.",
      keyMetrics: ["Paid Training & Shuttle", "17+ Years Industry Leadership"]
    }
  ],
  callToAction: "Call our executive team today at +1 877-447-4627 or email info@contax360.com to book your customized nearshore pilot."
};

export const InfomercialStudio: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'aiGenerator' | 'script'>('broadcast');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [infomercialData, setInfomercialData] = useState<InfomercialData>(DEFAULT_INFOMERCIAL);

  // AI Generator Form State
  const [industry, setIndustry] = useState('FinTech & Banking');
  const [companySize, setCompanySize] = useState('100 - 500 Employees');
  const [targetGoal, setTargetGoal] = useState('Cut operational support costs by 50% while expanding to 24/7 live chat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentSlide = infomercialData.slides[currentSlideIdx] || infomercialData.slides[0];

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => (v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Zira') || (v.lang.startsWith('en') && v.name.includes('Female')))) || voices.find(v => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    handleStopSpeaking();

    try {
      const res = await fetch('/api/pandora/infomercial-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, companySize, targetGoal }),
      });

      if (!res.ok) throw new Error('Failed to generate script');
      const data: InfomercialData = await res.json();
      setInfomercialData(data);
      setCurrentSlideIdx(0);
      setActiveTab('broadcast');
      handleSpeak(data.hook);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyFullScript = () => {
    const fullText = `=== ${infomercialData.title} ===\n\nHOOK:\n${infomercialData.hook}\n\n` +
      infomercialData.slides.map((s, idx) => `[${s.chapter}]\nVISUAL: ${s.visualCue}\nPANDORA LEE SCRIPT: ${s.pandoraScript}\nMETRICS: ${s.keyMetrics.join(', ')}\n`).join('\n') +
      `\nCALL TO ACTION:\n${infomercialData.callToAction}\nContax360 HQ: 1 Mangrove Way, Freeport, Montego Bay, Jamaica | +1 877-447-4627`;
    
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="infomercial" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
          <Tv className="w-3.5 h-3.5" /> Contax360 Infomercial Studio
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          The Contax360 Infomercial Suite
        </h2>
        <p className="mt-4 text-slate-400 font-work text-base sm:text-lg">
          Explore our broadcast presentation or generate a tailored digital infomercial pitch for your industry with Pandora Lee.
        </p>

        {/* Tab Controls */}
        <div className="mt-8 inline-flex p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'broadcast'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Broadcast Presentation
          </button>
          <button
            onClick={() => setActiveTab('aiGenerator')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'aiGenerator'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Custom Script Generator
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'script'
                ? 'bg-slate-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Teleprompter View
          </button>
        </div>
      </div>

      {/* 1. Broadcast Video & Slide Presentation Screen */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: TV Studio Monitor Simulator */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Ambient TV glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Broadcast header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">ON AIR • PANDORA LEE BROADCAST</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Savings Target: <span className="text-emerald-400 font-bold">~{infomercialData.estimatedSavingsPercentage}% Cost Reduction</span>
              </div>
            </div>

            {/* Main Stage Screen */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8 min-h-[380px] flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {currentSlide.chapter}
                  </span>
                  <span className="text-xs text-slate-500">
                    Slide {currentSlideIdx + 1} of {infomercialData.slides.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-raleway leading-snug">
                  "{infomercialData.title}"
                </h3>

                {/* Spoken Narration Quote */}
                <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 text-slate-200 text-sm sm:text-base leading-relaxed relative">
                  <div className="text-xs text-purple-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Pandora Lee Spoken Monologue:
                  </div>
                  "{currentSlide.pandoraScript}"
                </div>

                {/* Visual Cue Note */}
                <div className="mt-4 flex items-start gap-2 text-xs text-slate-400 italic">
                  <span className="text-amber-400 font-semibold not-italic">Visual Cue:</span>
                  <span>{currentSlide.visualCue}</span>
                </div>
              </div>

              {/* Key Slide Metrics */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                {currentSlide.keyMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Broadcast Controls Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isSpeaking) {
                      handleStopSpeaking();
                    } else {
                      handleSpeak(currentSlide.pandoraScript);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg transition"
                >
                  {isSpeaking ? (
                    <>
                      <Pause className="w-4 h-4" /> Stop Voiceover
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" /> Listen to Pandora Lee
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    handleSpeak(infomercialData.hook);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Play Opening Hook
                </button>
              </div>

              {/* Slide Navigation Dots & Buttons */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIdx === 0}
                  onClick={() => {
                    handleStopSpeaking();
                    setCurrentSlideIdx(prev => Math.max(0, prev - 1));
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs"
                >
                  Prev
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {infomercialData.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleStopSpeaking();
                        setCurrentSlideIdx(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlideIdx === idx ? 'w-6 bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlideIdx === infomercialData.slides.length - 1}
                  onClick={() => {
                    handleStopSpeaking();
                    setCurrentSlideIdx(prev => Math.min(infomercialData.slides.length - 1, prev + 1));
                  }}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white text-xs font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right: Pitch Breakdown & Fast Action Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Infomercial Hook & CTA Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h4 className="font-bold text-white text-base font-raleway flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                The Infomercial Hook
              </h4>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                "{infomercialData.hook}"
              </p>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Executive Call to Action:
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {infomercialData.callToAction}
                </p>

                <button
                  onClick={onOpenContact}
                  className="mt-4 w-full py-3 px-4 rounded-xl contax-gradient text-white font-bold text-xs sm:text-sm shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <span>Book Nearshore Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Fact sheet */}
            <div className="bg-gradient-to-br from-blue-950/40 to-purple-950/40 border border-blue-500/20 rounded-3xl p-6">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
                Why Nearshore Jamaica Wins
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Only 1 hour 20 mins flight from Miami to Montego Bay</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3rd largest English-speaking nation in the Americas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Founded 2007 by engineer Jacqueline Sutherland</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NMSDC MBE & WBENC Women-Owned certified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI Custom Industry Infomercial Generator */}
      {activeTab === 'aiGenerator' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-raleway">
                AI Industry Infomercial Generator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Generate a custom television / digital infomercial script tailored to your specific market.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateScript} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Target Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="FinTech & Banking">FinTech & Banking</option>
                  <option value="Healthcare & Telehealth (HIPAA)">Healthcare & Telehealth (HIPAA)</option>
                  <option value="E-Commerce & Retail Brands">E-Commerce & Retail Brands</option>
                  <option value="SaaS, Software & Cloud Tech Support">SaaS, Software & Cloud Tech Support</option>
                  <option value="Logistics, Freight & Supply Chain">Logistics, Freight & Supply Chain</option>
                  <option value="Telecommunications & Utilities">Telecommunications & Utilities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Company Size</label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Emerging Scaleup (20 - 100 Employees)">Emerging Scaleup (20 - 100 Employees)</option>
                  <option value="Mid-Market Enterprise (100 - 1,000 Employees)">Mid-Market Enterprise (100 - 1,000 Employees)</option>
                  <option value="Fortune 500 / Global Enterprise (1,000+ Employees)">Fortune 500 / Global Enterprise (1,000+ Employees)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Goal or Pain Point</label>
              <input
                type="text"
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                placeholder="e.g. Expand to 24/7 SMS & chat support while cutting headcount costs by 50%"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl disabled:opacity-50 transition"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Generating Infomercial...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Infomercial Show
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Teleprompter & Full Script View */}
      {activeTab === 'script' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white font-raleway">Broadcast Teleprompter & Script</h3>
              <p className="text-xs text-slate-400">Complete pitch copy for company presentation and infomercial videos</p>
            </div>
            <button
              onClick={copyFullScript}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Full Script'}</span>
            </button>
          </div>

          <div className="mt-6 space-y-6 text-sm text-slate-300 font-mono bg-slate-950 p-6 rounded-2xl border border-slate-800 leading-relaxed max-h-[500px] overflow-y-auto">
            <div>
              <span className="text-purple-400 font-bold">[TITLE]</span> {infomercialData.title}
            </div>

            <div>
              <span className="text-amber-400 font-bold">[OPENING HOOK]</span>
              <p className="mt-1 text-slate-200">"{infomercialData.hook}"</p>
            </div>

            {infomercialData.slides.map((s, i) => (
              <div key={i} className="pt-4 border-t border-slate-900">
                <span className="text-blue-400 font-bold">[{s.chapter}]</span>
                <div className="text-xs text-slate-500 mt-1">CUE: {s.visualCue}</div>
                <p className="mt-2 text-slate-200">"{s.pandoraScript}"</p>
                <div className="text-xs text-emerald-400 mt-1">METRICS: {s.keyMetrics.join(' • ')}</div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-900">
              <span className="text-emerald-400 font-bold">[CLOSING CALL TO ACTION]</span>
              <p className="mt-1 text-slate-200">"{infomercialData.callToAction}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
