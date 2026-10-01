import React, { useState } from 'react';
import { 
  Mail, Phone, Send, CheckCircle2, MapPin, 
  Building, Clock, ArrowLeft
} from 'lucide-react';
import { VideoPanel } from './VideoPanel';
import { TestimonialsSection } from './TestimonialsSection';

interface ContactRoomProps {
  onSelectRoom: (room: string) => void;
}

export const ContactRoom: React.FC<ContactRoomProps> = ({ onSelectRoom }) => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-800">
      {/* 1. HERO BANNER: "Contact Us" */}
      <section className="relative bg-[#090f22] text-white flex items-center justify-center text-center px-4 pt-4 sm:pt-10 pb-8 sm:pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e1c]/90 via-[#0d1829]/95 to-[#0a1222] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1 whitespace-nowrap max-w-full">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-cyan-400 animate-pulse" />
            <span className="truncate">24/7 Executive Inquiries & Hotline</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white">
            Contact Suite
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-work max-w-xl mx-auto leading-relaxed">
            We are just one email or phone call away. Join the many global businesses growing with Contax360.
          </p>
        </div>
      </section>

      {/* 2. DEDICATED CONTACT ROOM VIDEO EXPLAINER PANEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        <VideoPanel
          roomTitle="Executive Consultation & Facility Visits"
          roomBadge="Contact Video Explainer"
          videoSrc="https://contax360.com/wp-content/uploads/2021/03/Contax-Staff-And-Environment-1-1.m4v"
          posterImage="https://contax360.com/wp-content/uploads/2021/06/contax-360-offic-bg.jpg"
          pandoraExplanation="Welcome to the Contax360 Contact Room! Whether you are exploring options for your next nearshore support pod or have an immediate need to scale 24/7 coverage, our leadership team in Montego Bay and Florida will tailor an exact proposal for your business."
          chapterHighlights={[
            "Direct hotline: +1 877-447-4627 (Toll-free USA and International)",
            "Executive inbox: info@contax360.com monitored 24 hours a day",
            "Montego Bay HQ: 1 Mangrove Way, Freeport, Montego Bay, Jamaica, W.I.",
            "Schedule an on-site facility walkthrough or nearshore pilot program"
          ]}
          keyStats={[
            { label: "Phone Hotline", value: "877-447-4627" },
            { label: "Response Time", value: "< 2 Hours" },
            { label: "Pilot Deployment", value: "14 Days" },
            { label: "Campus Visits", value: "Welcome" }
          ]}
          defaultOpen={true}
        />
      </section>

      {/* 3. FORM & INQUIRIES SPLIT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#006cff] font-raleway leading-tight">
                Speak to one of our experts. Find out what Contax360 can do for you.
              </h2>
              <p className="mt-2 text-sm text-slate-600 font-work">
                We are just one email away. Join the many businesses growing with Contax360.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company"
                    className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How Can We Help You?"
                    className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-[#006cff] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-raleway">Message Sent!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Our enterprise team will connect with you at <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Other Inquiries */}
          <div className="lg:col-span-4 space-y-6 pt-2">
            <h3 className="text-2xl font-bold text-[#006cff] font-raleway">
              Other Inquiries
            </h3>

            <div className="space-y-6">
              {/* Email box */}
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:info@contax360.com"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition block font-work"
                >
                  info@contax360.com
                </a>
              </div>

              {/* Phone box */}
              <div className="space-y-1 pt-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  href="tel:+18774474627"
                  className="text-sm font-bold text-slate-800 hover:text-blue-600 transition block font-mono"
                >
                  +1 877-447-4627
                </a>
              </div>

              {/* HQ Address Details */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-700 uppercase tracking-wider">Montego Bay HQ</p>
                <p>1 Mangrove Way, Freeport</p>
                <p>Montego Bay, Jamaica, W.I.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIDE-SCROLLING TESTIMONIALS */}
      <TestimonialsSection onSelectRoom={onSelectRoom} />
    </div>
  );
};
