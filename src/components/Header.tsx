import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, MapPin, ChevronDown, Radio, 
  Building2, Headphones, Users, Mail, Compass, Volume2, VolumeX, 
  X
} from 'lucide-react';
import { getMercuryRetrogradeStatus } from '../utils/mercuryStatus';

interface HeaderProps {
  currentRoom: string;
  onSelectRoom: (room: string) => void;
  onStartTour?: () => void;
  isRadioPlaying?: boolean;
  radioStatusText?: string;
  onToggleRadio?: () => void;
  currentStationName?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentRoom, 
  onSelectRoom, 
  isRadioPlaying = false,
  radioStatusText = 'RADIO STANDBY',
  onToggleRadio,
  currentStationName = 'WHUR-FM 96.3 • Howard University • Washington D.C. & Maryland'
}) => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [estTimeStr, setEstTimeStr] = useState('');
  const [estDateStr, setEstDateStr] = useState('');
  const [mercuryStatus, setMercuryStatus] = useState(() => getMercuryRetrogradeStatus());
  const headerContainerRef = useRef<HTMLDivElement | null>(null);

  // Live EST Date & Time and Mercury updates
  useEffect(() => {
    const updateEstClock = () => {
      const now = new Date();
      
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setEstTimeStr(timeFormatter.format(now).replace(/[\/\(\)]/g, ''));
      setEstDateStr(dateFormatter.format(now).replace(/[\/\(\)]/g, ''));
      setMercuryStatus(getMercuryRetrogradeStatus(now));
    };

    updateEstClock();
    const interval = setInterval(updateEstClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerContainerRef.current && !headerContainerRef.current.contains(e.target as Node)) {
        setRoomsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation Items in strict order
  const navRooms = [
    { id: 'home', label: 'HOME', fullTitle: 'Main Lobby & Overview', desc: 'Freeport Montego Bay HQ Campus', icon: Building2 },
    { id: 'services', label: 'SERVICES', fullTitle: 'Services Room', desc: 'BPO, KPO & 24/7 Global CX Support', icon: Headphones },
    { id: 'careers', label: 'CAREERS', fullTitle: 'Careers & Hiring Room', desc: 'Daily Walk-In Interviews in Montego Bay', icon: Users },
    { id: 'about', label: 'ABOUT', fullTitle: 'About Us & Leadership', desc: '17+ Year Nearshore Legacy & Vision', icon: Compass },
    { id: 'contact', label: 'CONTACT', fullTitle: 'Contact Suite', desc: 'Direct Hotline & Free Consultation', icon: Mail },
    { id: 'radio', label: 'LOUNGE', fullTitle: 'Live Radio & Soundscape Lounge', desc: 'WHUR 96.3 • Montego Bay • Miami • Rain', icon: Radio },
  ];

  const handleRoomClick = (roomId: string) => {
    onSelectRoom(roomId);
    setRoomsMenuOpen(false);
  };

  const cleanStationName = (currentStationName || '')
    .replace(/[\(\)]/g, '')
    .replace(/\s*\/\s*/g, ' & ')
    .replace(/\//g, ' ')
    .trim();

  const cleanMercuryText = (mercuryStatus.statusText || '')
    .replace(/[\(\)]/g, '')
    .replace(/\s*\/\s*/g, ' - ')
    .replace(/\//g, ' ')
    .trim();

  return (
    <header ref={headerContainerRef} className="sticky top-0 z-[100] bg-[#070b16]/95 backdrop-blur-2xl border-b border-indigo-950/80 shadow-2xl text-white">
      {/* 1. TOP LIVE STATUS TICKER */}
      <div className="bg-[#04070f] text-slate-300 py-1.5 px-2.5 sm:px-6 border-b border-slate-900 text-[10px] sm:text-[11px] font-sans relative overflow-hidden select-none">
        <div className="overflow-hidden whitespace-nowrap w-full relative flex items-center">
          <div className="animate-marquee-slow flex items-center gap-8 text-slate-300">
            {/* Primary Track */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-cyan-400 font-semibold text-[10px] sm:text-[11px]">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Time: {estTimeStr} EST • {estDateStr}</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>
              
              <div className="flex items-center gap-1.5">
                <span className={`font-mono text-[10px] sm:text-[11px] font-semibold ${
                  mercuryStatus.isRetrograde ? 'text-amber-400' : 'text-purple-300'
                }`}>
                  {cleanMercuryText}
                </span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[10px] sm:text-[11px]">
                <Radio className="w-3 h-3 text-blue-400" />
                <span className="font-semibold">Station: {cleanStationName}</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-[10px] sm:text-[11px]">HQ Campus Online</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-[11px]">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Maryland & D.C. Executive Hub • Montego Bay Freeport • Miami</span>
              </div>
            </div>

            <span className="text-slate-700 font-bold shrink-0">•</span>

            {/* Seamless Duplicate Track for continuous zero-reset loop */}
            <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
              <div className="flex items-center gap-1.5 font-mono text-cyan-400 font-semibold text-[10px] sm:text-[11px]">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Time: {estTimeStr} EST • {estDateStr}</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>
              
              <div className="flex items-center gap-1.5">
                <span className={`font-mono text-[10px] sm:text-[11px] font-semibold ${
                  mercuryStatus.isRetrograde ? 'text-amber-400' : 'text-purple-300'
                }`}>
                  {cleanMercuryText}
                </span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[10px] sm:text-[11px]">
                <Radio className="w-3 h-3 text-blue-400" />
                <span className="font-semibold">Station: {cleanStationName}</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-[10px] sm:text-[11px]">HQ Campus Online</span>
              </div>
              <span className="text-slate-700 font-bold">•</span>

              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-[11px]">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Maryland & D.C. Executive Hub • Montego Bay Freeport • Miami</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo */}
          <div 
            onClick={() => handleRoomClick('home')}
            className="flex items-center cursor-pointer group shrink-0 select-none py-1"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight font-raleway group-hover:text-cyan-400 transition">
                  CONTAX
                </span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 font-raleway ml-1">
                  360
                </span>
              </div>
              <span className="text-[8px] font-bold text-slate-400 tracking-[0.22em] -mt-1 font-mono uppercase">
                BPO SOLUTIONS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5 text-[12px] lg:text-[13px] font-bold tracking-wider font-raleway">
            {navRooms.map((room) => {
              const isCurrent = currentRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className={`relative py-1.5 px-3 rounded-xl transition-all uppercase flex items-center gap-1 shrink-0 ${
                    isCurrent 
                      ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/40 font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{room.id === 'about' ? 'ABOUT US' : room.label}</span>
                </button>
              );
            })}

            {/* Desktop Radio Live Pill */}
            {onToggleRadio && (
              <button
                onClick={onToggleRadio}
                title={isRadioPlaying ? "Pause Radio" : "Play Radio"}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition border shrink-0 ${
                  isRadioPlaying 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {isRadioPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{radioStatusText || 'RADIO LIVE'}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span>RADIO STANDBY</span>
                  </>
                )}
              </button>
            )}
          </nav>

          {/* Mobile Radio Quick Control */}
          <div className="flex items-center gap-2 md:hidden">
            {onToggleRadio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRadio();
                }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 border transition ${
                  isRadioPlaying 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-slate-800/90 text-slate-400 border-slate-700'
                }`}
              >
                {isRadioPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>LIVE</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span>OFF</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 3. MOBILE SLEEK 6-ROOM NAVIGATION (COMPACT, ZERO WASTED SPACE, SMOOTH SCROLLING) */}
        <div className="grid grid-cols-6 md:hidden w-full gap-1 py-2 border-t border-slate-800/80 font-raleway">
          {navRooms.map(room => {
            const isCurrent = currentRoom === room.id;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                className={`w-full py-1.5 px-0.5 rounded-lg text-center transition font-bold uppercase text-[9px] xs:text-[10px] sm:text-[11px] flex items-center justify-center border ${
                  isCurrent 
                    ? 'bg-blue-600 text-white border-blue-400 font-extrabold shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800/80'
                }`}
              >
                <span className="truncate">{room.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
