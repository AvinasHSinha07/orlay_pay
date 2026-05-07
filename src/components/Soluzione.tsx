import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, PieChart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: TrendingUp,
    title: "Più ordini completati",
    text: "Soprattutto nelle finestre di massima domanda.",
    delay: 0.1
  },
  {
    icon: Zap,
    title: "Più velocità al banco",
    text: "Meno passaggi manuali, meno errori, meno improvvisazione.",
    delay: 0.2
  },
  {
    icon: Target,
    title: "Più controllo per zona",
    text: "Ordini, incassi, ritiri e performance leggibili per area.",
    delay: 0.3
  },
  {
    icon: PieChart,
    title: "Più valore post-evento",
    text: "Dati utili per decidere pricing, staffing e layout successivi.",
    delay: 0.4
  }
];

export function Soluzione() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headlineRef.current || !containerRef.current) return;
    
    // Main Section Entry Transition (Directional wipe effect)
    gsap.fromTo(containerRef.current, 
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { 
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Headline Kinetic Typography
    const text = new SplitType(headlineRef.current, { types: 'words,chars' });
    
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
      y: 50,
      opacity: 0,
      rotationX: -90,
      stagger: 0.02,
      duration: 1.2,
      ease: "back.out(1.5)"
    });

    // Background Image Blur Reveal
    gsap.fromTo(".soluzione-bg",
      { filter: "blur(20px)", scale: 1.1 },
      {
        filter: "blur(0px)",
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );

    // Paragraph reveal
    gsap.fromTo(".soluzione-desc", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".soluzione-desc",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Cards staggered reveal
    gsap.fromTo(".soluzione-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".soluzione-cards-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    return () => text.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="soluzione" className="py-32 lg:py-48 text-white relative overflow-hidden bg-[#040707]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1470229722913-7c090be5c5a4?q=80&w=2940&auto=format&fit=crop" 
          alt="Concert Crowd" 
          className="soluzione-bg w-full h-full object-cover opacity-[0.15] grayscale"
          loading="lazy"
          style={{ willChange: "filter, transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040707] via-[#040707]/80 to-[#040707]" />
      </div>

      {/* Background glow - Optimized for GPU */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/15 via-brand-primary/5 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          
          {/* Left Text */}
          <div className="flex flex-col justify-center">
            <h2 
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-display font-bold mb-8 [clip-path:polygon(0_0,100%_0,100%_150%,0%_150%)]"
            >
              Una regia unica per trasformare il servizio in ricavo.
            </h2>
            <p className="soluzione-desc text-lg md:text-xl text-white/60 leading-relaxed">
              Orlay Pay rende più leggibile il percorso del fan, più veloce il lavoro dello staff e più chiaro il controllo dell'organizzatore. Il risultato è un evento più ordinato nei momenti critici.
            </p>
          </div>

          {/* Right Cards */}
          <div className="soluzione-cards-grid grid sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className={`soluzione-card group relative bg-white/[0.04] border border-white/[0.08] p-8 md:p-10 rounded-3xl hover:bg-white/[0.08] transition-all duration-500 overflow-hidden ${index % 2 !== 0 ? 'sm:translate-y-12' : ''}`}
              >
                {/* Glowing border line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={22} className="relative z-10" />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 text-white">
                  {item.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
