import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'glass-panel bg-white/70' : 'bg-white/30 backdrop-blur-md border border-white/50'}`}>
        {/* Logo */}
        <div className="text-slate-900 font-bold tracking-tighter text-xl pl-2 md:pl-0 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          Brand
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {['Home', 'Features', 'Studio', 'Contact'].map((item) => (
            <a key={item} href="#" className="relative group hover:text-slate-900 transition-colors">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <button className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 hover:scale-105 transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
            Start Creating
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-700 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 w-full mt-4 p-6 rounded-3xl glass-panel flex flex-col gap-4 shadow-2xl"
          >
            {['Home', 'Features', 'Studio', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-slate-700 hover:text-slate-900 text-lg font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white/50">
                {item}
              </a>
            ))}
            <button className="mt-4 w-full px-6 py-3 rounded-full bg-slate-900 text-white text-base font-semibold shadow-lg">
              Start Creating
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
