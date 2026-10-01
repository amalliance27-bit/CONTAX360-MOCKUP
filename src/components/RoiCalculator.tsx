import React, { useState } from 'react';
import { 
  Calculator, DollarSign, TrendingUp, Users, 
  Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles
} from 'lucide-react';

export const RoiCalculator: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  const [agentCount, setAgentCount] = useState(15);
  const [hoursPerDay, setHoursPerDay] = useState(16); // 8, 16, 24
  const [usHourlyRate, setUsHourlyRate] = useState(34);
  const [nearshoreHourlyRate, setNearshoreHourlyRate] = useState(15);

  // Calculations
  const workingDaysPerYear = 260;
  const hoursPerYear = agentCount * (hoursPerDay === 24 ? 365 * 24 : workingDaysPerYear * hoursPerDay);
  
  const annualUsCost = hoursPerYear * usHourlyRate;
  const annualNearshoreCost = hoursPerYear * nearshoreHourlyRate;
  const annualSavings = annualUsCost - annualNearshoreCost;
  const savingsPercent = Math.round((annualSavings / annualUsCost) * 100);

  return (
    <section id="roi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" /> Nearshore Financial Modeling
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          Nearshore Jamaica Savings Calculator
        </h2>
        <p className="mt-4 text-slate-300 font-work text-base sm:text-lg">
          Estimate your annual operational cost savings by transitioning from US domestic call centers to Contax360 Montego Bay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Sliders and Controls (Left) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" /> Number of Dedicated Agents
              </label>
              <span className="text-lg font-bold text-blue-400 font-mono">{agentCount} Full-Time Agents</span>
            </div>
            <input
              type="range"
              min="3"
              max="150"
              step="1"
              value={agentCount}
              onChange={(e) => setAgentCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>3 Pod</span>
              <span>25 Mid-scale</span>
              <span>75 Growth</span>
              <span>150+ Enterprise</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Coverage Hours
              </label>
              <span className="text-sm font-semibold text-purple-300">
                {hoursPerDay === 8 ? '8 Hours / 5 Days (Business)' : hoursPerDay === 16 ? '16 Hours / 7 Days (Extended)' : '24/7/365 Continuous'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[8, 16, 24].map((hrs) => (
                <button
                  key={hrs}
                  onClick={() => setHoursPerDay(hrs)}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition ${
                    hoursPerDay === hrs
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {hrs === 8 ? '8h Standard' : hrs === 16 ? '16h Extended' : '24x7 365'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                US Onshore Cost ($/hour benchmark)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                <input
                  type="number"
                  value={usHourlyRate}
                  onChange={(e) => setUsHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Contax360 Nearshore ($/hour target)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                <input
                  type="number"
                  value={nearshoreHourlyRate}
                  onChange={(e) => setNearshoreHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-xs text-emerald-400 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Financial Card (Right) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-blue-950/60 p-6 sm:p-8 rounded-2xl border border-blue-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Projected Annual Savings
            </div>

            <div className="mt-3 text-4xl sm:text-5xl font-black text-white font-raleway">
              ${(annualSavings / 1000).toFixed(0)}k
              <span className="text-sm font-normal text-slate-400 block mt-1">
                / year estimated net savings ({savingsPercent}% reduction)
              </span>
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>US Domestic Onshore Cost:</span>
                <span className="font-semibold text-rose-400 line-through">
                  ${(annualUsCost / 1000).toFixed(0)}k/yr
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Contax360 Nearshore Cost:</span>
                <span className="font-bold text-emerald-400">
                  ${(annualNearshoreCost / 1000).toFixed(0)}k/yr
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Annual Operating Hours:</span>
                <span className="font-mono text-blue-300">
                  {hoursPerYear.toLocaleString()} hrs
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <button
              onClick={onOpenContact}
              className="w-full py-3.5 px-4 rounded-xl contax-gradient text-white font-bold text-xs sm:text-sm shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <span>Lock In Nearshore Pilot Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
