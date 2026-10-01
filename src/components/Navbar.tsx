import React, { useState } from 'react';
import { 
  Bot, Phone, Menu, X, Sparkles, 
  Briefcase, ChevronRight, Layers, Globe, Building2
} from 'lucide-react';

export const Navbar: React.FC<{
  onStartTour: () => void;
  onNavigate: (sectionId: string) => void;
}> = ({ onStartTour, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Services', target: 'services' },
    { label: 'Locations', target: 'locations' },
    { label: 'Infomercial Suite', target: 'infomercial' },
    { label: 'Hiring Room', target: 'hiring', highlight: true },
    { label: 'About Us', target: 'about' },
    { label: 'ROI Calculator', target: 'roi' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50 py-1.5 px-4 text-center border-b border-white/5 text-[11px] sm:text-xs text-slate-300 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            Montego Bay Walk-Ins
          </span>
          <span className="hidden sm:inline text-slate-300">Walk in Mon–Fri 9:00 AM – 2:00 PM at 1 Mangrove Way, Freeport</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <a href="tel:+18774474627" className="flex items-center gap-1 hover:text-white transition font-mono">
            <Phone className="w-3 h-3 text-blue-400" /> +1 877-447-4627
          </a>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-emerald-400 font-medium">WBENC & NMSDC Certified</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleItemClick('hero')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight">
              <span className="text-2xl font-black text-white tracking-wider font-raleway group-hover:text-blue-400 transition">
                CONTAX
              </span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-raleway ml-1">
                360
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-blue-400 -mt-1 font-mono">
              BPO SOLUTIONS
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleItemClick(item.target)}
              className={`hover:text-blue-400 transition-colors py-1 ${
                item.highlight
                  ? 'text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold'
                  : ''
              }`}
            >
              {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onStartTour}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Tour Guide</span>
          </button>

          <button
            onClick={() => handleItemClick('contact')}
            className="px-5 py-2.5 rounded-xl contax-gradient text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all transform active:scale-95"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onStartTour}
            className="p-2 rounded-lg bg-slate-900 text-blue-400 border border-slate-800"
            title="Start AI Tour"
          >
            <Bot className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleItemClick(item.target)}
              className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-blue-400 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          ))}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onStartTour();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" /> Start AI Tour with Pandora Lee
            </button>
            <button
              onClick={() => handleItemClick('contact')}
              className="w-full py-3 rounded-xl contax-gradient text-white font-bold text-xs shadow-lg"
            >
              Let's Talk (+1 877-447-4627)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
