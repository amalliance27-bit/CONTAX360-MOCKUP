import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, ArrowRight, 
  Coffee, Bus, Award, DollarSign, 
  HeartPulse, QrCode, ChevronDown, ChevronUp, Users,
  CheckCircle2, Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoPanel } from './VideoPanel';

interface CareersRoomProps {
  onSelectRoom: (room: string) => void;
}

interface JobOpening {
  id: string;
  title: string;
  badge: string;
  badgeType: 'urgent' | 'primary' | 'success';
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  perks: string[];
  schedule: string;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'walk-in',
    title: 'Daily Walk-In Interview Experience',
    badge: 'Walk-Ins Welcome • 9AM–2PM EST',
    badgeType: 'urgent',
    location: '1 Mangrove Way, Freeport, Montego Bay',
    type: 'Full-Time (Immediate Placement)',
    salary: 'Competitive Base + Daily Incentives + Performance Bonus',
    description: 'Skip the online waiting queue. Walk directly into our flagship Freeport Montego Bay facility for on-the-spot interviews, skills assessments, and direct job offers.',
    requirements: [
      'Updated printed resume & valid photo ID (Passport, National ID, or Driver\'s License)',
      'TRN, NIS, and copies of academic qualifications / CSEC certificates',
      'Positive energy, customer empathy, and readiness for paid training'
    ],
    perks: [
      '100% Paid Comprehensive Training from Day One',
      'Daily Subsidized Lunch Allowances',
      'Free Round-Trip Shuttle Transportation across St. James',
      'Comprehensive Group Health & Life Insurance Plan',
      'Clear promotional tracks into Team Leader, QA, and WFM roles'
    ],
    schedule: 'Monday through Friday, 9:00 AM – 2:00 PM EST'
  },
  {
    id: 'chat-specialist',
    title: 'Omnichannel Chat Specialist',
    badge: 'High Demand • Multiple Openings',
    badgeType: 'primary',
    location: 'Montego Bay HQ (Freeport Campus)',
    type: 'Full-Time • Flexible Shift Rotations',
    salary: 'Above-Market Hourly + Tier-1 Chat Performance Bonus',
    description: 'Deliver real-time text-based chat support, troubleshooting, and digital customer care for premier North American eCommerce, tech, and retail brands.',
    requirements: [
      '2+ years BPO or contact center chat / email support experience',
      'Fast and accurate typing speed (45+ WPM) with pristine English grammar',
      'Ability to handle 2-3 simultaneous customer chat conversations with ease',
      'Flexibility for weekend, evening, or overnight shift rotations'
    ],
    perks: [
      'Ergonomic workstation pods in our modern air-conditioned lounge floor',
      'Daily meal stipends & complimentary premium coffee bar',
      'Safe door-to-door night shuttle service',
      'Performance-based cash incentives paid every pay cycle'
    ],
    schedule: 'Full-time schedule with flexible rotational shifts'
  },
  {
    id: 'customer-care',
    title: 'Customer Care Representative (Voice & Escalations)',
    badge: 'Immediate Placement',
    badgeType: 'success',
    location: 'Montego Bay HQ & Hybrid Options',
    type: 'Full-Time Permanent',
    salary: 'Competitive Base + Attendance & CSAT Bonuses',
    description: 'Be the friendly voice and empathetic problem solver representing world-class telecommunications, travel, and logistics enterprises.',
    requirements: [
      'Fluent verbal English communication with polite, professional telephone etiquette',
      'High emotional intelligence, active listening, and conflict de-escalation skills',
      'Minimum 3 CXC / CSEC subjects including English Language',
      'Comfortable navigating multi-screen CRM systems and ticketing software'
    ],
    perks: [
      'Full health, dental, vision, and life insurance benefits',
      'Daily hot lunch allowance at our on-site campus cafeteria',
      'Employee wellness events, team celebrations, and sports clubs',
      'Tuition support and professional customer leadership certifications'
    ],
    schedule: 'Monday to Sunday rotating shifts with dedicated rest days'
  }
];

