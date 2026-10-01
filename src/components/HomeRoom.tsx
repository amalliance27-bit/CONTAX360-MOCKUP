import React from 'react';
import { 
  Building2, MapPin, Globe, Headphones, FileText, Monitor, 
  Calculator, Stethoscope, ShieldAlert, Users, Phone, ShieldCheck,
  DoorOpen, Sparkles, ArrowRight
} from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { VideoPanel } from './VideoPanel';
import { TestimonialsSection } from './TestimonialsSection';
import { TEAM_MEMBERS, TeamMember } from '../data/teamData';

interface HomeRoomProps {
  onSelectRoom: (room: string) => void;
  onStartTour: () => void;
  onOpenExecutiveRoom?: (member: TeamMember) => void;
}

export const HomeRoom: React.FC<HomeRoomProps> = ({ onSelectRoom, onOpenExecutiveRoom }) => {
  return (
    <div className="flex flex-col w-full bg-white text-slate-800">
      {/* 1. HERO SECTION WITH 3D SPLINE SCENE (Apple iOS Glass Style, Border-Free) */}
      <section className="relative bg-gradient-to-b from-[#070e1c] via-[#0d1829] to-[#0a1222] text-white flex items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-8 sm:pb-16 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#006cff" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <div className="space-y-2.5">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-cyan-400 font-bold">
                Nearshore & Onshore Call Center Excellence
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white leading-tight">
                A Global Provider of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  Contact Center & BPO Solutions
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-sans font-normal leading-relaxed max-w-2xl">
              Contax360 BPO Solutions is a privately owned and managed business process outsourcing company operating in the US and Jamaica. We bring the best solutions through our onshore and nearshore facilities for clients.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onSelectRoom('services')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition active:scale-95"
              >
                Explore Services
              </button>

              <button
                onClick={() => onSelectRoom('careers')}
                className="px-6 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase transition backdrop-blur-md active:scale-95"
              >
                Walk-In Hiring
              </button>
            </div>
          </div>

          {/* Right: 3D Interactive Spline Canvas */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full h-[320px] sm:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-2xl relative backdrop-blur-xl border border-white/5">
              <SplineScene 
                scene="https://prod.spline.design/ipj9zB1dtTJc39jn/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED MAIN LOBBY VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-6">
        <VideoPanel
          roomTitle="Main Lobby & Campus Overview"
          roomBadge="Lobby Video Tour"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Contax-Staff-And-Environment-1-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/06/main-hero-background-image-scaled.jpg"
          pandoraExplanation="Welcome to the Contax360 Main Lobby! Watch our staff in action across our Freeport Montego Bay facility. We blend Jamaican warmth with enterprise SLAs to provide 50-60% savings compared to US domestic contact centers."
          chapterHighlights={[
            "1 Mangrove Way, Freeport, Montego Bay headquarters campus with fiber redundancy",
            "English-fluent nearshore workforce with 100% US Eastern time zone synchronization",
            "Owner-managed leadership founded in 2007 by Jacqueline Sutherland",
            "Omni-channel chat, voice, IT helpdesk, and back-office operations"
          ]}
          keyStats={[
            { label: "Cost Reduction", value: "50% - 60%" },
            { label: "CSAT Benchmark", value: "99.4%" },
            { label: "Industry Legacy", value: "17+ Years" },
            { label: "Locations", value: "Jamaica & US" }
          ]}
        />
      </section>

      {/* 3. AUTHENTIC MAIN LOBBY & MONTEGO BAY CAMPUS PHOTOGRAPHIC SHOWCASE (Apple iOS Glass Aesthetic) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#002f6c] mb-2">
            Freeport Montego Bay Campus
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002f6c] font-raleway">
            Our Facilities & Work Environment
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-work leading-relaxed">
            Take a look inside our high-tech operations floors, modern agent stations, and tropical executive campus at 1 Mangrove Way, Freeport.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Photo 1: Main Operations Center */}
          <div className="group rounded-3xl overflow-hidden shadow-lg bg-slate-950 relative h-72">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg" 
              alt="Montego Bay Operations Floor"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider">Active Operations</span>
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Main Operations Floor</h3>
              <p className="text-xs text-slate-300 mt-1 font-work">Ergonomic dual-monitor stations & redundant fiber networks.</p>
            </div>
          </div>

          {/* Photo 2: Omni-Channel Specialist Pods */}
          <div className="group rounded-3xl overflow-hidden shadow-lg bg-slate-950 relative h-72">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/contax-callcenter-headset-bpokpo-servicesbgalt4.jpg" 
              alt="Customer Interaction Pods"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider">Specialist Pods</span>
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Customer Care Pods</h3>
              <p className="text-xs text-slate-300 mt-1 font-work">24/7 high-touch voice, live chat, and SMS specialists.</p>
            </div>
          </div>

          {/* Photo 3: Freeport Campus Environment */}
          <div className="group rounded-3xl overflow-hidden shadow-lg bg-slate-950 relative h-72 sm:col-span-2 lg:col-span-1">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/contax-360-palm-tree-background-3.jpg" 
              alt="Freeport Campus Environment"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">Freeport, Montego Bay</span>
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Freeport Campus</h3>
              <p className="text-xs text-slate-300 mt-1 font-work">Private shuttle fleet, staff cafeteria, and on-site training center.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATIONS 3-BOX SECTION (Apple iOS Glass Style) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Sub-Grid: 3 Colored Location Cards */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Box 1: Nearshore - Jamaica */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#006cff] to-[#004bb8] text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
              <div className="w-28 h-24 rounded-2xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center shrink-0">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/04/jamaica-contax-uai-258x179.png" 
                  alt="Jamaica Nearshore"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-raleway">Nearshore - Jamaica</h3>
                <p className="mt-2 text-sm text-blue-50 font-work leading-relaxed">
                  With 2 locations in Jamaica, we provide high-value services with a native English-speaking workforce located in U.S. time zones.
                </p>
                <div className="mt-3 text-xs font-semibold text-blue-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  1 Mangrove Way, Freeport, Montego Bay HQ & Kingston
                </div>
              </div>
            </div>

            {/* Sub Row: Box 2 (Florida) & Box 3 (Virtual) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Box 2: Onshore - Florida */}
              <div className="p-6 rounded-3xl bg-[#451ce7] text-white shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-20 h-16 rounded-xl bg-white/15 backdrop-blur-md p-1.5 flex items-center justify-center mb-4">
                    <img 
                      src="https://contax360.com/wp-content/uploads/2021/04/florida-contax-uai-258x179.png" 
                      alt="Florida Onshore"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold font-raleway">Onshore - Florida</h3>
                  <p className="mt-2 text-xs text-purple-100 font-work leading-relaxed">
                    U.S. based resources provide a full spectrum of services from our Florida facility, Virtual, or co-located in your facility.
                  </p>
                </div>
                <div className="mt-4 text-[11px] text-purple-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
                  Plantation, Florida Headquarters
                </div>
              </div>

              {/* Box 3: Virtual - Worldwide */}
              <div className="p-6 rounded-3xl bg-[#004e92] text-white shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-20 h-16 rounded-xl bg-white/15 backdrop-blur-md p-1.5 flex items-center justify-center mb-4">
                    <img 
                      src="https://contax360.com/wp-content/uploads/2021/04/globe-contax-icon3-uai-258x179.png" 
                      alt="Global Virtual"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold font-raleway">Virtual - Worldwide</h3>
                  <p className="mt-2 text-xs text-blue-100 font-work leading-relaxed">
                    Our advanced WFH infrastructure allows for virtual agents to be deployed from almost any location globally.
                  </p>
                </div>
                <div className="mt-4 text-[11px] text-blue-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  Global Secure Clean-Room Network
                </div>
              </div>
            </div>
          </div>

          {/* Right: Team / Environment Showcase Box */}
          <div className="md:col-span-5 rounded-3xl bg-slate-900 p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 font-mono text-[11px] font-bold inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MONTEGO BAY ENVIRONMENT
              </span>
              <h3 className="text-2xl font-bold font-raleway">
                Dynamic Motivation & Innovation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-work leading-relaxed">
                Step inside our state-of-the-art contact center in Freeport, Montego Bay. Modern ergonomic workstations, redundant fiber connectivity, and a thriving company culture.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Looking for a career? <span className="text-amber-400 font-bold">Walk-Ins Open!</span>
              </div>
              <button
                onClick={() => onSelectRoom('careers')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
              >
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET OUR TEAM SECTION (Positioned right after Motivation & Innovation, above Services) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002f6c] font-raleway">
            Meet Our Team
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-work leading-relaxed">
            We're proud to be recognized as a Women & Minority Owned Business. Click any team member to enter their executive office.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {TEAM_MEMBERS.map((member, i) => (
            <div 
              key={i} 
              onClick={() => onOpenExecutiveRoom && onOpenExecutiveRoom(member)}
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 hover:border-blue-300 flex flex-col items-center justify-between cursor-pointer relative overflow-hidden"
            >
              <div className="flex flex-col items-center w-full">
                {/* Portrait */}
                <div className="relative w-44 h-52 rounded-2xl overflow-hidden mb-5 shadow-lg bg-slate-200 group-hover:shadow-2xl transition duration-300">
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
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 font-work leading-relaxed line-clamp-3 mb-6">
                  {member.shortBio}
                </p>
              </div>

              {/* Enter Suite Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenExecutiveRoom && onOpenExecutiveRoom(member);
                }}
                className="w-full py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group-hover:bg-blue-700"
              >
                <span>Enter Suite</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => onSelectRoom('about')}
            className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition"
          >
            Learn More About Our Story & Leadership
          </button>
        </div>
      </section>

      {/* 6. BPO & KPO SERVICES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-slate-50/80 backdrop-blur-xl rounded-3xl my-8 border border-slate-200/60 shadow-sm">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002f6c] font-raleway">
            BPO & KPO Services
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-work">
            Full spectrum solutions delivered by skilled nearshore teams in Jamaica and Florida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Customer Interaction */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-call-center-blue.png" 
                alt="Customer Interaction" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">Customer Interaction</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              We provide a full range of Omni-Channel services from traditional phone and email to fully integrated chat and social media.
            </p>
          </div>

          {/* Card 2: Back-office Transactions */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-financial-blue.png" 
                alt="Back-office Transactions" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">Back-office Transactions</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              We help organizations increase customer satisfaction with services ranging from data entry to complex transactions requiring compliance and validation.
            </p>
          </div>

          {/* Card 3: IT & Software Operations */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-IT-blue.png" 
                alt="IT & Software Operations" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">IT & Software Operations</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              Our technical expertise allows us to provide multi-tiered support for customers or employees.
            </p>
          </div>

          {/* Card 4: Finance & Accounting */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/06/contax-360-service-icon-calculator-blue-e1623878158617.png" 
                alt="Finance & Accounting" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">Finance & Accounting</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              We streamline and enhance your finance and accounting processes to increase efficiency and maintain compliance.
            </p>
          </div>

          {/* Card 5: Legal & Healthcare Processing */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-medical-blue.png" 
                alt="Legal & Healthcare Processing" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">Legal & Healthcare Processing</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              We support the most demanding and complex processes as an adjunct to your team or to offload critical and time-consuming tasks.
            </p>
          </div>

          {/* Card 6: Managed Security */}
          <div className="glass-panel p-8 rounded-3xl shadow-sm glass-card-hover text-center flex flex-col items-center border border-white/80">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <img 
                src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-data-lock-blue.png" 
                alt="Managed Security" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">Managed Security</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-work leading-relaxed">
              We provide 24x7 MSSP services to extend your information security and network operations capabilities.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onSelectRoom('services')}
            className="px-6 py-3.5 rounded-2xl bg-[#006cff] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition active:scale-95"
          >
            Explore Full Services Specifications
          </button>
        </div>
      </section>

      {/* 7. CERTIFICATIONS ROW */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
          <div className="flex flex-col items-center p-3">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/nmsdc-mbe-certifiedcontax-360-certification-uai-258x133.png" 
              alt="NMSDC MBE Certified"
              className="h-14 object-contain"
            />
          </div>
          <div className="flex flex-col items-center p-3">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/women-owned-certified-contax-360-certificatio-uai-258x133.png" 
              alt="WBENC Women Owned"
              className="h-14 object-contain"
            />
          </div>
          <div className="flex flex-col items-center p-3">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/hippa-compliant-contax-360-certification-1-uai-258x133.png" 
              alt="HIPAA Compliant"
              className="h-14 object-contain"
            />
          </div>
          <div className="flex flex-col items-center p-3">
            <img 
              src="https://contax360.com/wp-content/uploads/2021/05/pci-contax-360-certification-uai-258x133.png" 
              alt="PCI DSS Certified"
              className="h-14 object-contain"
            />
          </div>
        </div>
      </section>

      {/* 8. PURPLE / BLUE CTA BANNER */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#451ce7] to-[#006cff] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway leading-tight">
            Whether you are exploring options or have an immediate need, we can work with you to provide the right information or solution.
          </h2>
          <div>
            <button
              onClick={() => onSelectRoom('contact')}
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 shadow-xl transition"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* 9. SIDE-SCROLLING TESTIMONIALS (CUSTOMERS & WORKERS) */}
      <TestimonialsSection onSelectRoom={onSelectRoom} />

      {/* 10. WEB DESIGN BY JARVIS-27 PULSATING BUTTON / AI AGENT SHOWCASE */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#060d1d] via-black to-[#050e1f] text-center relative overflow-hidden select-text border-t border-emerald-950/60">
        {/* Subtle Matrix glow lines */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center space-y-6">
          
          {/* Active AI Agent Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950 border border-[#00FF41]/30 text-[#00FF41] text-xs font-mono uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
            </span>
            <span>AI Agent Power Enhancement Studio</span>
          </div>

          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-4xl font-black font-raleway text-white tracking-tight">
              Website Outdated, Complex, or Slow?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-work leading-relaxed">
              We upgrade existing websites or build from scratch with autonomous AI Agent enhancements at the most affordable rates.
            </p>
          </div>

          {/* THE CLEAN SLEEK JARVIS 27 BUTTON (NO HEAVY GLOW) */}
          <div className="pt-2">
            <button
              onClick={() => onSelectRoom('jarvis')}
              className="inline-flex items-center gap-3.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-slate-950 border border-[#00FF41] hover:bg-[#00FF41] text-[#00FF41] hover:text-black font-mono font-bold text-sm sm:text-base tracking-wider transition-all duration-200 active:scale-95 shadow-md group"
              title="Enter Web Design by Jarvis 27 Studio"
            >
              {/* Pulsating Emerald Beacon */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] group-hover:bg-black transition"></span>
              </span>

              {/* Main Typography: Web Design by Jarvis 27 */}
              <span className="tracking-wide font-black flex items-center gap-2">
                <span>Web Design by Jarvis 27</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 group-hover:bg-black/20 border border-[#00FF41]/40 group-hover:border-black/40 text-[#00FF41] group-hover:text-black font-sans font-semibold">
                  AI AGENT
                </span>
              </span>

              <span className="text-base group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-emerald-400/80 pt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Click to watch Jarvis-27 commercial, explore services & request an instant project quote</span>
          </p>
        </div>
      </section>
    </div>
  );
};
