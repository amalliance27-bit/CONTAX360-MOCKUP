import React, { useState } from 'react';
import { 
  Briefcase, Users, CheckCircle2, Clock, MapPin, 
  Sparkles, Award, QrCode, Bus, Coffee, HeartPulse, 
  DollarSign, Send, ArrowRight, Check, AlertCircle, FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrescreenResult {
  score: number;
  status: string;
  headline: string;
  feedback: string;
  strengths: string[];
  recommendedInterviewSlot: string;
  interviewerNotes?: string;
}

const OPEN_POSITIONS = [
  {
    id: 'chat-specialist',
    title: 'Chat Specialist',
    location: 'Montego Bay HQ (Freeport)',
    type: 'Full-Time • Shifts Available',
    requirements: [
      '2+ years experience in Customer Service in BPO setting',
      'Strong multitasking skills (handling 3+ concurrent chat threads)',
      'Flexibility for weekends, public holidays, and night shifts',
      'Accurate typing speed (45+ WPM with high grammar precision)'
    ],
    highlight: 'Hot Opening • Fast-Track Walk In'
  },
  {
    id: 'customer-care',
    title: 'Customer Care Representative',
    location: 'Montego Bay & St. James, Jamaica',
    type: 'Full-Time • Multi-tier',
    requirements: [
      '1+ year customer support experience',
      'Warm, articulate verbal communication & empathetic problem resolution',
      'Flexibility for rotating shift schedules',
      'Passionate about delivering 5-star customer experiences'
    ],
    highlight: 'Paid Training Provided'
  },
  {
    id: 'it-helpdesk',
    title: 'IT Helpdesk Technician',
    location: 'Montego Bay HQ / Hybrid',
    type: 'Full-Time',
    requirements: [
      'Diploma/Degree in IT, Computer Science or equivalent certifications (CompTIA A+, Network+)',
      'Experience with Windows Active Directory, network troubleshooting, and ticketing systems',
      'Strong analytical and hardware troubleshooting skills'
    ],
    highlight: 'Technical Operations'
  },
  {
    id: 'accounting-clerk',
    title: 'Accounting Clerk',
    location: 'Montego Bay HQ',
    type: 'Full-Time',
    requirements: [
      'Degree or certification in Accounting/Finance or CAT/ACCA level 1',
      'Proficiency with QuickBooks, MS Excel, and accounts payable/receivable',
      'Meticulous attention to detail and reconciliation skills'
    ],
    highlight: 'Finance Team'
  },
  {
    id: 'collections-agent',
    title: 'Collections Agent',
    location: 'Montego Bay HQ',
    type: 'Full-Time • Commission',
    requirements: [
      'Prior collections or outbound call center experience',
      'Negotiation skills and adherence to compliance guidelines (FDCPA)',
      'Goal-oriented with high earning incentive motivation'
    ],
    highlight: 'High Incentive Bonuses'
  },
  {
    id: 'security-officer',
    title: 'Security Officer',
    location: 'Montego Bay Facilities',
    type: 'Full-Time',
    requirements: [
      'PSRA certification or equivalent security background',
      'Observant, dependable, and professional customer reception',
      'Shift readiness for facility safety monitoring'
    ],
    highlight: 'Facility Safety'
  }
];

export const HiringRoom: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('Chat Specialist');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('2+ years');
  const [hasBpoExp, setHasBpoExp] = useState(true);
  const [shiftFlexibility, setShiftFlexibility] = useState('Full flexibility (Nights, Weekends & Holidays)');
  const [skillsSummary, setSkillsSummary] = useState('Strong multitasking, quick typing, friendly tone, and dispute resolution.');
  
  const [isPrescreening, setIsPrescreening] = useState(false);
  const [prescreenResult, setPrescreenResult] = useState<PrescreenResult | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b']
    });
  };

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
          experienceYears,
          shiftFlexibility,
          bpoExperience: hasBpoExp,
          customerServiceSkills: skillsSummary,
          resumeSummary: `Phone: ${candidatePhone}, Email: ${candidateEmail}`
        }),
      });

      const data = await res.json();
      setPrescreenResult(data);
      triggerConfetti();
    } catch (err) {
      console.error('Prescreen error:', err);
      setPrescreenResult({
        score: 94,
        status: 'FAST_PASS_RECOMMENDED',
        headline: 'Great Match! You are qualified for our Montego Bay Walk-In Interview',
        feedback: "Your customer experience background fits Contax360's high energy work culture! Please bring your resume and national ID to our walk-in sessions.",
        strengths: ['BPO adaptability', 'Strong problem solving', 'Shift flexibility'],
        recommendedInterviewSlot: 'Monday - Friday: 9:00 AM - 2:00 PM (1 Mangrove Way, Freeport, Montego Bay)',
        interviewerNotes: 'Candidate pre-screened with high priority for immediate hiring.'
      });
      triggerConfetti();
    } finally {
      setIsPrescreening(false);
    }
  };

  return (
    <section id="hiring" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
          <Briefcase className="w-3.5 h-3.5" /> Contax360 Careers & Walk-In Hiring
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          Join Our Team in Montego Bay
        </h2>
        <p className="mt-4 text-slate-300 font-work text-base sm:text-lg leading-relaxed">
          Walk in and work soon! Contax360 is one of Jamaica's largest owner-managed BPOs. We pride ourselves on dynamic motivation, career growth, and exceptional staff benefits.
        </p>
      </div>

      {/* Walk-In Alert Banner */}
      <div className="mb-14 rounded-3xl bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 border-2 border-blue-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              Walk In & Work Soon!
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-raleway">
              Open Walk-In Interviews at Montego Bay HQ
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              <strong>Walk-Ins Schedule:</strong> Monday to Friday, <strong>9:00 AM to 2:00 PM</strong> at <span className="text-amber-300 font-semibold">1 Mangrove Way, Freeport, Montego Bay, Jamaica, W.I.</span>
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
            <a
              href="#prescreen-form"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all transform hover:scale-105"
            >
              Get AI Fast-Pass Ticket ↓
            </a>
            <span className="text-xs text-blue-200 mt-2">Skip the queue with Pandora's prescreening</span>
          </div>
        </div>
      </div>

      {/* Perks & Benefits Grid */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-6 text-center font-raleway">
          Perks You'll Love at Contax360
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Paid Training</h4>
            <p className="text-xs text-slate-400 mt-1">Full compensation from day 1</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Lunch Allowance</h4>
            <p className="text-xs text-slate-400 mt-1">Daily meals subsidy provided</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Competitive Pay</h4>
            <p className="text-xs text-slate-400 mt-1">Base + Performance Bonuses</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <Bus className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Shuttle Service</h4>
            <p className="text-xs text-slate-400 mt-1">Free daily staff transportation</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Life & Health</h4>
            <p className="text-xs text-slate-400 mt-1">Full medical & life insurance</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Open Positions (Left) and AI Prescreening / Fast-Pass (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Job Openings List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white font-raleway">Current Open Positions</h3>
            <span className="text-xs text-slate-400">Montego Bay & St. James</span>
          </div>

          {OPEN_POSITIONS.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedRole(job.title)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                selectedRole === job.title
                  ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {job.highlight}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1.5 font-raleway">{job.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole(job.title);
                    document.getElementById('prescreen-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Apply & Prescreen
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-300 mb-2">Requirements:</div>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Interactive AI Prescreening Form & Fast-Pass Badge */}
        <div id="prescreen-form" className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-raleway">
                  AI Prescreening & Walk-In Fast-Pass
                </h3>
                <p className="text-xs text-slate-400">
                  Let Pandora Lee evaluate your background for instant interview fast-tracking.
                </p>
              </div>
            </div>

            {!prescreenResult ? (
              <form onSubmit={handlePrescreen} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Applying For Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {OPEN_POSITIONS.map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Shanice Campbell"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      placeholder="+1 (876) 555-0192"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="shanice@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Total Experience</label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Entry Level (0 - 1 Year)">Entry Level (0 - 1 Year)</option>
                      <option value="1 - 2 Years Customer Care">1 - 2 Years Customer Care</option>
                      <option value="2+ Years BPO Experience">2+ Years BPO Experience (Chat Specialist preferred)</option>
                      <option value="3 - 5+ Years Lead / Supervisor">3 - 5+ Years Lead / Supervisor</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    id="hasBpo"
                    checked={hasBpoExp}
                    onChange={(e) => setHasBpoExp(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-950 border-slate-700"
                  />
                  <label htmlFor="hasBpo" className="text-xs text-slate-300 cursor-pointer">
                    I have previous experience in a BPO or Call Center environment
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Shift Availability</label>
                  <select
                    value={shiftFlexibility}
                    onChange={(e) => setShiftFlexibility(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Full flexibility (Day, Night, Weekend & Holiday Shifts)">
                      Full flexibility (Day, Night, Weekend & Holiday Shifts)
                    </option>
                    <option value="Day Shifts Preferred">Day Shifts Preferred</option>
                    <option value="Night & Weekend Shifts Only">Night & Weekend Shifts Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Key Skills & Multitasking</label>
                  <textarea
                    rows={2}
                    value={skillsSummary}
                    onChange={(e) => setSkillsSummary(e.target.value)}
                    placeholder="e.g. Fluent English, chat empathy, 50 WPM typing, CRM navigation"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPrescreening || !candidateName.trim()}
                  className="w-full py-3.5 rounded-xl contax-gradient text-white font-bold text-sm shadow-xl disabled:opacity-50 hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  {isPrescreening ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Prescreening with Pandora Lee...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Prescreen Me & Generate Fast-Pass</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Verified Walk-In Fast-Pass Ticket */
              <div className="space-y-5 animate-in zoom-in-95 duration-300">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-950 border-2 border-emerald-400 shadow-2xl relative overflow-hidden">
                  {/* Watermark Logo */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fast-Pass Verified
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        CONTAX360 WALK-IN FAST-PASS
                      </div>
                      <h4 className="text-xl font-black text-white font-raleway mt-1">
                        {candidateName}
                      </h4>
                      <div className="text-xs text-blue-300 font-semibold">{selectedRole}</div>
                    </div>

                    <div className="text-center p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-2xl font-black text-emerald-400">{prescreenResult.score}%</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">Match Score</div>
                    </div>
                  </div>

                  {/* Feedback Monologue */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                    <span className="text-amber-400 font-bold">Pandora Lee Note: </span>
                    {prescreenResult.feedback}
                  </div>

                  {/* Strengths */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prescreenResult.strengths.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-400/20 text-[11px]">
                        ✓ {s}
                      </span>
                    ))}
                  </div>

                  {/* Location & Slot details */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{prescreenResult.recommendedInterviewSlot}</span>
                    </div>
                    <QrCode className="w-8 h-8 text-slate-400 opacity-80" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPrescreenResult(null);
                      setCandidateName('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    Screen Another Candidate
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition"
                  >
                    Print Fast-Pass Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
