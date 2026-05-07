import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function ConsoleOrganizzatore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !mockupRef.current || !headlineRef.current) return;

    // Main Section Entry Transition (Optimized scale & fade)
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.98, y: 50 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

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
    gsap.fromTo(".console-subtext", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".console-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Mockup scroll-based grow animation (starts small, grows large)
    gsap.fromTo(mockupRef.current,
      { 
        scale: 0.6,
        y: 100,
        opacity: 1,
        rotateX: 0
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        rotateX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 95%",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // Animate bars inside the chart
    gsap.fromTo(".chart-bar", 
      { height: 0 },
      {
        height: (i, target) => target.dataset.h,
        duration: 1.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="console" ref={containerRef} className="py-32 lg:py-48 bg-brand-white relative overflow-hidden">
      <div className="console-header max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-16 md:mb-24">
        <h2 ref={headlineRef} className="text-4xl md:text-5xl lg:text-[64px] font-display font-bold text-brand-dark mb-6 tracking-tight leading-tight" style={{ perspective: "1000px" }}>
          Controllo live dell'evento.
        </h2>
        <p className="console-subtext text-lg md:text-xl text-brand-muted max-w-2xl mx-auto">
          Monitora ordini, incassi, ritiri, punti di servizio e aree critiche da una sola vista operativa.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative px-6 perspective-[1200px]">
        <div 
          ref={mockupRef}
          className="relative rounded-[2.5rem] bg-brand-dark overflow-hidden p-2 sm:p-4 border border-brand-dark/10 shadow-[0_40px_100px_rgba(4,7,7,0.25)] origin-bottom"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1A90B8]/20 to-transparent opacity-50" />
          
          <div className="relative rounded-[2rem] overflow-hidden bg-[#0a0f0f] border border-white/10 aspect-[16/10] md:aspect-[21/9] flex items-center justify-center">
            {/* Minimalist Dashboard Visual Representation */}
            <div className="w-full h-full p-8 md:p-12 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                    <div className="h-3 w-48 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="hidden md:flex gap-3">
                  <div className="h-10 w-24 bg-white/5 rounded-full border border-white/10" />
                  <div className="h-10 w-24 bg-white/5 rounded-full border border-white/10" />
                  <div className="h-10 w-32 bg-brand-primary/20 rounded-full border border-brand-primary/30" />
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid md:grid-cols-3 gap-6 flex-1">
                {/* Panel 1 */}
                <div className="col-span-2 flex flex-col gap-6">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="h-4 w-48 bg-white/20 rounded mb-8" />
                    {/* Fake Bar Chart */}
                    <div className="absolute bottom-6 left-6 right-6 h-32 flex items-end gap-2">
                       {[0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 0.8, 1, 0.7, 0.5].map((h, i) => (
                         <div 
                           key={i}
                           data-h={`${h * 100}%`}
                           className="chart-bar flex-1 bg-gradient-to-t from-brand-primary/10 to-brand-primary/80 rounded-sm"
                           style={{ height: '0%' }}
                         />
                       ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 h-32">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                       <div className="h-3 w-20 bg-white/20 rounded" />
                       <div className="h-8 w-32 bg-white/40 rounded" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                       <div className="h-3 w-20 bg-white/20 rounded" />
                       <div className="h-8 w-24 bg-brand-primary/60 rounded" />
                    </div>
                  </div>
                </div>

                {/* Panel 2: Side list */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="h-4 w-32 bg-white/20 rounded mb-4" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-white/10" />
                      <div className="flex-1">
                        <div className="h-3 w-full bg-white/20 rounded mb-2" />
                        <div className="h-2 w-2/3 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <p className="text-center text-sm md:text-base text-brand-muted mt-8 max-w-xl mx-auto">
          Capisci dove la domanda cresce, dove il servizio rallenta e cosa correggere durante l'evento.
        </p>
      </div>
    </section>
  );
}
