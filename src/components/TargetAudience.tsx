import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const tags = [
  "Festival",
  "Concerti",
  "Stadi e palazzetti",
  "Food court",
  "Hospitality",
  "Aree VIP",
  "Merchandising",
  "Eventi corporate"
];

export function TargetAudience() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !headlineRef.current) return;

    // Headline Kinetic Typography
    const text = new SplitType(headlineRef.current, { types: 'words,chars' });
    gsap.from(text.chars, {
      y: 50,
      opacity: 0,
      rotationX: -90,
      stagger: 0.02,
      duration: 1.2,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Subtext reveal
    gsap.fromTo(".target-subtext", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".target-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Tags stagger reveal
    gsap.fromTo(".target-tag", 
      { opacity: 0, scale: 0.8, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".target-tags-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="pt-24 lg:pt-32 pb-12 relative overflow-hidden bg-[#040707]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540039155732-684735035728?q=80&w=2940&auto=format&fit=crop" 
          alt="Premium Event" 
          className="w-full h-full object-cover opacity-15 grayscale block"
          loading="lazy"
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040707] via-[#040707]/60 to-[#040707]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="target-header">
          <h2 ref={headlineRef} className="text-3xl md:text-5xl lg:text-[64px] font-display font-bold text-white mb-8 tracking-tight leading-[1.1]" style={{ perspective: "1000px" }}>
            Pensato per eventi dove <br />
            <span className="text-brand-primary">
              ogni minuto di coda costa ricavo.
            </span>
          </h2>
          <p className="target-subtext text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">
            Orlay Pay è adatto a contesti con alta densità di pubblico, più punti di servizio e domanda concentrata in finestre brevi.
          </p>
        </div>
        
        <div className="target-tags-container flex flex-wrap justify-center gap-3 md:gap-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="target-tag px-6 py-3 bg-white/5 border border-white/10 text-white backdrop-blur-md rounded-full text-sm md:text-base font-medium transition-colors hover:bg-brand-primary hover:border-brand-primary hover:text-white cursor-default shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
