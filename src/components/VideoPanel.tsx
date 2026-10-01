import React, { useRef } from 'react';

interface VideoPanelProps {
  roomTitle: string;
  roomBadge: string;
  videoSrc: string;
  posterImage?: string;
  pandoraExplanation: string;
  chapterHighlights: string[];
  keyStats: { label: string; value: string }[];
  defaultOpen?: boolean;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({
  videoSrc,
  posterImage = 'https://contax360.com/wp-content/uploads/2021/06/main-hero-background-image-scaled.jpg',
  pandoraExplanation,
  chapterHighlights,
  keyStats,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="my-8 w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden text-white relative">
      {/* Main Grid: Clean Video Player + Explainer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left: Video Player (Autoplay, Muted, Non-interactive Loop, No Overlays) */}
        <div className="lg:col-span-7 bg-black relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover max-h-[420px] pointer-events-none"
          />
        </div>

        {/* Right: Clean Narrative & Key Highlights with High-Readability Mobile Text */}
        <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 bg-[#060d1b] border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Primary Explanation Box - High Legibility Sans Matching Reference Image */}
            <div className="bg-[#0b172e] border border-blue-900/50 p-5 sm:p-6 rounded-2xl shadow-inner">
              <p className="text-base sm:text-lg md:text-xl text-slate-100 font-sans font-normal leading-relaxed tracking-normal">
                "{pandoraExplanation}"
              </p>
            </div>

            {/* Key Room Points with High-Contrast Bullets */}
            <div className="space-y-3 pt-1">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                Key Highlights
              </div>
              <ul className="space-y-3.5 text-sm sm:text-base md:text-lg text-slate-200 font-sans font-normal">
                {chapterHighlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0 mt-2.5 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                    <span className="leading-relaxed text-slate-100">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
            {keyStats.map((stat, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-[#0b172e] border border-slate-800/60">
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-300 font-sans">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-300 font-sans font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
