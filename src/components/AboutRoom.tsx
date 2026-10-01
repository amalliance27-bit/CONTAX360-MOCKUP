import React from 'react';
import { 
  Building2, Users, ShieldCheck, Award, 
  Linkedin, Globe, Heart, DoorOpen, Sparkles, ArrowRight
} from 'lucide-react';
import { VideoPanel } from './VideoPanel';
import { TestimonialsSection } from './TestimonialsSection';
import { TEAM_MEMBERS, TeamMember } from '../data/teamData';

interface AboutRoomProps {
  onSelectRoom: (room: string) => void;
  onOpenExecutiveRoom?: (member: TeamMember) => void;
}

export const AboutRoom: React.FC<AboutRoomProps> = ({ onSelectRoom, onOpenExecutiveRoom }) => {
  return (
    <div className="flex flex-col w-full bg-white text-slate-800">
      {/* 1. HERO BANNER: "About Our Company" */}
      <section className="relative bg-[#090f22] text-white flex items-center justify-center text-center px-4 pt-4 sm:pt-10 pb-8 sm:pb-16 overflow-hidden">
        {/* Real office background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e1c]/90 via-[#0d1829]/95 to-[#0a1222] pointer-events-none" />

        {/* Subtle watermark CONTAX 360 text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-7xl sm:text-9xl font-black font-raleway text-white tracking-widest uppercase">
            CONTAX 360
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
            Founded 2007 by Jacqueline Sutherland
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white">
            About Our Company
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-work max-w-xl mx-auto leading-relaxed">
            A premier woman and minority-owned nearshore and onshore BPO & KPO leader.
          </p>
        </div>
      </section>

      {/* 2. DEDICATED ABOUT US ROOM VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        <VideoPanel
          roomTitle="Company History & Leadership Vision"
          roomBadge="About Us Video Explainer"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Contax-Staff-And-Environment-1-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg"
          pandoraExplanation="Step inside the Contax360 story! Founded in 2007 by engineer Jacqueline Sutherland, Contax360 was built on a bold mission: to prove that an agile, woman and minority-owned BPO could deliver world-class technological innovation and empathetic customer experiences."
          chapterHighlights={[
            "17+ year track record as an owner-managed Caribbean and US BPO enterprise",
            "WBENC Women-Owned & NMSDC Minority Business Enterprise certified",
            "Nearshore campuses in Montego Bay HQ and Kingston plus Florida headquarters",
            "Leader in secure Work-From-Home (WFH) technology and high-availability operations"
          ]}
          keyStats={[
            { label: "Founded", value: "2007" },
            { label: "Founder", value: "J. Sutherland" },
            { label: "Supplier Diversity", value: "WBENC / NMSDC" },
            { label: "Global Offices", value: "3 Hubs" }
          ]}
        />
      </section>

      {/* 3. FOUNDER STORY & EXECUTIVE TEAM PHOTO (Border-Free, Blinking Dots) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 font-work">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#006cff] font-raleway leading-tight">
              Contax360 was founded in 2007 by Jacqueline Sutherland.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                After a successful Engineering and I.T. consulting career Jacqueline decided to apply her technical and business background to starting a BPO company. BPO’s are historically a business area where few women and even fewer women of color have been involved as founders and owners.
              </p>

              <p>
                Never one to shy from a challenge, Jackie was determined to build a BPO that was different; agile, responsive, customer-focused, that embraces technology and teamwork. The result has been happy customers, amazing growth and global recognition as a woman and minority-owned BPO.
              </p>

              <p>
                Contax360 offers a full range of BPO and KPO services from our two nearshore locations in Jamaica (Montego Bay HQ and Kingston), as well as onshore services from our U.S. headquarters in Plantation, Florida. As a leader in Work From Home (WFH) technology and practices, we are able to provide virtual services from almost any global location providing maximum flexibility and redundancy.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectRoom('home')}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 transition tracking-wider uppercase"
              >
                Back to home
              </button>
            </div>
          </div>

          {/* Right Image / Team Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-white">
              {/* Executive photo of Jackie Sutherland */}
              <div 
                onClick={() => onOpenExecutiveRoom && onOpenExecutiveRoom(TEAM_MEMBERS[0])}
                className="p-8 text-center flex flex-col items-center bg-slate-50 cursor-pointer group"
              >
                <div className="relative w-48 h-56 rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-2xl transition duration-300">
                  <img 
                    src="/team/jacqueline_sutherland.jpg" 
                    alt="Jacqueline Sutherland"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/contax360-jackie%20Sutheland.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold font-raleway text-slate-900 group-hover:text-blue-600 transition">Jacqueline Sutherland</h4>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">Founder & Chief Executive Officer</p>
                <p className="text-xs text-slate-500 font-work max-w-xs mt-2 italic mb-4">
                  "Engineering precision and authentic Caribbean hospitality create lasting client value."
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenExecutiveRoom && onOpenExecutiveRoom(TEAM_MEMBERS[0]);
                  }}
                  className="w-full py-2.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Enter Suite</span>
                </button>
              </div>

              {/* Quick Specs with Blinking Live Status Dots */}
              <div className="p-6 bg-white text-xs text-slate-600 space-y-3 font-work">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span><strong>Founded:</strong> 2007 by Jacqueline Sutherland</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span><strong>Nearshore Facilities:</strong> Montego Bay HQ & Kingston, Jamaica</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span><strong>US Onshore:</strong> Plantation, Florida Headquarters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span><strong>Certifications:</strong> WBENC Women-Owned, NMSDC MBE, HIPAA, PCI DSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE LEADERSHIP TEAM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#002f6c] font-bold mb-2">
            Executive Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002f6c] font-raleway">
            Our Executive Team
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-work">
            Meet the leaders driving Jamaican nearshore excellence and global enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              onClick={() => onOpenExecutiveRoom && onOpenExecutiveRoom(member)}
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 hover:border-blue-300 flex flex-col items-center justify-between cursor-pointer relative overflow-hidden"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-36 h-44 rounded-2xl overflow-hidden mb-4 shadow-md bg-slate-200 group-hover:shadow-xl transition duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (member.fallbackImage && target.src !== member.fallbackImage) {
                        target.src = member.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-raleway group-hover:text-blue-600 transition">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mt-1 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 font-work leading-relaxed line-clamp-3 mb-6">
                  {member.shortBio}
                </p>
              </div>

              {/* Enter Suite Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenExecutiveRoom && onOpenExecutiveRoom(member);
                }}
                className="w-full py-2.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Enter Suite</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOCATIONS & CAPACITY SUMMARY */}
      <section className="py-14 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-8 bg-white rounded-3xl shadow-sm">
            <h4 className="font-bold text-[#002f6c] text-lg font-raleway">Montego Bay HQ</h4>
            <p className="text-xs text-slate-500 mt-1">1 Mangrove Way, Freeport, Montego Bay, Jamaica, W.I.</p>
            <p className="text-xs text-blue-600 font-semibold mt-2">Primary Nearshore Operations Center</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm">
            <h4 className="font-bold text-[#002f6c] text-lg font-raleway">Kingston Facility</h4>
            <p className="text-xs text-slate-500 mt-1">Kingston Metropolitan Area, Jamaica</p>
            <p className="text-xs text-purple-600 font-semibold mt-2">Nearshore Tech & Back-Office Hub</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm">
            <h4 className="font-bold text-[#002f6c] text-lg font-raleway">Plantation, Florida</h4>
            <p className="text-xs text-slate-500 mt-1">Plantation, Florida, USA</p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">US Onshore & Executive Management</p>
          </div>
        </div>
      </section>

      {/* 5. PURPLE / BLUE CTA BANNER */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#451ce7] to-[#006cff] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway">
            Discover What Nearshore Excellence Can Do For Your Business
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-work">
            Connect directly with Jackie Sutherland and our executive leadership team today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectRoom('contact')}
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 shadow-xl transition"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* 6. SIDE-SCROLLING TESTIMONIALS */}
      <TestimonialsSection onSelectRoom={onSelectRoom} />
    </div>
  );
};
