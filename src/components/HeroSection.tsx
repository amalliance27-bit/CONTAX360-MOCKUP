import React, { useState, useEffect } from 'react';
import { 
  Play, Sparkles, ShieldCheck, Award, MapPin, 
  ArrowRight, Phone, MessageSquare, Bot, Users, CheckCircle2, ChevronRight,
  Globe, Zap, Headphones, Compass
} from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { motion } from 'framer-motion';

export const HeroSection: React.FC<{
  onStartTour: () => void;
  onOpenInfomercial: () => void;
  onOpenHiring: () => void;
  onOpenContact: () => void;
}> = ({ onStartTour, onOpenInfomercial, onOpenHiring, onOpenContact }) => {
  const words = ['SMS', 'call', 'message', 'contact', 'interaction', 'solution'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a1124] to-slate-950">
      {/* Spotlight Lighting Effect */}
      <Spotlight className="-top-40 left-0 md:left-48 md:-top-20" fill="#38bdf8" />
      <Spotlight className="top-10 right-0 md:right-40" fill="#a855f7" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-sky-500/10 rounded-full blur-[130px]" />
        
        {/* Subtle grid line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Certification & Status Badges */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-200 mb-6 py-1"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
            <span className="text-blue-300 font-bold uppercase tracking-wider font-sans">Woman &amp; Minority Owned BPO</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">Montego Bay HQ</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HIPAA &amp; PCI DSS
            </span>
          </motion.div>

          {/* Dynamic Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-raleway"
          >
            We're redefining BPO <br />
            <span className="text-slate-300 font-normal">One </span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 transition-all duration-300">
              {words[currentWordIdx]}
            </span>
            <span className="text-slate-300 font-normal"> at a time</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-work"
          >
            Contax360 delivers high-impact Nearshore Jamaica and US Onshore customer interaction, 24/7 chat support, IT operations, back-office transactions, and managed security. Guided by our interactive AI Ambassador <strong className="text-white">Pandora Lee</strong>.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
          >
            <button
              onClick={onStartTour}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] contax-gradient border border-blue-400/30 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Bot className="w-4 h-4 text-blue-200 relative z-10" />
              <span className="relative z-10">Start AI Tour with Pandora Lee</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>

            <button
              onClick={onOpenInfomercial}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 shadow-lg transition-all duration-200 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 fill-blue-400 text-blue-400" />
              <span>Infomercial Studio</span>
            </button>

            <button
              onClick={onOpenHiring}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/50 hover:border-amber-400 shadow-lg transition-all duration-200 w-full sm:w-auto"
            >
              <Users className="w-4 h-4" />
              <span>Walk-In Hiring</span>
            </button>
          </motion.div>

          {/* Nearshore fast points */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% US Timezone Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Native English Fluency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>50-60% Cost Reduction</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Spline Scene / Pandora Lee Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center w-full min-h-[420px] lg:min-h-[520px]">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 3D Container with Glassmorphism Border */}
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950/90 shadow-2xl backdrop-blur-xl group">
              
              {/* Spline 3D Scene */}
              <div className="w-full h-full scale-[1.05] pointer-events-auto">
                <SplineScene 
                  scene="https://prod.spline.design/ipj9zB1dtTJc39jn/scene.splinecode"
                  className="w-full h-full"
                />
              </div>

              {/* Floating Overlays */}
              <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-blue-300">PANDORA LEE • 3D HOST</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Interactive 3D Host</div>
                    <div className="text-[10px] text-slate-400">Click to ask about nearshore BPO or jobs</div>
                  </div>
                </div>
                <button
                  onClick={onStartTour}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0"
                >
                  Ask Pandora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mt-14 w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-3xl font-extrabold text-blue-400 font-raleway">50-60%</div>
          <div className="text-sm font-semibold text-white mt-1">Cost Reduction</div>
          <div className="text-xs text-slate-400 mt-0.5">Nearshore vs US Onshore</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-3xl font-extrabold text-purple-400 font-raleway">17+ Yrs</div>
          <div className="text-sm font-semibold text-white mt-1">Proven Track Record</div>
          <div className="text-xs text-slate-400 mt-0.5">Founded 2007 in Jamaica</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-3xl font-extrabold text-emerald-400 font-raleway">99.4%</div>
          <div className="text-sm font-semibold text-white mt-1">Client Retention & CSAT</div>
          <div className="text-xs text-slate-400 mt-0.5">Native English Timezone Sync</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-3xl font-extrabold text-amber-400 font-raleway">24/7/365</div>
          <div className="text-sm font-semibold text-white mt-1">Omni-Channel Operations</div>
          <div className="text-xs text-slate-400 mt-0.5">Voice, Chat, SMS, Back-Office</div>
        </div>
      </div>
    </section>
  );
};
