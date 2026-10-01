import React from 'react';
import { 
  Headphones, FileText, Monitor, Calculator, 
  Stethoscope, ShieldAlert, CheckCircle2, ArrowRight
} from 'lucide-react';
import { VideoPanel } from './VideoPanel';
import { TestimonialsSection } from './TestimonialsSection';

interface ServicesRoomProps {
  onSelectRoom: (room: string) => void;
}

export const ServicesRoom: React.FC<ServicesRoomProps> = ({ onSelectRoom }) => {
  return (
    <div className="flex flex-col w-full bg-white text-slate-800">
      {/* 1. HERO BANNER WITH AUTHENTIC HEADSET CALL CENTER BACKGROUND */}
      <section className="relative bg-[#090f22] text-white flex items-center justify-center text-center px-4 pt-4 sm:pt-10 pb-8 sm:pb-16 overflow-hidden">
        {/* Background Call Center Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(https://contax360.com/wp-content/uploads/2021/05/contax-callcenter-headset-bpokpo-servicesbgalt4.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e1c]/90 via-[#0d1829]/95 to-[#0a1222] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-cyan-400 font-bold">
            BPO & KPO Solutions
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white">
            BPO & KPO Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto font-work leading-relaxed">
            Scalable nearshore and onshore solutions tailored for high-touch customer support, enterprise cybersecurity, and regulated back-office processing.
          </p>
        </div>
      </section>

      {/* 2. DEDICATED SERVICES ROOM VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        <VideoPanel
          roomTitle="BPO & KPO Operations"
          roomBadge="Services Video Explainer"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Staffvideo-Final-Avi-Convert-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/05/contax-callcenter-headset-bpokpo-servicesbgalt4.jpg"
          pandoraExplanation="Welcome to the Contax360 Services Room! Watch our multi-tiered support specialists in action. From 24/7 omni-channel customer interaction to complex HIPAA medical record indexing and 24x7 managed security, our certified agents handle every touchpoint with precision."
          chapterHighlights={[
            "Omni-channel voice, live chat, SMS, and social media moderation",
            "Complex back-office transaction validation with 99.9% accuracy guarantee",
            "Tier 1, 2, and 3 technical helpdesk engineers and SaaS ops",
            "HIPAA patient intake, legal discovery, and 24x7 MSSP cybersecurity SOC"
          ]}
          keyStats={[
            { label: "Omni-Channel CSAT", value: "99.4%" },
            { label: "Accuracy SLA", value: "99.9%" },
            { label: "Coverage", value: "24/7/365" },
            { label: "Compliance", value: "HIPAA & PCI" }
          ]}
        />
      </section>

      {/* 3. 6 CORE WHITE SERVICE CARDS (Border-Free) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Customer Interaction */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-call-center-blue.png" 
                  alt="Customer Interaction" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                Customer Interaction
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                We provide a full range of Omni-Channel services from traditional phone and email to fully integrated chat and social media.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • Inbound & Outbound Voice • 24/7 Live Chat • Social Media Care
            </div>
          </div>

          {/* Service 2: Back-office Transactions */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-financial-blue.png" 
                  alt="Back-office Transactions" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                Back-office Transactions
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                We help organizations increase customer satisfaction with services ranging from data entry to complex transactions requiring compliance and validation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • High-Throughput Indexing • Order Fulfillment • KYC Verification
            </div>
          </div>

          {/* Service 3: IT & Software Operations */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-IT-blue.png" 
                  alt="IT & Software Operations" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                IT & Software Operations
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                Our technical expertise allows us to provide multi-tiered support for customers or employees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • Multi-Tiered Helpdesk • SaaS Support • ITIL Aligned
            </div>
          </div>

          {/* Service 4: Finance & Accounting */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/06/contax-360-service-icon-calculator-blue-e1623878158617.png" 
                  alt="Finance & Accounting" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                Finance & Accounting
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                We streamline and enhance your finance and accounting processes to increase efficiency and maintain compliance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • AP & AR Management • Reconciliations • Payroll Support
            </div>
          </div>

          {/* Service 5: Legal & Healthcare Processing */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-medical-blue.png" 
                  alt="Legal & Healthcare Processing" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                Legal & Healthcare Processing
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                We support the most demanding and complex processes as an adjunct to your team or to offload critical and time-consuming tasks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • HIPAA Patient Intake • Medical Coding • Paralegal Discovery
            </div>
          </div>

          {/* Service 6: Managed Security */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://contax360.com/wp-content/uploads/2021/05/contax-360-service-icon-data-lock-blue.png" 
                  alt="Managed Security" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#006cff] font-raleway mb-3">
                Managed Security
              </h3>
              <p className="text-sm text-slate-600 font-work leading-relaxed">
                We provide 24x7 MSSP services to extend your information security and network operations capabilities.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 w-full text-xs text-slate-500 font-semibold text-blue-600">
              • 24/7 Security Operations Center • PCI DSS Level 1 Security
            </div>
          </div>
        </div>
      </section>

      {/* 4. PURPLE BANNER: "Find out what Contax360 can do for you" */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#451ce7] to-[#006cff] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway">
            Find out what Contax360 can do for you
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-work">
            Speak to an expert, learn about our solutions, or start a project with us.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectRoom('contact')}
              className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 shadow-xl transition"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* 5. SIDE-SCROLLING TESTIMONIALS */}
      <TestimonialsSection onSelectRoom={onSelectRoom} />
    </div>
  );
};
