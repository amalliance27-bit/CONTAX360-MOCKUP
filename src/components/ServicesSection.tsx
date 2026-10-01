import React, { useState } from 'react';
import { 
  Headphones, FileText, Monitor, Calculator, 
  Stethoscope, ShieldAlert, CheckCircle2, ArrowRight, 
  MessageSquare, Sparkles, Layers, ShieldCheck
} from 'lucide-react';

const SERVICES = [
  {
    id: 'customer-interaction',
    icon: Headphones,
    color: 'from-blue-500 to-cyan-500',
    title: 'Customer Interaction',
    category: 'Omni-Channel Contact Center',
    shortDesc: 'We provide a full range of Omni-Channel services from traditional phone and email to fully integrated chat and social media.',
    detailedPoints: [
      'Inbound & Outbound Voice Support (US Native English fluency)',
      '24/7/365 Live Chat & SMS text messaging resolution',
      'Social Media moderation & multi-channel brand care',
      'VIP Escalation management & customer retention workflows',
      'Custom CRM integration (Zendesk, Salesforce, Freshdesk, HubSpot)'
    ],
    sla: '99.4% CSAT • Sub-30s Response Time'
  },
  {
    id: 'back-office',
    icon: FileText,
    color: 'from-purple-500 to-indigo-500',
    title: 'Back-office Transactions',
    category: 'Data & Transaction Operations',
    shortDesc: 'We help organizations increase customer satisfaction with services ranging from data entry to complex transactions requiring compliance and validation.',
    detailedPoints: [
      'High-throughput data extraction & document indexing',
      'Order fulfillment, claims verification & invoice matching',
      'KYC (Know Your Customer) and credential validation',
      'Subscription lifecycle management & chargeback prevention',
      'Strict quality assurance with dual-tier auditing'
    ],
    sla: '99.9% Accuracy Guarantee'
  },
  {
    id: 'it-software',
    icon: Monitor,
    color: 'from-sky-500 to-blue-600',
    title: 'IT & Software Operations',
    category: 'Technical Helpdesk & DevOps',
    shortDesc: 'Our technical expertise allows us to provide multi-tiered support for customers or employees with certified technical specialists.',
    detailedPoints: [
      'Tier 1, Tier 2, and Tier 3 technical support engineers',
      'SaaS platform onboarding, troubleshooting & bug triage',
      'Remote desktop infrastructure & Windows/macOS support',
      'Network uptime monitoring & incident escalation',
      'Custom knowledge base authoring and SOP documentation'
    ],
    sla: '24/7 Live Coverage • ITIL Aligned'
  },
  {
    id: 'finance-accounting',
    icon: Calculator,
    color: 'from-emerald-500 to-teal-600',
    title: 'Finance & Accounting',
    category: 'Financial Process Outsourcing (FPO)',
    shortDesc: 'We streamline and enhance your finance and accounting processes to increase efficiency and maintain compliance.',
    detailedPoints: [
      'Accounts Payable (AP) & Accounts Receivable (AR) management',
      'Bank reconciliation & general ledger bookkeeping',
      'Payroll calculation & disbursements processing',
      'Financial reporting, variance analysis & tax preparation support',
      'Strict adherence to GAAP & IFRS standards'
    ],
    sla: '100% On-Time Ledger Close'
  },
  {
    id: 'legal-healthcare',
    icon: Stethoscope,
    color: 'from-rose-500 to-pink-600',
    title: 'Legal & Healthcare Processing',
    category: 'Regulated KPO Solutions',
    shortDesc: 'We support the most demanding and complex processes as an adjunct to your team or to offload critical and time-consuming tasks.',
    detailedPoints: [
      'HIPAA-compliant patient intake, scheduling & telehealth coordination',
      'Medical coding, billing & prior-authorization processing',
      'Electronic Health Records (EHR) indexing & chart scrubbing',
      'Paralegal document discovery, contract cataloging & case indexing',
      'Rigorous background checks & isolated secure clean-room environments'
    ],
    sla: 'HIPAA & HITECH Fully Compliant'
  },
  {
    id: 'managed-security',
    icon: ShieldAlert,
    color: 'from-amber-500 to-orange-600',
    title: 'Managed Security (MSSP)',
    category: '24/7 Cyber Defense & SOC',
    shortDesc: 'We provide 24x7 MSSP services to extend your information security and network operations capabilities.',
    detailedPoints: [
      '24/7 Security Operations Center (SOC) monitoring & alert triage',
      'Endpoint Detection & Response (EDR) telemetry analysis',
      'PCI DSS Level 1 payment processing security enforcement',
      'Vulnerability scanning, threat hunting & incident response',
      'Compliance reporting for SOC 2, HIPAA, and ISO 27001'
    ],
    sla: '24/7 Real-Time SOC Telemetry'
  }
];

export const ServicesSection: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" /> BPO & KPO Core Capabilities
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-raleway">
          Comprehensive Business Process Solutions
        </h2>
        <p className="mt-4 text-slate-300 font-work text-base sm:text-lg">
          From omni-channel customer service to highly technical cybersecurity and HIPAA-compliant healthcare operations, Contax360 delivers seamless scale.
        </p>
      </div>

      {/* Service Cards Grid (6 Main Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isSelected = activeServiceId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setActiveServiceId(service.id)}
              className={`group p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between contax-card-hover ${
                isSelected
                  ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/20 ring-1 ring-blue-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-raleway mb-2 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 font-work leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">{service.sla}</span>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Deep-Dive Drawer / Detail Panel */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
                DEEP DIVE SPECIFICATION
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{activeService.category}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-raleway">
              {activeService.title} Architecture
            </h3>

            <p className="text-sm text-slate-300 font-work leading-relaxed">
              {activeService.shortDesc} Our Montego Bay and Florida facilities provide specialized agent pods trained specifically on your brand workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeService.detailedPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Service SLA Guarantee</div>
              <div className="text-lg font-bold text-white mt-1 font-raleway">{activeService.sla}</div>
              <div className="text-xs text-slate-400 mt-2">
                All services backed by ISO/ITIL aligned monitoring, bi-weekly client performance reviews, and dedicated account leadership.
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full py-3 px-4 rounded-xl contax-gradient text-white font-bold text-xs sm:text-sm shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <span>Request Quote for {activeService.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
