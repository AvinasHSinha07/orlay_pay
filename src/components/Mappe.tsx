import { useRef } from 'react';
import { Map, Navigation, Utensils, Crown, Package } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function Mappe() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !mockupRef.current || !headlineRef.current || !bgRef.current) return;

    // ⭐ SMOOTH Background color transition
    gsap.fromTo(bgRef.current, 
      { background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,255,1) 100%)' },
      {
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(79,172,254,0.04) 25%, rgba(79,172,254,0.12) 50%, rgba(79,172,254,0.08) 75%, rgba(79,172,254,0.03) 100%)',
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );

    // Headline Kinetic Typography
    const text = new SplitType(headlineRef.current, { types: 'words,chars' });
    gsap.from(text.chars, {
      y: 60,
      opacity: 0,
      rotationX: -45,
      stagger: 0.02,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

    // Text reveal
    gsap.fromTo(".mappe-sub-element", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mappe-text",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    // Map UI Clean Entrance - smooth fade & subtle scale
    gsap.fromTo(mockupRef.current,
      { opacity: 0, scale: 0.92, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      }
    );

    // Markers entrance - cleaner timing
    gsap.fromTo(".map-marker",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        }
      }
    );

    // Tooltips entrance - subtle reveal
    gsap.fromTo(".map-tooltip",
      { scale: 0.9, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        }
      }
    );

    // Parallax effect for map on scroll - smooth upward drift
    gsap.to(mockupRef.current,
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      }
    );

    // Continuous float animation - subtle and smooth
    gsap.to(".map-marker-container", {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });

    // Subtle radar pulse
    gsap.fromTo(".map-ring",
      { scale: 0.7, opacity: 0.4 },
      {
        scale: 2.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.4,
        ease: "power2.out"
      }
    );

    // Route path flowing
    gsap.to(".mappe-path-flow", {
      strokeDashoffset: -80,
      duration: 3.5,
      repeat: -1,
      ease: "none"
    });

    return () => {
      text.revert();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 lg:py-48 bg-brand-white overflow-hidden relative">
      {/* ⭐ Animated gradient background - smooth transition */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ willChange: "background" }}
      />

      {/* Accent gradient elements for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-primary/8 via-transparent to-transparent rounded-full blur-3xl -z-1" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Map Mockup - Left Side */}
          <div className="order-2 lg:order-1 relative perspective-1000">
            <div 
              ref={mockupRef}
              className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-white via-blue-50/30 to-white rounded-[2rem] p-6 shadow-[0_40px_100px_rgba(4,7,7,0.12)] border border-brand-primary/15 flex items-center justify-center overflow-hidden backdrop-blur-sm"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Background Map Gradient */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/15 via-transparent to-transparent rounded-[1.5rem]" />
              
              {/* Grid Pattern Background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iMSIgZmlsbD0icmdiYSg0MSwxNzYsMjIyLDAuMDgpIi8+PC9zdmc+')] opacity-60 rounded-[1.5rem]" />
              
              {/* Animated Route */}
              <svg className="absolute inset-0 w-full h-full drop-shadow-sm rounded-[1.5rem]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M15 85 Q 35 85, 45 55 T 85 15"
                  fill="none"
                  stroke="url(#route-gradient)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                  className="mappe-path-flow opacity-70"
                />
                <defs>
                   <linearGradient id="route-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="50%" stopColor="#29b0de" />
                     <stop offset="100%" stopColor="#f59e0b" />
                   </linearGradient>
                </defs>
              </svg>

              {/* POI 1: Entrance (Blue) */}
              <div className="map-marker-container absolute left-[18%] bottom-[18%] -translate-x-1/2 translate-y-1/2 z-10">
                 <div className="map-ring absolute inset-0 rounded-full bg-blue-400 blur-sm"></div>
                 <div className="map-marker relative w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-xl border-2 border-blue-300 hover:scale-110 transition-transform duration-300">
                   <Navigation size={22} className="text-blue-600" />
                 </div>
                 <div className="map-tooltip absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap text-brand-dark border border-blue-200">
                   🚪 Ingresso
                 </div>
              </div>

              {/* POI 2: Food Court Central (Primary Color - Highlighted) */}
              <div className="map-marker-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                 <div className="map-ring absolute inset-0 rounded-full bg-brand-primary blur-sm"></div>
                 <div className="map-marker relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-brand-primary/40 hover:scale-110 transition-all duration-300">
                   <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-lg">
                     <Utensils size={24} className="text-white" />
                   </div>
                 </div>
                 <div className="map-tooltip absolute bottom-full mb-5 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-2xl whitespace-nowrap border border-brand-primary/30">
                   🍴 Food Court
                 </div>
              </div>

              {/* POI 3: VIP Area (Amber) */}
              <div className="map-marker-container absolute right-[18%] top-[18%] translate-x-1/2 -translate-y-1/2 z-10">
                 <div className="map-ring absolute inset-0 rounded-full bg-amber-400 blur-sm"></div>
                 <div className="map-marker relative w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shadow-xl border-2 border-amber-300 hover:scale-110 transition-transform duration-300">
                   <Crown size={22} className="text-amber-600" />
                 </div>
                 <div className="map-tooltip absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap text-brand-dark border border-amber-200">
                   👑 VIP Area
                 </div>
              </div>

              {/* POI 4: Merchandise (Purple) */}
              <div className="map-marker-container absolute right-[15%] bottom-[25%] translate-x-1/2 translate-y-1/2 z-10">
                 <div className="map-ring absolute inset-0 rounded-full bg-purple-400 blur-sm"></div>
                 <div className="map-marker relative w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center shadow-xl border-2 border-purple-300 hover:scale-110 transition-transform duration-300">
                   <Package size={22} className="text-purple-600" />
                 </div>
                 <div className="map-tooltip absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap text-brand-dark border border-purple-200">
                   📦 Merch
                 </div>
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="mappe-text order-1 lg:order-2 flex flex-col justify-center">
            <h2 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6 tracking-tight leading-[1.15]" style={{ perspective: "1000px" }}>
              L'evento diventa<br />
              <span className="text-brand-primary">più leggibile</span>.
            </h2>
            <p className="mappe-sub-element text-lg md:text-xl text-brand-muted leading-relaxed mb-10">
              Mappe, informazioni e percorsi aiutano il pubblico a capire dove andare e riducono domande ripetitive allo staff.
            </p>
            
            {/* Feature List */}
            <div className="space-y-4 mappe-sub-element">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-200/50">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mt-0.5">
                  <Navigation size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-sm">Percorsi chiari</p>
                  <p className="text-brand-muted/80 text-xs">Riduci confusione e domande</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mt-0.5">
                  <Map size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-sm">Aree organizzate</p>
                  <p className="text-brand-muted/80 text-xs">Food court, bar, VIP, merch</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
