import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { audioCoordinator } from '../utils/audioCoordinator';
import { ReturnBar } from './ReturnBar';

export const JarvisRoom: React.FC<{ onReturn?: () => void }> = ({ onReturn }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Website Upgrade',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Stop any playing voice/audio on mount
  useEffect(() => {
    audioCoordinator.stopAllVoice();
    document.querySelectorAll('audio, video').forEach((el) => {
      try {
        (el as HTMLMediaElement).pause();
      } catch (_) {}
    });
    window.dispatchEvent(new CustomEvent('contax:video-play'));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowQuoteModal(false);
      setFormData({ name: '', email: '', phone: '', projectType: 'Website Upgrade', details: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono p-4 sm:p-8 md:p-12 relative overflow-hidden select-text">
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-4xl mx-auto z-10 relative space-y-8 text-left">
        
        {/* Top Return Bar */}
        {onReturn && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-blue-500/30">
            <ReturnBar onReturn={onReturn} roomTitle="Jarvis-27 AI Web Studio" targetLabel="Lobby" />
          </div>
        )}

        {/* Commercial Video Showcase */}
        <div className="w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#00FF41]/40 bg-slate-950">
            <video 
              src="https://raw.githubusercontent.com/amalliance27-bit/soundbars-media/1e60280ee552a2c609d5af7ef0f08b59b912b340/Jarvis-27complete%20flash.mp4" 
              controls 
              autoPlay 
              loop={false}
              playsInline 
              onPlay={(e) => {
                audioCoordinator.stopAllVoice();
                document.querySelectorAll('audio, video').forEach((el) => {
                  if (el !== e.currentTarget) {
                    try { (el as HTMLMediaElement).pause(); } catch (_) {}
                  }
                });
                window.dispatchEvent(new CustomEvent('contax:video-play'));
              }}
              className="w-full h-64 sm:h-80 md:h-96 object-contain"
            />
            <div className="p-3 text-center bg-black/90 border-t border-[#00FF41]/40">
              <span className="text-[#00FF41] font-sans font-black tracking-widest text-xl sm:text-2xl md:text-3xl uppercase drop-shadow-[0_0_12px_rgba(0,255,65,0.7)]">
                Jarvis-27 @ your Service
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10 text-left font-sans">
          
          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#00FF41] leading-tight">
              <span>Web Designs</span> <span className="inline-block whitespace-nowrap">Jarvis-27</span>
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-300 font-bold max-w-2xl pt-2">
              We Upgrade Existing Website or Build From Scratch with AI Agent Power Enhancements at Most Affordable Rates.
            </p>
          </div>

          {/* Commercial Pitch & Mission */}
          <div className="text-emerald-200 text-base sm:text-lg leading-relaxed space-y-4">
            <p className="text-lg sm:text-xl font-semibold text-white">
              Is your website complex, slow, or outdated? <strong className="text-yellow-300">AMA Ask Morpheus Alliance Jarvis-27</strong> and <strong className="text-yellow-300">Pandora Lee</strong> are AI Agents engineered specifically to enhance visitor engagement, making complex browsing smoother, faster, and stress-free for every visitor.
            </p>
            <p>
              Spawned during the pandemic as a forward-thinking SaaS innovation, our core mission is <strong className="text-yellow-300">EEEE: To Educate, Enlighten, and Empower through Entertainment and AI Support</strong>. We take the friction out of digital tasks and make web experiences effortless.
            </p>
          </div>

          {/* What We Deliver */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#00FF41] tracking-wider">
                What We Deliver
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-[#00FF41]/40 rounded-full text-xs font-mono text-[#00FF41] uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
                </span>
                AI Agents Active
              </div>
            </div>

            <div className="space-y-4 text-emerald-100">
              <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all">
                <div className="relative flex items-center justify-center shrink-0 mt-1.5 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Meet Pandora & Jarvis – Your Companion Agents</h3>
                  <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
                    Pandora and Jarvis-27 are our resident tour guides and AI assistant bots equipped with browsing capabilities. They guide visitors, take notes, answer questions, and direct queries to management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all">
                <div className="relative flex items-center justify-center shrink-0 mt-1.5 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Repair & Resurrect Websites, Photos, Sounds & Videos</h3>
                  <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
                    We repair and resurrect old websites, resolve technical issues, restore old photos, fix audio recordings, and refine videos — just Ask Morpheus! Great rates whether repairing old assets or building new ones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all">
                <div className="relative flex items-center justify-center shrink-0 mt-1.5 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">AI Tool Training & Custom Companion Bots</h3>
                  <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
                    We love the challenge! We are ready to teach anyone who wants to learn AI tools — including setting up customized companion bots tailored specifically for your work. Get your own <strong className="text-yellow-300">Jarvis</strong> or <strong className="text-yellow-300">Pandora Lee @ Your Service</strong>. Masterclass sessions available — just ask!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all">
                <div className="relative flex items-center justify-center shrink-0 mt-1.5 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Affordable Custom Mockups & Web Upgrades</h3>
                  <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
                    Get quick, stunning mockup designs created to visualize your vision before full production.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all">
                <div className="relative flex items-center justify-center shrink-0 mt-1.5 w-4 h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Ask & Ye Shall Receive</h3>
                  <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
                    Seek and ye shall find. No project is too small, and no task is too complex. We love every technical challenge and bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Starting Rate Offer Banner ($100 USD Down) */}
          <div className="p-6 sm:p-8 bg-slate-950 border-2 border-[#00FF41] rounded-2xl space-y-4 shadow-[0_0_25px_rgba(0,255,65,0.2)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/40 pb-4">
              <div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 block mb-2">Exclusive Start Package</span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">Just $100 USD Down</h3>
              </div>
              <span className="inline-block px-4 py-2 bg-[#00FF41] text-black font-black uppercase tracking-wider text-sm sm:text-base rounded-lg self-start sm:self-center animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.7)] whitespace-nowrap">
                No Job Too Small
              </span>
            </div>
            <p className="text-emerald-200 text-base sm:text-lg leading-relaxed">
              If you agree on the template design, put just a <strong className="text-yellow-300">$100 USD deposit</strong> until the site is complete — covering simple to complex projects! Great rates for repairing old sites, resurrecting photo assets, fixing website issues, or building a brand new custom website from scratch.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                Request a Custom Quote Online →
              </button>
            </div>
          </div>

          {/* Contact Dean */}
          <div className="pt-6 border-t border-[#00FF41]/40 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wider mb-1">
                Contact Dean
              </h2>
              <p className="text-emerald-300 text-base sm:text-lg">
                Ready to enhance your website or get an affordable mock design quote? Reach out now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
              <a 
                href="https://wa.me/17789535496" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#00FF41] hover:bg-emerald-400 text-black font-black text-lg sm:text-xl rounded-xl transition-all shadow-md text-center"
              >
                <span className="whitespace-nowrap">WhatsApp: 778-953-5496</span>
              </a>

              <a 
                href="mailto:Askmorpheus@gmail.com" 
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-yellow-300 border border-emerald-500/50 font-bold text-base sm:text-lg rounded-xl transition-all text-center"
              >
                <span className="whitespace-nowrap">Askmorpheus@gmail.com</span>
              </a>
            </div>

            <div className="text-sm text-emerald-400 pt-2 space-y-1 font-mono text-center sm:text-left">
              <p><strong>AMA Web Developer:</strong> Dean</p>
              <p className="text-xs sm:text-sm leading-relaxed flex flex-wrap items-center justify-start gap-x-2 gap-y-0.5">
                <span className="font-bold">Business Hours:</span>
                <span className="whitespace-nowrap">11 AM – 9 PM EST</span>
                <span className="hidden sm:inline text-emerald-600">|</span>
                <span className="whitespace-nowrap">8 AM – 7 PM PST</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Online Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-[#00FF41] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl text-left font-sans">
            <div className="flex items-center justify-between border-b border-[#00FF41]/40 pb-3">
              <h3 className="text-xl font-black text-[#00FF41] uppercase">Request Web Design Quote</h3>
              <button 
                onClick={() => setShowQuoteModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00FF41] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Quote Request Received!</h4>
                <p className="text-sm text-emerald-300">Dean will contact you via WhatsApp or Email promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-emerald-300 font-bold mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00FF41]"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-bold mb-1">Email or Phone</label>
                  <input
                    required
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00FF41]"
                    placeholder="Email or WhatsApp number"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-bold mb-1">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00FF41]"
                  >
                    <option>Website Upgrade / Modernization</option>
                    <option>Brand New Custom Website ($100 Down)</option>
                    <option>AI Companion Agent Integration</option>
                    <option>Fix / Resurrect Broken Site or Media</option>
                    <option>Custom Mockup Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-emerald-300 font-bold mb-1">Tell Us About Your Vision</label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00FF41]"
                    placeholder="Describe what you need..."
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#00FF41] hover:bg-emerald-400 text-black font-black uppercase tracking-wider rounded-xl shadow-lg"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JarvisRoom;
