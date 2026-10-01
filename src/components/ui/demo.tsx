'use client'

import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
 
export function SplineSceneBasic() {
  return (
    <section className="w-full min-h-[100vh] relative flex flex-col md:flex-row md:items-center md:justify-center overflow-hidden pt-24 md:pt-0">
      
      {/* Mobile Heading (Hidden on desktop) */}
      <div className="w-full px-6 relative z-10 pointer-events-none md:hidden pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-[16vw] leading-[0.9] font-bold tracking-tighter text-slate-900">
            Design <br/>
            <span className="font-serif italic font-normal text-slate-600 block mt-2">Elevated</span>
          </h1>
        </motion.div>
      </div>

      {/* 3D Scene Background */}
      <div className="relative md:absolute md:inset-0 z-0 flex justify-center md:justify-end items-center opacity-100 md:translate-x-[10%] pointer-events-auto w-full h-[40vh] md:h-auto mt-4 mb-4 md:mt-0 md:mb-0">
        <div 
          className="w-[120%] h-[55vh] md:max-w-none md:w-[70vw] md:h-[100vh] mx-auto md:mx-0 transform scale-[0.75] md:scale-100 origin-center flex items-center justify-center"
          style={{
            maskImage: 'radial-gradient(50% 50% at 50% 50%, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 60%, transparent 100%)'
          }}
        >
          <SplineScene 
            scene="https://prod.spline.design/ipj9zB1dtTJc39jn/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* Foreground Content */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pointer-events-none flex flex-col justify-center md:min-h-screen pb-12 md:pb-0 md:pt-20">
        
        {/* Desktop Heading (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-3xl hidden md:block"
        >
          <h1 className="text-[8vw] leading-[0.85] font-bold tracking-tighter text-slate-900">
            Design <br/>
            <span className="font-serif italic font-normal text-slate-600">Elevated</span>
          </h1>
        </motion.div>

        {/* Card (Both mobile and desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 md:mt-16 pointer-events-auto flex justify-center md:justify-start"
        >
          <div className="glass-panel p-6 md:p-8 rounded-3xl w-full max-w-md md:inline-block">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium text-center md:text-left">
              Crafted for modern brands, AI tools, and premium digital products.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 hover:scale-105 transition-all duration-300 shadow-xl">
                Explore Template
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/50 text-slate-900 text-sm font-semibold hover:bg-white transition-all duration-300 border border-white/60">
                View Demo
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
