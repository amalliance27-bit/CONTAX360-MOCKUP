import React from 'react';
import { 
  Zap, Cpu, ShieldCheck, Headphones, Settings2, Sparkles, 
  Globe, MessageSquare, Award, Users, DollarSign, Building
} from 'lucide-react';
import { motion } from 'framer-motion';

const bentoFeatures = [
  {
    title: 'Nearshore Jamaica Speed',
    icon: Zap,
    category: 'Rapid Ramp-Up',
    description: 'Deploy dedicated customer care and chat specialist pods in as fast as 14 business days with US Eastern time zone synchronization.',
    className: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900',
    highlight: '50-60% Savings vs US',
  },
  {
    title: '24/7 Chat & Multitasking',
    icon: MessageSquare,
    category: 'Omni-Channel',
    description: 'Specialists trained to handle 3+ concurrent customer threads across SMS, web chat, and social messaging.',
    className: 'md:col-span-1 md:row-span-1 bg-slate-900/80',
    highlight: '<30s Response Time',
  },
  {
    title: 'HIPAA & PCI DSS Compliant',
    icon: ShieldCheck,
    category: 'Enterprise Security',
    description: 'Regulated clean rooms, biometric access, zero-trust network defenses, and strict SOC 2 aligned governance.',
    className: 'md:col-span-1 md:row-span-1 bg-slate-900/80',
    highlight: 'Level 1 Certified',
  },
  {
    title: 'Woman & Minority Owned',
    icon: Award,
    category: 'Supplier Diversity',
    description: 'WBENC and NMSDC MBE certified. Strengthen your corporate diversity supply chain with exceptional operational ROI.',
    className: 'md:col-span-1 md:row-span-1 bg-slate-900/80',
    highlight: 'WBENC & NMSDC',
  },
  {
    title: 'People-First Culture',
    icon: Users,
    category: 'High Retention',
    description: 'Paid training, daily lunch allowances, company shuttle buses, and full health insurance drive industry-leading staff loyalty.',
    className: 'md:col-span-2 md:row-span-1 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900',
    highlight: 'Montego Bay & Kingston',
  },
  {
    title: 'AI-Augmented QA & Pandora Lee Host',
    icon: Sparkles,
    category: 'Innovation Matrix',
    description: 'Real-time agent assistance, automated ticket sentiment analysis, and continuous performance coaching with Pandora Lee.',
    className: 'md:col-span-3 md:row-span-1 bg-gradient-to-r from-blue-950/50 via-indigo-950/50 to-purple-950/50',
    highlight: '99.4% CSAT Benchmark',
  },
];

export const BentoFeatures: React.FC<{
  onOpenInfomercial: () => void;
}> = ({ onOpenInfomercial }) => {
  return (
    <section className="py-24 md:py-32 w-full relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" /> Innovation & Nearshore Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-raleway">
            Engineered for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Unrivaled Performance
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-base md:text-lg font-work leading-relaxed max-w-2xl">
            A battle-tested foundation for fast, scalable, and high-CSAT customer interactions across voice, chat, back-office, and cybersecurity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(220px,auto)]">
          {bentoFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`rounded-3xl p-8 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between shadow-xl ${item.className}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 text-blue-400 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-blue-300 border border-slate-700">
                    {item.highlight}
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 font-raleway group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-work leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