export const CareersRoom: React.FC<CareersRoomProps> = ({ onSelectRoom }) => {
  const [expandedJob, setExpandedJob] = useState<string | null>('walk-in');

  // AI Prescreening Form State
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Chat Specialist');
  const [experience, setExperience] = useState('2+ years');
  const [hasBpo, setHasBpo] = useState(true);
  const [skills, setSkills] = useState('Fast typing, multitasking, clear English, and friendly chat support.');
  
  const [isPrescreening, setIsPrescreening] = useState(false);
  const [fastPass, setFastPass] = useState<any | null>(null);

  const handlePrescreen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;
    setIsPrescreening(true);

    try {
      const res = await fetch('/api/pandora/screen-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: candidateName,
          role: selectedRole,
          experienceYears: experience,
          shiftFlexibility: 'Full flexibility for day/night/weekends',
          bpoExperience: hasBpo,
          customerServiceSkills: skills,
          resumeSummary: `Phone: ${candidatePhone}, Email: ${candidateEmail}`
        }),
      });
      const data = await res.json();
      setFastPass(data);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setFastPass({
        score: 96,
        status: 'FAST_PASS_RECOMMENDED',
        headline: 'Fast-Pass Approved for Montego Bay Walk-In Interview!',
        feedback: "Your background is a strong fit for Contax360's high-performance culture. Come to 1 Mangrove Way to interview directly.",
        strengths: ['BPO readiness', 'Customer empathy', 'Shift flexibility'],
        recommendedInterviewSlot: 'Monday to Friday, 9:00 AM - 2:00 PM EST (1 Mangrove Way, Freeport, Montego Bay)'
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } finally {
      setIsPrescreening(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#071126] text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-b from-[#050c1c] via-[#091738] to-[#0a1c45] text-white flex items-center justify-center text-center px-4 pt-6 sm:pt-12 pb-10 sm:pb-20 overflow-hidden border-b border-blue-800/40 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(https://contax360.com/wp-content/uploads/2021/05/contax-360-palm-tree-background-3.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c1c]/90 via-[#091738]/95 to-[#0a1c45] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-cyan-400 font-bold">
            Montego Bay HQ • Walk-Ins 9AM–2PM EST
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white drop-shadow-md">
            Careers & Hiring Center
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-work max-w-2xl mx-auto leading-relaxed font-medium">
            Join Jamaica's premier owner-managed BPO family. 100% paid training, daily hot lunch stipends, free shuttle buses, and accelerated career growth.
          </p>
        </div>
      </section>

      {/* 2. DEDICATED CAREERS ROOM VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        <VideoPanel
          roomTitle="Careers & Walk-In Hiring Center"
          roomBadge="Montego Bay Hiring Explainer"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Staffvideo-Final-Avi-Convert-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/05/contax-360-palm-tree-background-3.jpg"
          pandoraExplanation="Welcome to the Contax360 Careers Room! Are you ready for your next big career move? We are actively hiring Chat Specialists and Customer Care Representatives for open walk-in interviews at 1 Mangrove Way, Freeport, Montego Bay from 9:00 AM to 2:00 PM Eastern Time!"
          chapterHighlights={[
            "Open Walk-In Interviews: Monday to Friday, 9:00 AM – 2:00 PM Eastern Time in Montego Bay HQ",
            "Chat Specialist openings for candidates with 2+ years BPO & multitasking expertise",
            "Exceptional perks: Paid training, daily lunch allowances, and free shuttle buses",
            "Comprehensive health & life insurance coverage from day one"
          ]}
          keyStats={[
            { label: "Walk-In Hours", value: "9am - 2pm EST" },
            { label: "Training", value: "100% Paid" },
            { label: "Perks", value: "Lunch & Bus" },
            { label: "Location", value: "Freeport, MoBay" }
          ]}
        />
      </section>

      {/* 3. CORE EMPLOYEE PERKS */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0e214d]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-500/40 shadow-lg flex items-center gap-3.5 hover:border-cyan-400 transition">
            <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white font-raleway">100% Paid Training</div>
              <div className="text-xs text-blue-200 font-work font-medium">Full salary during training</div>
            </div>
          </div>

          <div className="bg-[#0e214d]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-500/40 shadow-lg flex items-center gap-3.5 hover:border-cyan-400 transition">
            <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white font-raleway">Daily Lunch Stipend</div>
              <div className="text-xs text-blue-200 font-work font-medium">Fresh hot meals on campus</div>
            </div>
          </div>

          <div className="bg-[#0e214d]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-500/40 shadow-lg flex items-center gap-3.5 hover:border-cyan-400 transition">
            <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white font-raleway">Free Shuttle Buses</div>
              <div className="text-xs text-blue-200 font-work font-medium">Safe routes across St. James</div>
            </div>
          </div>

          <div className="bg-[#0e214d]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-500/40 shadow-lg flex items-center gap-3.5 hover:border-cyan-400 transition">
            <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white font-raleway">Health & Life Plan</div>
              <div className="text-xs text-blue-200 font-work font-medium">Full family health insurance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLEAN EXECUTIVE JOB CARDS (NO WRAPPING BADGES, CLEAN CONTRAST) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Section Header */}
        <div className="space-y-2 text-left border-b border-blue-800/60 pb-5">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Career Opportunities</span>
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-raleway tracking-tight">
            Discover Your Next Career at Contax360
          </h2>
          <p className="text-sm text-blue-100 font-work max-w-3xl leading-relaxed font-medium">
            Join Montego Bay's premier nearshore technology campus. Select any role below to view complete qualifications, working hours, and fast-pass interview steps.
          </p>
        </div>

        {/* Clean Job Cards */}
        <div className="space-y-6">
          {JOB_OPENINGS.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div
                key={job.id}
                className={`rounded-3xl transition-all duration-300 border overflow-hidden ${
                  isExpanded
                    ? 'bg-gradient-to-b from-[#0c1f4a] to-[#09173a] border-cyan-400/80 shadow-[0_15px_40px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40'
                    : 'bg-[#0a1838]/90 hover:bg-[#0c1f4a] border-blue-700/50 hover:border-blue-400 shadow-xl'
                }`}
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  className="p-5 sm:p-7 cursor-pointer select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Clean Single-line Badge (No Wrapping) */}
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider whitespace-nowrap ${
                          job.badgeType === 'urgent'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                            : job.badgeType === 'primary'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        }`}>
                          {job.badge}
                        </span>
                        
                        <span className="text-xs font-mono text-cyan-300/90 font-bold flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800 whitespace-nowrap">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{job.location}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white font-raleway group-hover:text-cyan-300 transition">
                        {job.title}
                      </h3>

                      <div className="text-xs sm:text-sm text-slate-200 font-work flex flex-wrap items-center gap-2 pt-0.5">
                        <span className="font-extrabold text-cyan-300">{job.type}</span>
                        <span className="text-blue-400">•</span>
                        <span className="text-blue-100 font-semibold">{job.salary}</span>
                      </div>
                    </div>

                    {/* Button: High-Contrast Royal Blue Pill Button */}
                    <div className="flex items-center gap-3 pt-1 sm:pt-0 shrink-0">
                      <button
                        type="button"
                        className={`px-5 py-2.5 rounded-xl text-xs font-black font-raleway uppercase tracking-wider transition-all flex items-center gap-2 ${
                          isExpanded
                            ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                            : 'bg-blue-600 hover:bg-cyan-400 hover:text-slate-950 text-white border border-blue-400/60 shadow-md'
                        }`}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4 stroke-[3]" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-7 sm:pb-8 pt-4 border-t border-blue-800/80 bg-[#06122c]/90 space-y-6 animate-fadeIn">
                    <p className="text-sm text-blue-100 leading-relaxed font-work font-medium">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Requirements */}
                      <div className="bg-[#091838] p-5 rounded-2xl border border-blue-700/60 space-y-3">
                        <div className="text-xs font-extrabold font-raleway text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>Candidate Requirements</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-work font-medium">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                              <span className="leading-snug">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Position Perks */}
                      <div className="bg-[#091838] p-5 rounded-2xl border border-blue-700/60 space-y-3">
                        <div className="text-xs font-extrabold font-raleway text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <span>Perks & Growth Benefits</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-work font-medium">
                          {job.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                              <span className="leading-snug">{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-blue-900/60">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Schedule: {job.schedule}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const screener = document.getElementById('fastpass-section');
                            if (screener) screener.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider font-raleway transition shadow-lg flex items-center gap-2"
                        >
                          <span>Get Walk-In Fast-Pass</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clean Return Link */}
        <div className="flex items-center justify-end pt-2 text-xs font-mono text-blue-300 font-bold">
          <button
            onClick={() => onSelectRoom('home')}
            className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition tracking-wider uppercase flex items-center gap-1.5"
          >
            <span>← Return to Main Lobby</span>
          </button>
        </div>
      </section>

      {/* 5. INTERACTIVE AI CANDIDATE PRESCREENER & FAST-PASS */}
      <section id="fastpass-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1f4a] via-[#0f2861] to-[#081738] text-white shadow-2xl border border-cyan-400/40">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-raleway tracking-tight text-white">
                Walk-In Prescreening Fast-Pass
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 font-work font-medium">
                Complete your details below with Pandora Lee to skip the wait line at 1 Mangrove Way, Freeport.
              </p>
            </div>
          </div>

          {!fastPass ? (
            <form onSubmit={handlePrescreen} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Tashana Reid"
                    className="w-full bg-[#050f24] border border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">Target Position</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-[#050f24] border border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  >
                    <option value="Chat Specialist">Chat Specialist (Multitasking)</option>
                    <option value="Customer Care Representative">Customer Care Representative</option>
                    <option value="IT Helpdesk Technician">IT Helpdesk Technician</option>
                    <option value="Accounting Clerk">Accounting Clerk</option>
                    <option value="Collections Agent">Collections Agent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    placeholder="+1 (876) 555-0199"
                    className="w-full bg-[#050f24] border border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">Total Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-[#050f24] border border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  >
                    <option value="Entry Level (0 - 1 Year)">Entry Level (0 - 1 Year)</option>
                    <option value="1 - 2 Years Customer Care">1 - 2 Years Customer Care</option>
                    <option value="2+ Years BPO Experience">2+ Years BPO Experience</option>
                    <option value="3+ Years Lead / Senior">3+ Years Lead / Senior</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="hasBpoCheck"
                  checked={hasBpo}
                  onChange={(e) => setHasBpo(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-400 bg-slate-950 border-blue-400/50 cursor-pointer"
                />
                <label htmlFor="hasBpoCheck" className="text-xs text-blue-200 cursor-pointer font-medium">
                  I have prior BPO / Contact Center experience in Jamaica
                </label>
              </div>

              <button
                type="submit"
                disabled={isPrescreening || !candidateName.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 transition active:scale-95"
              >
                {isPrescreening ? 'Generating Fast-Pass with Pandora Lee...' : 'Generate My Walk-In Fast-Pass'}
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-[#050f24] border border-cyan-400/40 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-extrabold tracking-widest">
                    CONTAX360 WALK-IN FAST-PASS
                  </div>
                  <h4 className="text-xl font-black text-white mt-1">{candidateName}</h4>
                  <div className="text-xs text-cyan-300 font-bold">{selectedRole}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400">{fastPass.score}%</div>
                  <div className="text-[9px] uppercase text-blue-300 font-mono font-bold">Match Score</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/40 text-xs text-blue-100 font-medium">
                <span className="text-cyan-300 font-extrabold">Pandora Lee: </span>
                {fastPass.feedback}
              </div>

              <div className="flex items-center justify-between text-xs text-blue-200 pt-2 border-t border-blue-900/80 font-mono">
                <div>Slot: {fastPass.recommendedInterviewSlot}</div>
                <QrCode className="w-6 h-6 text-cyan-400" />
              </div>

              <button
                onClick={() => setFastPass(null)}
                className="w-full py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-cyan-300 text-xs font-bold border border-blue-700/60 transition"
              >
                Prescreen Another Candidate
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
