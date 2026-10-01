import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, 
  Linkedin, Clock, Building, MessageSquare, ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Enterprise BPO Quote');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
              <Phone className="w-3.5 h-3.5" /> Start a Conversation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-raleway">
              Speak to One of Our Nearshore Experts
            </h2>
            <p className="mt-3 text-slate-300 font-work text-sm sm:text-base leading-relaxed">
              We are just one email or phone call away. Join the many Fortune 500 and high-growth businesses scaling with Contax360 BPO Solutions.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            {/* Phone */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Hotline</div>
                <a href="tel:+18774474627" className="text-lg font-bold text-white hover:text-blue-400 transition font-raleway">
                  +1 877-447-4627
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">Toll-Free USA & International</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Inquiries</div>
                <a href="mailto:info@contax360.com" className="text-base font-bold text-white hover:text-purple-400 transition font-raleway">
                  info@contax360.com
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">24/7 Monitored Executive Inbox</p>
              </div>
            </div>

            {/* Montego Bay HQ */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contax360 HQ</div>
                <p className="text-sm font-bold text-white font-raleway">
                  1 Mangrove Way, Freeport
                </p>
                <p className="text-xs text-slate-300">Montego Bay, Jamaica, W.I.</p>
              </div>
            </div>

            {/* Florida USA Hub */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Onshore USA Hub</div>
                <p className="text-sm font-bold text-white font-raleway">
                  Plantation, Florida, USA
                </p>
                <p className="text-xs text-slate-300">Onshore Management & Client Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Interactive Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-raleway">
                  Request Information or Solution Proposal
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out your details and our leadership team will respond within 2 business hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Purpose</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Enterprise BPO Quote">Enterprise BPO Quote (Nearshore Jamaica / Florida)</option>
                  <option value="Customer Care & Chat Scaling">Customer Care & 24/7 Chat Scaling</option>
                  <option value="Back-Office / Healthcare HIPAA Processing">Back-Office / Healthcare HIPAA Processing</option>
                  <option value="24/7 MSSP Security Operations">24/7 MSSP Security Operations</option>
                  <option value="Career / Walk-In Hiring Inquiries">Career / Walk-In Hiring Inquiries</option>
                  <option value="General Partnerships">General Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">How Can We Help You? *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your team size, expected support volume, channels, or timeline..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl contax-gradient text-white font-bold text-sm shadow-xl disabled:opacity-50 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Contax360</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-raleway">Thank You, {fullName}!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Your message has been received by our executive team. We will review your inquiry and follow up shortly at <strong className="text-white">{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setCompany('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
