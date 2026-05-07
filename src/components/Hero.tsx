import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Signal, Users, Zap, Lock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const microTextRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useGSAP(() => {
    if (!headlineRef.current || !microTextRef.current || !bgRef.current) return;

    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Character-by-character reveal
    const text = new SplitType(headlineRef.current, { types: 'chars,words' });
    
    gsap.from(text.chars, {
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotationX: -40,
      stagger: 0.015,
      duration: 1,
      ease: "back.out(1.2)",
      delay: 0.1
    });

    // Microtext dynamic fade-in and scale-up
    gsap.fromTo(microTextRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, delay: 1.2, ease: "power4.out" }
    );

    return () => text.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[120vh] pt-32 lg:pt-48 pb-20 overflow-hidden bg-brand-white flex flex-col items-center">
      {/* Background gradients - Optimized for GPU with Parallax wrapper */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-soft/20 to-transparent opacity-80" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0TTAgNDBoNDBNMTAgMHY0ME0yMCAwdjQwTTMwIDB2NDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDIpIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center text-center">
        
        <motion.div style={{ y, opacity, willChange: "transform, opacity" }} className="flex flex-col items-center w-full max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium border-brand-primary/20 text-brand-primary mb-10 shadow-sm"
            style={{ willChange: "transform, opacity" }}
          >
            <Signal size={16} className="animate-pulse" />
            <span>Continuità di vendita per eventi live ad alta affluenza</span>
          </motion.div>

          {/* GSAP Headline */}
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-[92px] leading-[1.05] font-display font-bold text-brand-dark tracking-tight mb-8 [clip-path:polygon(0_0,100%_0,100%_150%,0%_150%)]"
            style={{ willChange: "transform, opacity", perspective: "1000px" }}
          >
            Il pubblico è già lì.<br />
            <span className="text-brand-primary inline-block">Non perdere vendite</span><br />
            nei momenti di picco.
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl md:leading-relaxed text-brand-muted mb-12 max-w-3xl font-light"
            style={{ willChange: "transform, opacity" }}
          >
            Orlay Pay aiuta organizzatori, venue e operatori food & beverage a rendere ordine, incasso e ritiro più fluidi: meno code, meno rinunce, più controllo operativo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10 w-full mt-4"
            style={{ willChange: "transform, opacity" }}
          >
            <a 
              href="#demo"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-dark px-10 py-5 text-lg font-medium text-white transition-all hover:scale-[1.03] duration-500 shadow-[0_10px_40px_rgba(4,7,7,0.1)] hover:shadow-[0_15px_50px_rgba(41,176,222,0.2)] w-full sm:w-auto"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-x-2">Richiedi una demo</span>
              <ArrowRight size={20} className="relative z-10 transition-all duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 absolute right-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-[#1A90B8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            <div 
              ref={microTextRef}
              className="flex flex-col items-center gap-4 relative mt-2 opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-soft/20 to-transparent blur-md" />
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm font-semibold text-brand-dark uppercase tracking-widest relative z-10 px-4 py-3 md:px-6 md:py-4 rounded-3xl border border-brand-dark/10 bg-white shadow-sm transition-transform hover:scale-[1.02] duration-500">
                <span className="hover:text-brand-primary transition-colors cursor-default whitespace-nowrap">Food & beverage</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-primary/40" />
                <span className="hover:text-brand-primary transition-colors cursor-default whitespace-nowrap">Hospitality</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-primary/40" />
                <span className="hover:text-brand-primary transition-colors cursor-default whitespace-nowrap">Aree VIP</span>
                <span className="hidden lg:inline-flex w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-primary/40" />
                <span className="hover:text-brand-primary transition-colors cursor-default whitespace-nowrap hidden lg:inline">Punti bar</span>
                <span className="hidden lg:inline-flex w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-primary/40" />
                <span className="hover:text-brand-primary transition-colors cursor-default whitespace-nowrap hidden lg:inline">Merchandising</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
           style={{ scale, y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]), willChange: "transform, opacity" }}
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative perspective-[1200px] w-full max-w-6xl mt-48 md:mt-64 mb-10"
        >
          {/* Main Interactive Mockup */}
          <div className="relative z-20 w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(4,7,7,0.15)] border border-brand-dark/10 overflow-hidden flex flex-col">
            {/* Fake Window Header */}
            <div className="h-10 md:h-12 bg-white border-b border-brand-dark/10 flex items-center px-4 md:px-6 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto text-[10px] md:text-xs font-semibold text-brand-muted tracking-wider flex items-center gap-1.5 opacity-60">
                 <Lock size={12} /> orlaypay.com/console
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex-1 p-6 flex flex-col gap-6 bg-[#F8FCFD]">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-display font-semibold mb-1">Live Event Ops</h3>
                  <p className="text-xs text-brand-muted">Main Stage & Food Courts</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Ordini / min", value: "142", trend: "+12%" },
                  { label: "Attesa stimata", value: "2.5m", trend: "-15%" },
                  { label: "Incasso Live", value: "€45K", trend: "+8%" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    className="bg-white p-4 rounded-xl md:rounded-2xl border border-brand-dark/5 shadow-sm"
                  >
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-xl md:text-3xl font-display font-bold text-brand-dark">{stat.value}</p>
                      <span className="text-[10px] md:text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart Mockup */}
              <div className="flex-1 bg-white rounded-xl md:rounded-2xl border border-brand-dark/5 shadow-sm p-4 relative overflow-hidden hidden sm:block">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-semibold text-brand-muted uppercase">Conversions vs Time</p>
                  <div className="h-4 w-16 bg-brand-soft rounded" />
                </div>
                
                {/* Fake Chart Lines */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-6 pb-4 gap-3 opacity-80">
                  {[30, 40, 35, 50, 45, 60, 70, 65, 80, 95, 85, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: "0%" }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.5, delay: 1.8 + i * 0.05, ease: "easeOut" }}
                      className="w-full bg-gradient-to-t from-brand-primary to-brand-soft opacity-40 rounded-t-sm" 
                    />
                  ))}
                </div>

                {/* Curving Line */}
                <svg className="absolute bottom-4 left-0 right-0 w-full h-32 px-2" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
                    d="M0 100 Q 10 90, 20 80 T 40 70 T 60 40 T 80 20 T 100 10"
                    fill="none" 
                    stroke="var(--color-brand-primary)" 
                    strokeWidth="3" 
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                
                {/* Glowing Point */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.5, type: "spring" }}
                  className="absolute right-[4%] top-[15%] w-4 h-4 bg-white border-[3px] border-brand-primary rounded-full shadow-[0_0_15px_rgba(41,176,222,0.8)]"
                />
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: 1.6 } }}
            className="absolute -right-4 md:-right-10 top-[20%] md:top-[15%] z-30 glass-panel rounded-2xl p-4 flex items-center gap-4 w-48 shadow-2xl border border-white/50"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F6FB] flex items-center justify-center shrink-0">
              <Users size={18} className="text-brand-primary" />
            </div>
            <div>
              <p className="text-[10px] text-brand-muted uppercase font-semibold">Bar Nord</p>
              <p className="text-sm font-bold text-brand-dark mt-0.5">Coda azzerata</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 15, 0], opacity: 1 }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { delay: 1.8 } }}
            className="absolute -left-4 md:-left-12 bottom-[20%] md:bottom-[25%] z-30 glass-panel rounded-2xl p-4 flex items-center gap-4 w-52 shadow-2xl border border-white/50"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Zap size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] text-brand-muted uppercase font-semibold">Peak Alert</p>
              <p className="text-sm font-bold text-brand-dark mt-0.5">+45% Food Zone</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
