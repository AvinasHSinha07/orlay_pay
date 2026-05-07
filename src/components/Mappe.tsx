import { useRef } from 'react';
import { Map, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function Mappe() {
  const containerRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !mockupRef.current || !headlineRef.current) return;

    // Main Section Entry Transition (Optimized scale & fade)
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.98, x: 50 },
      { 
        opacity: 1, 
        scale: 1, 
        x: 0,
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

    // Text reveal (excluding headline)
    gsap.fromTo(".mappe-sub-element", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mappe-text",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Map UI parallax/reveal
    gsap.fromTo(mockupRef.current,
      { opacity: 0, scale: 0.9, rotateX: 20 },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Route path animation
    gsap.fromTo(".mappe-path",
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 lg:py-48 bg-brand-soft overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0TTAgNDBoNDBNMTAgMHY0ME0yMCAwdjQwTTMwIDB2NDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDQxLDE3NiwyMjIsMC4wNSkiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div 
              ref={mockupRef}
              className="relative perspective-[1000px] w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-[2.5rem] p-4 shadow-[0_20px_60px_rgba(4,7,7,0.05)] border border-brand-primary/10 flex items-center justify-center overflow-hidden"
            >
              {/* Fake Map Content */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/40 via-transparent to-transparent" />
              
              {/* Route Animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M20 80 Q 40 80, 50 50 T 80 20"
                  fill="none"
                  stroke="var(--color-brand-primary)"
                  strokeWidth="0.5"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="mappe-path opacity-50"
                />
              </svg>

              {/* Points of Interest */}
              <div className="absolute left-[20%] bottom-[20%] w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-lg border border-blue-200">
                 <Navigation size={20} className="text-brand-primary" />
                 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap text-brand-dark">
                   Ingresso
                 </div>
              </div>

              <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shadow-[0_0_30px_rgba(41,176,222,0.3)]">
                 <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shadow-lg">
                   <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                 </div>
                 <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl whitespace-nowrap">
                   Food Court Centrale
                 </div>
              </div>

              <div className="absolute right-[20%] top-[20%] w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shadow-lg border border-amber-200">
                 <Map size={20} className="text-amber-500" />
                 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap text-brand-dark">
                   Area VIP
                 </div>
              </div>
            </div>
          </div>

          <div className="mappe-text order-1 lg:order-2 flex flex-col justify-center">
            <h2 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6 tracking-tight leading-tight" style={{ perspective: "1000px" }}>
              L'evento diventa più leggibile.
            </h2>
            <p className="mappe-sub-element text-lg md:text-xl text-brand-muted leading-relaxed mb-8">
              Mappe, informazioni e percorsi aiutano il pubblico a capire dove andare e riducono domande ripetitive allo staff.
            </p>
            <div className="mappe-sub-element">
              <p className="text-sm font-semibold tracking-wide text-brand-primary uppercase bg-white px-4 py-3 rounded-xl border border-brand-primary/20 inline-block shadow-sm">
                Utile per food court, bar, hospitality, VIP, merch e punti ritiro.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
