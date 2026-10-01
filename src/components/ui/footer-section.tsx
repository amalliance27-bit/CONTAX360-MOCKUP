'use client';
import React from 'react';
import { FrameIcon } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Product',
    links: [
      { title: 'Features', href: '#features' },
      { title: 'Templates', href: '#templates' },
      { title: 'Integrations', href: '#integrations' },
      { title: 'Updates', href: '#updates' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Careers', href: '/careers' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Docs', href: '/docs' },
      { title: 'Guides', href: '/guides' },
      { title: 'Support', href: '/support' },
      { title: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-slate-900 text-white overflow-hidden pt-24 pb-12 mt-20 rounded-t-[3rem] md:rounded-t-[4rem]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400" />
              <span className="text-white font-bold text-2xl tracking-tight">Brand</span>
            </div>
            <p className="text-slate-400 text-base max-w-sm leading-relaxed">
              Premium templates for modern brands and digital products.
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.label}>
                <h3 className="text-sm text-white font-semibold tracking-wider uppercase mb-6">{section.label}</h3>
                <ul className="space-y-4 text-slate-400">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="hover:text-white transition-colors duration-300">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Brand Text */}
        <div className="w-full flex justify-center items-center border-t border-white/10 pt-12 pb-8">
          <h1 className="text-[18vw] font-bold tracking-tighter text-white/5 leading-none select-none">
            BRAND
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© 2026 Brand Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
