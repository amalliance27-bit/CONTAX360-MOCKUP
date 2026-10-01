import React, { useState, useRef, useEffect } from 'react';
import { 
  Linkedin, Mail, Twitter, Instagram, Calendar, 
  Gamepad2, Brain, X, Bot
} from 'lucide-react';
import { audioCoordinator } from '../utils/audioCoordinator';
import { ArcadeRoom } from './ArcadeRoom';
import { JarvisRoom } from './JarvisRoom';

interface VaultRoomProps {
  memberId: string;
  memberName: string;
  onClose: () => void;
}

export const VaultRoom: React.FC<VaultRoomProps> = ({ memberId, memberName, onClose }) => {
  const isJackie = memberId === 'jacqueline-sutherland';

  const [activeTab, setActiveTab] = useState<'video' | 'arcade' | 'vip' | 'jarvis'>('video');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Stop all other audio across app on mount
  useEffect(() => {
    audioCoordinator.stopAllVoice();
    document.querySelectorAll('audio, video').forEach((el) => {
      if (el !== videoRef.current) {
        try {
          (el as HTMLMediaElement).pause();
        } catch (_) {}
      }
    });
    window.dispatchEvent(new CustomEvent('contax:video-play'));
  }, []);

  // Clean Social Icons
  const socialIcons = isJackie
    ? [
        {
          id: 'linkedin',
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/jacqueline-sutherland-contax360',
          icon: <Linkedin className="w-4 h-4" />
        },
        {
          id: 'email',
          name: 'Direct Email',
          url: 'mailto:jackie@contax360.com?subject=Inquiry%20from%20The%20Vault%20Room',
          icon: <Mail className="w-4 h-4" />
        },
        {
          id: 'twitter',
          name: 'X (Twitter)',
          url: 'https://x.com/JackieSutherBPO',
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
          url: 'mailto:jackie@contax360.com?subject=Request%20Private%20Executive%20Briefing',
          icon: <Calendar className="w-4 h-4" />
        }
      ]
    : [
        {
          id: 'linkedin',
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/ashley-martin-enterprise-bpo',
          icon: <Linkedin className="w-4 h-4" />
        },
        {
          id: 'email',
          name: 'Direct Email',
          url: 'mailto:ashley.martin@contax360.com?subject=Enterprise%20Migration%20Inquiry',
          icon: <Mail className="w-4 h-4" />
        },
        {
          id: 'twitter',
          name: 'X (Twitter)',
          url: 'https://x.com/AshleyM_Contax',
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
          name: 'Book Migration Call',
          url: 'mailto:ashley.martin@contax360.com?subject=Schedule%20Enterprise%20Migration%20Scoping%20Call',
          icon: <Calendar className="w-4 h-4" />
        }
      ];

  return (
    <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-fadeIn">
      
      {/* 
        COOL BLUE EXECUTIVE VAULT ROOM CONTAINER (No borders, light blue hue)
      */}
      <div className="w-full max-w-4xl bg-[#091530] text-slate-100 rounded-3xl shadow-[0_30px_70px_rgba(0,10,35,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Cool Blue Banner Header */}
        <div className="bg-gradient-to-r from-[#004fc7] via-[#0066ff] to-[#004fc7] px-6 py-3.5 flex items-center justify-between text-white shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#34d399]" />
            <div>
              <h3 className="font-bold text-base sm:text-lg font-raleway flex items-center gap-2">
                <span>The Vault Room</span>
                <span className="text-xs font-normal text-blue-100 opacity-90">•</span>
                <span className="text-xs font-semibold text-blue-100">{memberName}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition active:scale-95"
              title="Close Vault Room"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cool Blue Segmented Control Tabs */}
        <div className="px-6 pt-3.5 pb-2 bg-[#081124] flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex p-1 bg-[#0f1d3c] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-1.5 rounded-lg transition ${
                activeTab === 'video' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
              }`}
            >
              Executive Video
            </button>
            <button
              onClick={() => setActiveTab('arcade')}
              className={`px-4 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'arcade' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Arcade Room</span>
            </button>
            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'vip' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>VIP Mind Games</span>
            </button>
            <button
              onClick={() => setActiveTab('jarvis')}
              className={`px-4 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'jarvis' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jarvis-27 AI</span>
            </button>
          </div>

          {/* Social Media Icons Row */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-blue-300/80 mr-1 hidden sm:inline">Connect:</span>
            {socialIcons.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                className="p-2 rounded-full bg-[#0f1d3c] text-blue-200 hover:text-white hover:bg-[#0066ff] shadow-xs transition duration-200 active:scale-95"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Content Body - Cool Blue Tone */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#081226] text-slate-100">
          
          {/* TAB 1: CLEAN VIDEO PANEL (Plays once, native clean controls, no ugly overlay bar) */}
          {activeTab === 'video' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden bg-black shadow-2xl relative aspect-video max-h-[460px] mx-auto flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/videos/kirk_franklin_performance.mp4"
                  poster="https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg"
                  autoPlay
                  controls
                  loop={false}
                  playsInline
                  onPlay={() => {
                    audioCoordinator.stopAllVoice();
                    document.querySelectorAll('audio, video').forEach((el) => {
                      if (el !== videoRef.current) {
                        try {
                          (el as HTMLMediaElement).pause();
                        } catch (_) {}
                      }
                    });
                    window.dispatchEvent(new CustomEvent('contax:video-play'));
                  }}
                  className="w-full h-full object-contain"
                >
                  <source src="/videos/kirk_franklin_performance.mp4" type="video/mp4" />
                  <source src="https://raw.githubusercontent.com/amalliance27-bit/Ask247-Website-Promo/651240b0dfc166e19fd187279dbaf638b0acdcde/Kirk%20Franklin%20(ft.%20GloRilla)%20-%20This%20Time%20_%20From%20The%20Block%20Performance%20480P.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Clean Explainer Note in Cool Blue */}
              <div className="p-4 rounded-2xl bg-[#0f2148]/60 text-xs sm:text-sm text-blue-100 leading-relaxed font-work shadow-sm">
                <span className="font-semibold text-cyan-300 block mb-1">
                  Executive Energy & Culture:
                </span>
                Kirk Franklin ft. GloRilla live performance ("This Time _ From The Block") celebrating perseverance, vibrant energy, and Caribbean BPO executive excellence.
              </div>
            </div>
          )}

          {/* TAB 2: ARCADE ROOM (Tic Tac Toe & Rock Paper Scissors) */}
          {activeTab === 'arcade' && (
            <ArcadeRoom defaultTab="arcade" hideHeaderSwitcher={true} />
          )}

          {/* TAB 3: VIP MIND GAMES (Simon Color Sequence) */}
          {activeTab === 'vip' && (
            <ArcadeRoom defaultTab="vip" hideHeaderSwitcher={true} />
          )}

          {/* TAB 4: JARVIS-27 AI AGENT & WEB DESIGN SHOWCASE */}
          {activeTab === 'jarvis' && (
            <div className="rounded-2xl overflow-hidden -mx-2 -my-2 sm:-mx-4 sm:-my-4">
              <JarvisRoom onReturn={() => setActiveTab('video')} />
            </div>
          )}

        </div>

        {/* Clean Footer with Direct Social Connect Icons in Cool Blue */}
        <div className="p-3.5 bg-[#081124] flex items-center justify-between text-xs text-blue-300/80">
          <span>Contax360 Executive Suite • The Vault Room</span>
          <div className="flex items-center gap-1.5">
            {socialIcons.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                className="p-1.5 text-blue-300 hover:text-white transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VaultRoom;
