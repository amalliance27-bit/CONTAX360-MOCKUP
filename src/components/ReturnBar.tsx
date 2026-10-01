import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ReturnBarProps {
  onReturn: () => void;
  roomTitle?: string;
  targetLabel?: string;
  className?: string;
}

export const ReturnBar: React.FC<ReturnBarProps> = ({
  onReturn,
  roomTitle,
  targetLabel = 'Lobby',
  className = ''
}) => {
  return (
    <div className={`w-full bg-gradient-to-r from-[#00388c] via-[#0051cc] to-[#00388c] shadow-md py-2.5 px-4 sm:px-8 text-white z-40 relative ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Upper Left: Icon Logo Return Button with Pulsating Dot */}
        <button
          onClick={onReturn}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition active:scale-95 group text-white shrink-0 cursor-pointer"
          title={`Return to ${targetLabel}`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#34d399]" />
          <ArrowLeft className="w-4 h-4 text-cyan-200 group-hover:-translate-x-0.5 transition" />
          <div className="flex items-center text-xs font-black font-raleway tracking-tight">
            <span>CONTAX</span>
            <span className="text-cyan-300 ml-0.5">360</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100 pl-1.5 border-l border-white/25">
            Return to {targetLabel}
          </span>
        </button>

        {roomTitle && (
          <div className="flex items-center shrink-0">
            <span className="text-[11px] sm:text-xs font-extrabold font-raleway tracking-widest uppercase text-white bg-white/15 px-3 py-1 rounded-full">
              {roomTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
