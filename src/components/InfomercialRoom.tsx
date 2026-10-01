import React, { useState } from 'react';
import { 
  Tv, Bot, Volume2, VolumeX, Play, Pause, 
  Copy, Check, CheckCircle2, ChevronRight, Calculator,
  DollarSign, Users, Clock, ShieldCheck, Compass
} from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { VideoPanel } from './VideoPanel';

interface InfomercialRoomProps {
  onSelectRoom: (room: string) => void;
  onStartTour: () => void;
}

export const InfomercialRoom: React.FC<InfomercialRoomProps> = ({ onSelectRoom, onStartTour }) => {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'generator' | 'roi'>('broadcast');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Form state for AI infomercial generator
  const [industry, setIndustry] = useState('FinTech & E-commerce');
  const [companySize, setCompanySize] = useState('50 - 500 Employees');
  const [goal, setGoal] = useState('Cut operational support costs by 50% while scaling 24/7 SMS & chat support');
  const [isGenerating, setIsGenerating] = useState(false);

  // ROI Calculator state
  const [agents, setAgents] = useState(15);
  const [coverageHours, setCoverageHours] = useState(16);
  const usRate = 34;
  const jamaicaRate = 15;
  const hoursPerYear = agents * (coverageHours === 24 ? 365 * 24 : 260 * coverageHours);
  const annualSavings = hoursPerYear * (usRate - jamaicaRate);

  const slides = [
    {
      title: "Chapter 1: The Nearshore Jamaica Advantage",
      script: "Welcome to Contax360! Located just a 90-minute flight from Miami in Montego Bay, Jamaica, we provide world-class native English customer support in your exact US time zones with 50-60% cost savings.",
      visual: "B-roll of Montego Bay Freeport Campus at 1 Mangrove Way & high-energy chat specialist pods.",
      stat: "100% US Timezone Alignment"
    },
    {
      title: "Chapter 2: Multitasking & Omni-Channel Chat",
      script: "We're redefining BPO one interaction at a time. Our specialists handle concurrent live chats, SMS, phone, and social media tickets, consistently achieving over 99.4% CSAT benchmarks.",
      visual: "Split-screen illustrating live CRM ticket routing and sub-30 second response times.",
      stat: "99.4% CSAT Guarantee"
    },
    {
      title: "Chapter 3: Enterprise Compliance & Healthcare",
      script: "Whether you require strict HIPAA healthcare patient intake or PCI DSS Level 1 payment processing security, our secure clean rooms in Jamaica and Florida ensure bank-grade compliance.",
      visual: "WBENC Women-Owned, NMSDC MBE, HIPAA and PCI DSS accreditation badges.",
      stat: "HIPAA & PCI Level 1 Certified"
    },
    {
      title: "Chapter 4: People-First Culture & Retention",
      script: "Founded in 2007 by Jacqueline Sutherland, our secret weapon is our staff. With paid training, daily lunch allowances, and free shuttle buses, our agent retention leads the Caribbean.",
      visual: "Contax360 smiling team members, walk-in interview floor, and award celebrations.",
      stat: "17+ Years Industry Leadership"
    }
  ];

  const currentSlide = slides[currentSlideIdx];

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#`[\]()]/g, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 1.05;
    utter.pitch = 1.05;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-800">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[320px] sm:min-h-[400px] bg-[#12005e] text-white flex items-center justify-center text-center px-4 py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(https://contax360.com/wp-content/uploads/2021/06/main-hero-background-image-scaled.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12005e]/90 via-[#351080]/80 to-[#12005e]/90 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
            Interactive Infomercial Studio
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-raleway tracking-tight text-white">
            Infomercial Suite & Overview
          </h1>
          <p className="text-sm text-purple-200 font-work max-w-xl mx-auto">
            Executive presentation and nearshore ROI cost-benefit calculator.
          </p>
        </div>
      </section>

      {/* 2. DEDICATED INFOMERCIAL ROOM VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        <VideoPanel
          roomTitle="Digital Infomercial Broadcast Suite"
          roomBadge="Infomercial Video Explainer"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Staffvideo-Final-Avi-Convert-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/06/main-hero-background-image-scaled.jpg"
          pandoraExplanation="Welcome to the Contax360 Infomercial Suite! Here you can watch our full digital broadcast presentation or generate a customized enterprise business case with real nearshore cost-benefit models."
          chapterHighlights={[
            "4-part executive presentation and capabilities overview",
            "Nearshore Jamaica ROI calculator with real-time labor cost modeling",
            "Custom pitch generator for FinTech, Healthcare, and SaaS brands",
            "Direct hotline connection and pilot onboarding"
          ]}
          keyStats={[
            { label: "Cost Savings", value: "50% - 60%" },
            { label: "CSAT Score", value: "99.4%" },
            { label: "Timezone Gap", value: "0 Hours" },
            { label: "Experience", value: "17+ Years" }
          ]}
        />
      </section>

      {/* 3. TAB CONTROLS */}
      <section className="pt-6 pb-4 px-4 max-w-5xl mx-auto flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 shadow-sm">
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'broadcast' ? 'bg-[#006cff] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Broadcast Infomercial
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'roi' ? 'bg-[#006cff] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ROI Savings Modeler
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'generator' ? 'bg-[#006cff] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Script Generator
          </button>
        </div>
      </section>

      {/* 4. BROADCAST STUDIO VIEW */}
      {activeTab === 'broadcast' && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Screen */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">LIVE PRESENTATION</span>
                </div>
                <div className="text-xs text-blue-400 font-semibold font-mono">
                  Slide {currentSlideIdx + 1} of {slides.length}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 space-y-4 min-h-[260px] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-raleway text-blue-300">
                    {currentSlide.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-200 font-work leading-relaxed">
                    "{currentSlide.script}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-mono">CUE: {currentSlide.visual}</span>
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {currentSlide.stat}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeak();
                      } else {
                        speak(currentSlide.script);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                  >
                    {isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isSpeaking ? 'Pause Voiceover' : 'Play Voiceover'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentSlideIdx === 0}
                    onClick={() => {
                      stopSpeak();
                      setCurrentSlideIdx(prev => Math.max(0, prev - 1));
                    }}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold disabled:opacity-30"
                  >
                    Prev
                  </button>
                  <button
                    disabled={currentSlideIdx === slides.length - 1}
                    onClick={() => {
                      stopSpeak();
                      setCurrentSlideIdx(prev => Math.min(slides.length - 1, prev + 1));
                    }}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white disabled:opacity-30"
                  >
                    Next Chapter
                  </button>
                </div>
              </div>
            </div>

            {/* Right Quick Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-50 shadow-sm space-y-4">
                <h4 className="font-bold text-[#002f6c] text-lg font-raleway flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-600" />
                  Facility Walkthrough
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-work">
                  Explore every operational capability and facility in Montego Bay with executive commentary.
                </p>

                <button
                  onClick={onStartTour}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" /> Start Full Guided Tour
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-blue-900 text-white shadow-xl space-y-3">
                <h4 className="font-bold font-raleway text-base">Ready for a Client Pilot?</h4>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Call our executive team directly at <strong className="text-white font-mono">+1 877-447-4627</strong> or book a consultation.
                </p>
                <button
                  onClick={() => onSelectRoom('contact')}
                  className="w-full py-2.5 rounded-lg bg-white text-blue-900 font-bold text-xs uppercase tracking-wider shadow"
                >
                  Contact Us Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. ROI CALCULATOR TAB */}
      {activeTab === 'roi' && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Dedicated Agents ({agents})
                  </label>
                  <span className="text-sm font-mono text-blue-400 font-bold">{agents} FTEs</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="100"
                  value={agents}
                  onChange={(e) => setAgents(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  Coverage Schedule
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[8, 16, 24].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setCoverageHours(hrs)}
                      className={`py-2 rounded-lg text-xs font-semibold ${
                        coverageHours === hrs ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {hrs === 8 ? '8h Standard' : hrs === 16 ? '16h Extended' : '24x7 Continuous'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-950 text-center space-y-3">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
                Projected Annual Savings
              </div>
              <div className="text-4xl font-black text-white font-raleway">
                ${(annualSavings / 1000).toFixed(0)}k
                <span className="text-xs font-normal text-slate-400 block mt-1">
                  / year (~56% cost reduction vs US domestic)
                </span>
              </div>
              <button
                onClick={() => onSelectRoom('contact')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md mt-2"
              >
                Request Nearshore Quote
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6. SCRIPT GENERATOR TAB */}
      {activeTab === 'generator' && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="p-8 rounded-3xl bg-slate-50 shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-[#002f6c] font-raleway">
              Custom Proposal & Script Generator
            </h3>
            <p className="text-xs text-slate-600">
              Customize an executive pitch script tailored to your industry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Sector</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Headcount</label>
                <input
                  type="text"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Scaling Objective</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <button
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setIsGenerating(false);
                  setActiveTab('broadcast');
                  speak(`Welcome to our customized ${industry} presentation! Contax360 delivers native English BPO operations in Jamaica and Florida with 50 to 60 percent savings.`);
                }, 600);
              }}
              disabled={isGenerating}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              {isGenerating ? 'Generating Presentation...' : 'Generate Customized Proposal Show'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
