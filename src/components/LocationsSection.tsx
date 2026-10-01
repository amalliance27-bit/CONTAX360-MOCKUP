import React, { useState } from 'react';
import { 
  MapPin, Globe, Building2, CheckCircle2, 
  Plane, Clock, ShieldCheck, Phone, ArrowRight, ExternalLink
} from 'lucide-react';

export const LocationsSection: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'jamaica' | 'florida' | 'virtual'>('jamaica');

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
          <Globe className="w-3.5 h-3.5" /> Strategic Nearshore & Onshore Hubs
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          Where Global Reach Meets Nearshore Proximity
        </h2>
        <p className="mt-4 text-slate-300 font-work text-base sm:text-lg">
          With modern physical campuses across Jamaica and Florida plus a hardened virtual cloud network, Contax360 delivers seamless operational redundancy.
        </p>
      </div>

      {/* 3 Main Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* 1. Jamaica Nearshore */}
        <div 
          onClick={() => setActiveTab('jamaica')}
          className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
            activeTab === 'jamaica'
              ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/20 ring-1 ring-blue-500'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Nearshore HQ
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-raleway">Nearshore - Jamaica</h3>
            <p className="text-xs text-blue-400 font-medium mt-1">Montego Bay HQ & Kingston Facilities</p>
            <p className="text-xs text-slate-300 font-work leading-relaxed mt-3">
              With 2 locations in Jamaica, we provide high-value services with a native English-speaking workforce aligned with US Eastern time zones.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>1 Mangrove Way, Freeport, Montego Bay</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>US Timezone Alignment (EST / CST)</span>
            </div>
          </div>
        </div>

        {/* 2. Florida Onshore */}
        <div 
          onClick={() => setActiveTab('florida')}
          className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
            activeTab === 'florida'
              ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/20 ring-1 ring-blue-500'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                US Onshore
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-raleway">Onshore - Florida</h3>
            <p className="text-xs text-purple-400 font-medium mt-1">Plantation, Florida Headquarters</p>
            <p className="text-xs text-slate-300 font-work leading-relaxed mt-3">
              U.S. based resources provide a full spectrum of services from our Florida facility, Virtual, or co-located directly in your corporate facility.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Plantation, Florida, USA</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Executive Client Services & Compliance</span>
            </div>
          </div>
        </div>

        {/* 3. Virtual Worldwide */}
        <div 
          onClick={() => setActiveTab('virtual')}
          className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
            activeTab === 'virtual'
              ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/20 ring-1 ring-blue-500'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Global Virtual
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-raleway">Virtual - Worldwide</h3>
            <p className="text-xs text-emerald-400 font-medium mt-1">Secure Work-From-Home (WFH) Cloud</p>
            <p className="text-xs text-slate-300 font-work leading-relaxed mt-3">
              Our advanced WFH infrastructure allows for virtual agents to be deployed from almost any location globally with zero downtime and strict security.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero-Trust Endpoint Security & VDI</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Multi-Region Failover Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Nearshore Jamaica vs Offshore vs US Onshore */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-raleway">Why Nearshore Jamaica Outperforms</h3>
            <p className="text-xs text-slate-400">Head-to-head comparison between global outsourcing hubs</p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
          >
            Request Pilot Proposal
          </button>
        </div>

        <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] font-semibold">
              <th className="py-3 px-4">Evaluation Criteria</th>
              <th className="py-3 px-4 text-blue-400 font-bold bg-blue-950/30 rounded-t-xl">Contax360 (Jamaica)</th>
              <th className="py-3 px-4">Offshore (Asia)</th>
              <th className="py-3 px-4">US Domestic Onshore</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-work">
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Timezone Compatibility</td>
              <td className="py-3.5 px-4 text-emerald-400 font-bold bg-blue-950/20">100% US EST/CST Alignment</td>
              <td className="py-3.5 px-4 text-slate-400">12 - 14hr Discrepancy</td>
              <td className="py-3.5 px-4 text-slate-300">100% Aligned</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">English Accent & Cultural Affinity</td>
              <td className="py-3.5 px-4 text-emerald-400 font-bold bg-blue-950/20">Native English, High Empathy</td>
              <td className="py-3.5 px-4 text-slate-400">Moderate Accent / Idiom Gap</td>
              <td className="py-3.5 px-4 text-slate-300">Native</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Total Cost of Operation</td>
              <td className="py-3.5 px-4 text-emerald-400 font-bold bg-blue-950/20">50% - 60% Lower than US</td>
              <td className="py-3.5 px-4 text-slate-300">60% - 70% Lower</td>
              <td className="py-3.5 px-4 text-rose-400">Premium ($35 - $50+/hr)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Travel Time for Site Visits</td>
              <td className="py-3.5 px-4 text-emerald-400 font-bold bg-blue-950/20">1.5 hrs from Miami / 3.5 hrs NYC</td>
              <td className="py-3.5 px-4 text-slate-400">20+ Hours Flight Time</td>
              <td className="py-3.5 px-4 text-slate-300">2 - 5 Hours</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Attrition & Retention Rate</td>
              <td className="py-3.5 px-4 text-emerald-400 font-bold bg-blue-950/20">Low Attrition (Perks & Culture)</td>
              <td className="py-3.5 px-4 text-rose-400">High Industry Turnover (35-50%)</td>
              <td className="py-3.5 px-4 text-slate-400">Moderate Turnover</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
