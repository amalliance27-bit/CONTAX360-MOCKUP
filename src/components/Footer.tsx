import React from 'react';
import { Linkedin, Mail, Phone, ArrowRight } from 'lucide-react';

interface FooterProps {
  onSelectRoom: (room: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRoom }) => {
  return (
    <footer className="bg-[#111625] text-slate-400 font-work text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
        {/* Column 1: Logo & Company Description (Exact Duplicate) */}
        <div className="lg:col-span-4 space-y-4">
          <div 
            onClick={() => onSelectRoom('home')}
            className="flex items-center cursor-pointer"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-2xl font-black text-white tracking-wider font-raleway">
                  CONTAX
                </span>
                <span className="text-2xl font-black text-[#006cff] font-raleway ml-1">
                  360
                </span>
                <span className="ml-1.5 text-blue-400 font-bold text-lg">❯❯</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-blue-400 -mt-1 font-mono">
                BPO SOLUTIONS
              </span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
            Contax360 BPO Solutions is a privately owned and managed business process outsourcing company operating in the US and Jamaica with a focus on bringing the best solution through our onshore and nearshore facilities for clients.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">WBENC Certified</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">NMSDC MBE</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">HIPAA Compliant</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">PCI DSS</span>
          </div>
        </div>

        {/* Column 2: Menu */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-raleway">
            Menu
          </h4>
          <ul className="space-y-2 font-work text-xs">
            <li>
              <button 
                onClick={() => onSelectRoom('home')} 
                className="hover:text-blue-400 transition flex items-center gap-1.5"
              >
                <span className="text-blue-500 font-bold">→</span> Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectRoom('services')} 
                className="hover:text-blue-400 transition flex items-center gap-1.5"
              >
                <span className="text-blue-500 font-bold">→</span> Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectRoom('careers')} 
                className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-semibold"
              >
                <span className="text-amber-400 font-bold">→</span> Careers
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectRoom('about')} 
                className="hover:text-blue-400 transition flex items-center gap-1.5"
              >
                <span className="text-blue-500 font-bold">→</span> About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectRoom('contact')} 
                className="hover:text-blue-400 transition flex items-center gap-1.5"
              >
                <span className="text-blue-500 font-bold">→</span> Contact
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectRoom('radio')} 
                className="hover:text-emerald-400 transition flex items-center gap-1.5 text-emerald-300"
              >
                <span className="text-emerald-400 font-bold">→</span> Lounge
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contax 360 HQ (Exact Duplicate) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-raleway">
            Contax 360 HQ
          </h4>
          <div className="text-slate-300 leading-relaxed text-xs">
            <p className="font-semibold text-white">1 Mangrove Way, Freeport</p>
            <p>Montego Bay, Jamaica, W.I.</p>
          </div>

          <div className="pt-2">
            <a
              href="https://www.linkedin.com/company/contax360/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0a66c2]/20 border border-[#0a66c2]/40 text-[#0a66c2] hover:bg-[#0a66c2]/30 transition text-xs font-semibold"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Column 4: Start a conversation (Exact Duplicate) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-raleway">
            Start a conversation
          </h4>
          <div className="space-y-2 text-xs">
            <a
              href="mailto:info@contax360.com"
              className="text-slate-300 hover:text-blue-400 transition block font-work"
            >
              info@contax360.com
            </a>
            <a
              href="tel:+18774474627"
              className="text-white hover:text-blue-400 transition block font-bold font-mono text-sm"
            >
              +1 877-447-4627
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © 2007 - {new Date().getFullYear()} Contax360 BPO Solutions. All Rights Reserved. Privately Owned & Managed.
        </div>
        <div className="flex items-center gap-2">
          <span>AI Tour Guide Host:</span>
          <span className="text-blue-400 font-semibold">Pandora Lee</span>
        </div>
      </div>
    </footer>
  );
};
