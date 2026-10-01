'use client';
import React from 'react';
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
  {
    title: 'Fast by Default',
    icon: Zap,
    description: 'Built for smooth performance across modern devices.',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Flexible Layouts',
    icon: Cpu,
    description: 'Adapt sections, content, and visuals to fit your brand.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Built Secure',
    icon: Fingerprint,
    description: 'Designed with modern best practices for reliable experiences.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Easy to Customize',
    icon: Pencil,
    description: 'Update the layout, copy, and 3D elements with ease.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Creative Control',
    icon: Settings2,
    description: 'Fine-tune the details to shape the exact experience you want.',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'Ready for AI',
    icon: Sparkles,
    description: 'A strong starting point for AI tools, SaaS products, and modern platforms.',
    className: 'md:col-span-3 md:row-span-1',
  },
];

export default function DemoOne() {
  return (
    <section className="py-24 md:py-40 w-full relative z-10">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.1]">
            Built to <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-slate-500">Perform</span>
          </h2>
          <p className="text-slate-600 mt-6 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            A polished foundation for fast, scalable, and interactive web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {features.map((feature, i) => (
            <FeatureCard 
              key={i} 
              feature={feature} 
              className={feature.className}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
