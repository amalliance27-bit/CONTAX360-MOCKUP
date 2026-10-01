import React from 'react';
import { 
  Star, Quote, MapPin, Building2, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  type: 'customer' | 'worker';
  name: string;
  role: string;
  companyOrDept: string;
  location: string;
  rating: number;
  quote: string;
  tag: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'c1',
    type: 'customer',
    name: 'David Vance',
    role: 'VP of Customer Operations',
    companyOrDept: 'FinTech ScaleUp Corp',
    location: 'Miami, Florida',
    rating: 5,
    quote: 'Partnering with Contax360’s Montego Bay nearshore center cut our support response times by 48% while maintaining a 99.2% CSAT benchmark. The English fluency and cultural alignment are extraordinary.',
    tag: 'Enterprise Client'
  },
  {
    id: 'w1',
    type: 'worker',
    name: 'Shantel Campbell',
    role: 'Senior CX & Inbound Specialist',
    companyOrDept: 'Customer Care Division',
    location: 'Montego Bay, Jamaica (Freeport)',
    rating: 5,
    quote: 'Working at Contax360 has given me world-class training in healthcare and fintech workflows. Our team spirit and commitment to empathy in every customer interaction is what sets us apart.',
    tag: 'Team Member'
  },
  {
    id: 'c2',
    type: 'customer',
    name: 'Elena Rostova',
    role: 'Director of Patient Experience',
    companyOrDept: 'HealthCare Direct Network',
    location: 'Atlanta, Georgia',
    rating: 5,
    quote: 'Their HIPAA-certified nearshore team handled our medical intake overflow flawlessly during our highest enrollment quarter. Contax360 feels like a direct, accountable extension of our US office.',
    tag: 'Healthcare Partner'
  },
  {
    id: 'w2',
    type: 'worker',
    name: 'Romaine Beckford',
    role: 'Quality Assurance & Tier-2 Lead',
    companyOrDept: 'Technical Support Hub',
    location: 'Kingston, Jamaica',
    rating: 5,
    quote: 'The professional growth culture at Contax360 is unmatched. We manage complex tier-2 enterprise tickets with fast turnaround times and genuine passion for client success.',
    tag: 'Team Member'
  },
  {
    id: 'c3',
    type: 'customer',
    name: 'Marcus Sterling',
    role: 'Head of Global Merchant Services',
    companyOrDept: 'OmniCommerce Retail Group',
    location: 'New York, NY',
    rating: 5,
    quote: 'We achieved 55% operational cost reduction without sacrificing quality. Operating on EST time zone means our morning standups happen synchronously with zero lag or timezone friction.',
    tag: 'Retail CX Client'
  },
  {
    id: 'w3',
    type: 'worker',
    name: 'Alicia Morrison',
    role: 'Operations Team Manager',
    companyOrDept: 'Freeport Operations Campus',
    location: 'Montego Bay, Jamaica',
    rating: 5,
    quote: 'Over 6 years at Contax360, I have seen our agents consistently beat onshore SLA metrics. The owner-managed leadership provides real support and modern facility amenities.',
    tag: 'Operations Leadership'
  },
  {
    id: 'c4',
    type: 'customer',
    name: 'Sarah Jenkins',
    role: 'Director of Logistics CX',
    companyOrDept: 'TransGlobal Supply Chain',
    location: 'Austin, Texas',
    rating: 5,
    quote: 'Contax360 delivers true 24/7 omnichannel responsiveness across phone, chat, and email. Jackie Sutherland and her management team are always accessible and proactive.',
    tag: 'Logistics Client'
  },
  {
    id: 'w4',
    type: 'worker',
    name: 'Derrick Williams',
    role: 'Onshore Client Success Manager',
    companyOrDept: 'US Enterprise Accounts',
    location: 'Plantation / Miami, FL',
    rating: 5,
    quote: 'Bridging US corporate clients with our nearshore Jamaican contact center is a seamless experience. Our clients love the warm Caribbean hospitality paired with rigorous SLAs.',
    tag: 'US Onshore Team'
  }
];

export const TestimonialsSection: React.FC<{ onSelectRoom?: (room: string) => void }> = ({ onSelectRoom }) => {
  // Duplicated list for seamless infinite slow glide
  const displayItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-[#080e1e] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Glass Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800/60">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Verified Client & Team Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-raleway text-white tracking-tight">
              Client & Operational Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-work max-w-2xl">
              Authentic feedback from enterprise executives across North America and our 24/7 Jamaican & Florida operations teams.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time CSAT: 99.2%</span>
            </div>
          </div>
        </div>

        {/* ULTRA-SLOW, GLASS GLIDE TESTIMONIALS (110s smooth linear scroll, no corny icon badges) */}
        <div className="relative overflow-hidden w-full py-4 -mx-4 sm:mx-0 px-4 sm:px-0 pointer-events-none select-none">
          <div 
            className="flex items-stretch gap-6 overflow-hidden py-2 animate-marquee-super-slow"
            style={{ 
              width: 'max-content',
              animationDuration: '110s' // Super slow, calm, glass glide
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[320px] sm:w-[400px] flex-shrink-0 bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-7 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-700"
              >
                {/* Card Top: Rating Stars + Tag */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`px-3 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider border ${
                    item.type === 'customer'
                      ? 'bg-blue-500/10 text-cyan-300 border-blue-400/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6 flex-1">
                  <Quote className="w-7 h-7 text-cyan-500/20 absolute -top-3 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-slate-200 font-work leading-relaxed pl-4 font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Card Bottom: Clean, Prestigious Typographic Identity (NO corny icons) */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-white font-raleway truncate tracking-wide">
                        {item.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    </div>
                    <p className="text-[11.5px] text-cyan-300/90 font-work font-medium truncate mt-0.5">
                      {item.role} • {item.companyOrDept}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Glass Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-slate-400 border-t border-slate-800/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited SLAs & 100% Verified Nearshore Staff Satisfaction</span>
          </div>
          {onSelectRoom && (
            <button
              onClick={() => onSelectRoom('contact')}
              className="text-cyan-400 hover:text-cyan-300 font-bold transition pointer-events-auto flex items-center gap-1 group"
            >
              <span>Explore Custom Nearshore SLA Proposals</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
