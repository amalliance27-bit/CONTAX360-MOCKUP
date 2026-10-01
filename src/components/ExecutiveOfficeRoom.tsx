import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TeamMember } from '../data/teamData';
import { audioCoordinator, ROOM_INTRO_SCRIPTS, ROOM_REVISIT_SCRIPTS } from '../utils/audioCoordinator';
import { VaultRoom } from './VaultRoom';
import { 
  Gamepad2, Linkedin, Mail, Twitter, Instagram, Calendar, X, ArrowLeft
} from 'lucide-react';

interface ExecutiveOfficeRoomProps {
  member: TeamMember;
  onClose: () => void;
  isFirstVisit: boolean;
}

export const ExecutiveOfficeRoom: React.FC<ExecutiveOfficeRoomProps> = ({
  member,
  onClose,
  isFirstVisit
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const speechDelayRef = useRef<number | null>(null);
  const startScrollTimeoutRef = useRef<number | null>(null);
  const isClosingRef = useRef<boolean>(false);

  // Vault Room Modal State (for Jackie & Ashley)
  const isJackieOrAshley = member.id === 'jacqueline-sutherland' || member.id === 'ashley-martin';
  const [showVaultModal, setShowVaultModal] = useState<boolean>(false);

  // 1-Minute User Touch Pause Management (Silent background pause, zero ugly popup)
  const isUserPausedRef = useRef<boolean>(false);
  const userPauseTimerRef = useRef<number | null>(null);

  const safeClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    audioCoordinator.stopAllVoice();
    onClose();
  }, [onClose]);

  // Pause scrolling for 1 full minute on touch/scroll silently
  const triggerUserPause = useCallback(() => {
    if (isClosingRef.current) return;
    isUserPausedRef.current = true;

    if (userPauseTimerRef.current) clearTimeout(userPauseTimerRef.current);

    userPauseTimerRef.current = window.setTimeout(() => {
      isUserPausedRef.current = false;
    }, 60000);
  }, []);

  // 1. Audio Narration for Suite:
  // Plays ONCE upon entering, delayed slightly for smooth settling
  useEffect(() => {
    isClosingRef.current = false;

    audioCoordinator.stopAllVoice();
    document.querySelectorAll('audio, video').forEach((el) => {
      try {
        (el as HTMLMediaElement).pause();
      } catch (_) {}
    });

    const longText = ROOM_INTRO_SCRIPTS[member.roomKey]?.text || member.speechLong;
    const shortText = ROOM_REVISIT_SCRIPTS[member.roomKey]?.text || member.speechShort;
    const textToPlay = isFirstVisit ? longText : shortText;

    const audioTitle = isFirstVisit 
      ? `${member.name} (Executive Suite)` 
      : `${member.name} (Revisit)`;

    const cacheKey = isFirstVisit ? member.roomKey : `revisit_${member.roomKey}`;

    speechDelayRef.current = window.setTimeout(() => {
      if (isClosingRef.current) return;
      audioCoordinator.playVoice(textToPlay, {
        cacheKey,
        title: audioTitle,
        pauseRadioDelayMs: 60000
      });
    }, 2200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        safeClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (speechDelayRef.current) clearTimeout(speechDelayRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (startScrollTimeoutRef.current) clearTimeout(startScrollTimeoutRef.current);
      if (userPauseTimerRef.current) clearTimeout(userPauseTimerRef.current);
      audioCoordinator.stopAllVoice();
    };
  }, [member.id, member.roomKey, isFirstVisit, member.name, member.speechLong, member.speechShort, safeClose]);

  // 2. Gentle Teleprompter Auto-Scroll:
  // Scrolls down ONCE to reveal the suite content smoothly, then stays at the bottom so user can read freely
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = 0;
    let lastTime = performance.now();
    let hasFinishedSinglePass = false;

    startScrollTimeoutRef.current = window.setTimeout(() => {
      const scrollStep = (now: number) => {
        if (isClosingRef.current || hasFinishedSinglePass) return;
        const currentEl = containerRef.current;
        if (!currentEl) return;

        const maxScroll = currentEl.scrollHeight - currentEl.clientHeight;
        const elapsed = now - lastTime;

        if (elapsed >= 16) {
          lastTime = now;

          if (!isUserPausedRef.current && maxScroll > 40 && !showVaultModal) {
            if (currentEl.scrollTop >= maxScroll - 6) {
              hasFinishedSinglePass = true;
              return; // Completed single gentle scroll down
            } else {
              currentEl.scrollTop += 0.40;
            }
          }
        }

        animFrameRef.current = requestAnimationFrame(scrollStep);
      };

      animFrameRef.current = requestAnimationFrame(scrollStep);
    }, 3200);

    return () => {
      if (startScrollTimeoutRef.current) clearTimeout(startScrollTimeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [member.id, showVaultModal]);

  // Attach touch & wheel listeners to pause for 1 minute on user interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleInteraction = () => {
      triggerUserPause();
    };

    el.addEventListener('touchstart', handleInteraction, { passive: true });
    el.addEventListener('touchmove', handleInteraction, { passive: true });
    el.addEventListener('wheel', handleInteraction, { passive: true });
    el.addEventListener('mousedown', handleInteraction, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleInteraction);
      el.removeEventListener('touchmove', handleInteraction);
      el.removeEventListener('wheel', handleInteraction);
      el.removeEventListener('mousedown', handleInteraction);
    };
  }, [triggerUserPause]);

  // Social Media Icons Configuration
  const socialIcons = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: member.id === 'jacqueline-sutherland' 
        ? 'https://www.linkedin.com/in/jacqueline-sutherland-contax360' 
        : 'https://www.linkedin.com/in/ashley-martin-enterprise-bpo',
      icon: <Linkedin className="w-4 h-4" />
    },
    {
      id: 'email',
      name: 'Direct Email',
      url: member.id === 'jacqueline-sutherland' 
        ? 'mailto:jackie@contax360.com' 
        : 'mailto:ashley.martin@contax360.com',
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      url: member.id === 'jacqueline-sutherland' 
        ? 'https://x.com/JackieSutherBPO' 
        : 'https://x.com/AshleyM_Contax',
      icon: <Twitter className="w-4 h-4" />
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/contax360bpo/',
      icon: <Instagram className="w-4 h-4" />
    },
    {
      id: 'calendar',
      name: 'Schedule Briefing',
      url: member.id === 'jacqueline-sutherland'
        ? 'mailto:jackie@contax360.com?subject=Schedule%20Executive%20Briefing'
        : 'mailto:ashley.martin@contax360.com?subject=Schedule%20Migration%20Consultation',
      icon: <Calendar className="w-4 h-4" />
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-screen h-screen overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[#091533] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white"
    >
      {/* Cool Light Blue Hue Ambient Radiance (Zero hard borders) */}
      <div className="fixed top-0 left-1/4 w-[750px] h-[750px] bg-sky-400/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* 
        1. SLEEK BLUE BANNER HEADER (Mobile-Clean, Just "OFFICE SUITE #", Zero Duplications)
      */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#004fc7] via-[#0066ff] to-[#004fc7] shadow-lg py-2.5 px-4 sm:px-8 text-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Upper Left: Icon Logo Return to Lobby Button with Pulsating Dot */}
          <button
            onClick={safeClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition active:scale-95 group text-white shrink-0"
            title="Return to Main Campus Lobby"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#34d399]" />
            <ArrowLeft className="w-4 h-4 text-cyan-200 group-hover:-translate-x-0.5 transition" />
            <div className="flex items-center text-xs font-black font-raleway tracking-tight">
              <span>CONTAX</span>
              <span className="text-cyan-300 ml-0.5">360</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100 pl-1 border-l border-white/25 hidden xs:inline">
              Lobby
            </span>
          </button>

          {/* Just "OFFICE SUITE #" - Short, Sweet, Zero Duplication */}
          <div className="flex items-center shrink-0">
            <span className="text-xs sm:text-sm font-black font-raleway tracking-widest uppercase text-white whitespace-nowrap bg-white/15 px-3.5 py-1.5 rounded-full">
              OFFICE SUITE #{member.suiteNumber.replace(/[^0-9]/g, '') || '1'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Suite Content - Cool Light Blue Hue, Zero Borders */}
      <main className="max-w-4xl mx-auto w-full px-5 sm:px-8 pt-8 sm:pt-12 pb-32 space-y-12 text-left relative z-10">
        
        {/*
          HERO PROFILE SECTION (Spacious Breathable Portrait, Light Blue Hue, Zero Hard Borders)
        */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12 p-6 sm:p-10 rounded-3xl bg-[#0f224c]/50 backdrop-blur-md shadow-xl">
          
          {/* Unconstrained Portrait */}
          <div className="shrink-0 w-52 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,10,35,0.7)] bg-[#07132e]">
            <img
              src={member.image}
              alt={member.name}
              onError={(e) => {
                const target = e.currentTarget;
                if (member.fallbackImage && target.src !== member.fallbackImage) {
                  target.src = member.fallbackImage;
                }
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Clean Executive Info */}
          <div className="flex-1 space-y-3.5 text-center md:text-left">
            <div>
              <p className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider mb-1">
                {member.role}
              </p>
              <h1 className="text-3xl sm:text-5xl font-black font-raleway text-white tracking-tight">
                {member.name}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/90 font-work mt-1">
                {member.subtitle}
              </p>
            </div>

            {/* Direct Creed */}
            <p className="text-sm sm:text-base text-blue-100 font-work italic leading-relaxed pt-1 max-w-lg">
              {member.tagline}
            </p>

            {/*
              ACTION ROW: VAULT ROOM ICON + SOCIAL MEDIA ICONS
            */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              
              {/* Vault Room Icon Button (Jackie and Ashley) */}
              {isJackieOrAshley && (
                <button
                  onClick={() => setShowVaultModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white font-semibold text-xs shadow-md transition active:scale-95"
                  title="Open The Vault Room • Video & Arcade"
                >
                  <Gamepad2 className="w-4 h-4 text-cyan-200" />
                  <span>The Vault Room</span>
                </button>
              )}

              {/* Clean Apple-Style Social Icons (No hard borders) */}
              <div className="flex items-center gap-1.5 p-1 bg-[#122856]/80 rounded-full shadow-inner">
                {socialIcons.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    className="p-2 rounded-full text-blue-200 hover:text-white hover:bg-[#0066ff] transition active:scale-95"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Executive Overview - Editorial Prose, Zero Repeat Fluff */}
        <section className="space-y-3 font-work text-blue-100 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold font-raleway text-white tracking-tight">
            Executive Leadership & Scope
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-blue-100 font-normal">
            {member.executiveOverview}
          </p>
        </section>

        {/*
          HER VISION & STRATEGIC EVOLUTION (No pill borders, clean editorial cards with light blue hue)
        */}
        <section className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold font-raleway text-white tracking-tight">
            {member.scopeSection1.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {member.scopeSection1.items.map((item, idx) => (
              <div 
                key={idx} 
                className="space-y-2 p-6 rounded-2xl bg-[#0f224e]/50 hover:bg-[#132c63]/60 transition shadow-md"
              >
                <h3 className="text-base font-bold text-sky-300 font-raleway">
                  {item.heading}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 font-work leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/*
          SECTION 2: LEADERSHIP & STRATEGY (No pill borders, light blue hue)
        */}
        <section className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold font-raleway text-white tracking-tight">
            {member.scopeSection2.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {member.scopeSection2.items.map((item, idx) => (
              <div 
                key={idx} 
                className="space-y-2 p-6 rounded-2xl bg-[#0f224e]/50 hover:bg-[#132c63]/60 transition shadow-md"
              >
                <h3 className="text-base font-bold text-indigo-300 font-raleway">
                  {item.heading}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 font-work leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/*
          CREDENTIALS & GOVERNANCE (Apple Clean Typography, Zero Childish Pill Borders)
        */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 font-bold">
            Executive Credentials & Tenets
          </h2>
          <div className="p-5 rounded-2xl bg-[#0e214a]/40 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-work text-blue-100">
              {member.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="font-medium text-slate-100">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*
          BOTTOM VAULT ROOM INVITATION (Jackie & Ashley Only, Clean Light Blue Hue, Zero Borders)
        */}
        {isJackieOrAshley && (
          <section className="pt-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1f46] via-[#102758] to-[#0d1f46] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <Gamepad2 className="w-4 h-4" />
                  <span>The Vault Room</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-raleway text-white">
                  Executive Video & Arcade Lounge
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 font-work max-w-md">
                  Kirk Franklin ft. GloRilla live performance, Cyber Vault Breaker arcade, and direct executive connectivity.
                </p>
              </div>

              <button
                onClick={() => setShowVaultModal(true)}
                className="px-6 py-3 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition active:scale-95 shrink-0 flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Enter The Vault Room</span>
              </button>
            </div>
          </section>
        )}

      </main>

      {/*
        VAULT ROOM MODAL OVERLAY (With Kirk Franklin Video, Arcade & Social Icons)
      */}
      {showVaultModal && (
        <VaultRoom
          memberId={member.id}
          memberName={member.name}
          onClose={() => setShowVaultModal(false)}
        />
      )}
    </div>
  );
};
