import React from 'react';
import { 
  Award, ShieldCheck, HeartHandshake, CheckCircle2, 
  Linkedin, Quote, Sparkles, Building, Users
} from 'lucide-react';

const LEADERSHIP_TEAM = [
  {
    name: 'Jacqueline Sutherland',
    role: 'Founder & CEO',
    bio: 'After a successful Engineering and I.T. consulting career, Jackie founded Contax360 in 2007 to build an agile, customer-focused BPO embracing technology, teamwork, and empowerment for women and minority leaders.',
    tag: 'Founder & Visionary'
  },
  {
    name: 'Ashley Martin',
    role: 'Project Director',
    bio: 'Leads high-impact enterprise onboarding, omnichannel migrations, and complex customer journey transformations across global client accounts.',
    tag: 'Client Solutions'
  },
  {
    name: 'Talia Cooke-Johnson',
    role: 'Human Resources Manager',
    bio: 'Oversees talent acquisition, paid training programs, walk-in recruitment in Montego Bay, and staff welfare initiatives across our Jamaican facilities.',
    tag: 'People & Culture'
  },
  {
    name: 'Mario Ellington',
    role: 'Director of Operations',
    bio: 'Drives operational excellence, workforce management, multi-tiered SLA performance, and day-to-day contact center execution.',
    tag: 'Operations Leader'
  },
  {
    name: 'Caray McKenzie',
    role: 'Director of Information Technology',
    bio: 'Architects Contax360’s high-availability telecom switches, cloud VDI infrastructure, zero-trust network defense, and 24/7 MSSP security.',
    tag: 'Technology & Security'
  }
];

const CERTIFICATIONS = [
  {
    title: 'NMSDC MBE Certified',
    desc: 'National Minority Supplier Development Council Minority Business Enterprise certification.',
    badge: 'Minority Owned'
  },
  {
    title: 'WBENC Women-Owned',
    desc: 'Women’s Business Enterprise National Council certification for women-owned businesses.',
    badge: 'Woman Owned'
  },
  {
    title: 'HIPAA & HITECH Compliant',
    desc: 'Strict healthcare information privacy, secure patient intake, and medical records protection.',
    badge: 'Healthcare Grade'
  },
  {
    title: 'PCI DSS Certified',
    desc: 'Payment Card Industry Data Security Standard Level 1 compliant infrastructure for secure billing.',
    badge: 'FinTech Secure'
  }
];

export const AboutCompany: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
          <Building className="w-3.5 h-3.5" /> About Contax360 BPO Solutions
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          Pioneering Innovation Since 2007
        </h2>
        <p className="mt-4 text-slate-300 font-work text-base sm:text-lg">
          Privately owned and managed, Contax360 is recognized globally as a premier woman and minority-owned business process outsourcing leader.
        </p>
      </div>

      {/* Founder's Story Spotlight */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 p-8 sm:p-12 shadow-2xl mb-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Founded in 2007 by Jacqueline Sutherland
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-raleway leading-tight">
              A Vision of Agility, Excellence, and Opportunity
            </h3>

            <div className="space-y-3.5 text-slate-300 font-work text-sm sm:text-base leading-relaxed">
              <p>
                After a successful Engineering and I.T. consulting career, Jacqueline decided to apply her technical and business background to starting a BPO company. BPOs are historically a business area where few women and even fewer women of color have been involved as founders and owners.
              </p>
              <p>
                Never one to shy from a challenge, Jackie was determined to build a BPO that was different: agile, responsive, customer-focused, that embraces cutting-edge technology and teamwork.
              </p>
              <p>
                The result has been happy customers, remarkable growth, and global recognition as a woman and minority-owned BPO with facilities in Montego Bay, Kingston, and Florida.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="text-2xl font-extrabold text-white font-raleway">17+ Years</div>
                <div className="text-xs text-slate-400">Industry Track Record</div>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div>
                <div className="text-2xl font-extrabold text-blue-400 font-raleway">2 Nearshore Hubs</div>
                <div className="text-xs text-slate-400">Montego Bay HQ & Kingston</div>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div>
                <div className="text-2xl font-extrabold text-purple-400 font-raleway">US Onshore</div>
                <div className="text-xs text-slate-400">Plantation, Florida</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-2xl bg-slate-950 p-6 border border-slate-800 shadow-2xl relative">
              <Quote className="w-10 h-10 text-blue-500/20 absolute top-4 right-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400/40 shadow-lg bg-slate-900 shrink-0">
                  <img
                    src="/team/jacqueline_sutherland.jpg"
                    alt="Jacqueline Sutherland"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/contax360-jackie%20Sutheland.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Jacqueline Sutherland</h4>
                  <p className="text-xs text-blue-400 font-semibold">Founder & CEO</p>
                  <p className="text-[11px] text-slate-400 font-mono">Contax360 BPO Solutions</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Our mission is to combine the warm, natural hospitality of Jamaica with rock-solid technology and engineering precision to create transformative value for our clients."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Showcase */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-6 text-center font-raleway">
          Industry Accreditations & Diversity Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {cert.badge}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-base font-raleway">{cert.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cert.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully Certified
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Leadership Team */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-8 text-center font-raleway">
          Meet Our Executive Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_TEAM.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {member.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white font-raleway">{member.name}</h4>
                <p className="text-xs text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-work">{member.bio}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Contax360 Leadership</span>
                <Linkedin className="w-4 h-4 text-blue-400 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
