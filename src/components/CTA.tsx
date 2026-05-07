import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

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
    gsap.fromTo(".cta-subtext", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Form reveal
    gsap.fromTo(".cta-form", 
      { opacity: 0, x: 20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1.2, 
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="demo" ref={containerRef} className="py-32 lg:py-48 bg-brand-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-soft/50 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_80px_rgba(4,7,7,0.08)] border border-brand-dark/5 relative overflow-hidden">
          {/* Optimized Glow */}
          <div className="absolute top-[-30%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/15 via-brand-primary/5 to-transparent pointer-events-none z-0" />

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 
                ref={headlineRef}
                className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6 leading-tight"
                style={{ perspective: "1000px" }}
              >
                Vuoi capire dove il tuo evento sta perdendo vendite?
              </h2>
              <p 
                className="cta-subtext text-lg text-brand-muted leading-relaxed mb-8"
              >
                Prenota una demo: analizziamo insieme flussi, punti bar, aree critiche e opportunità di ricavo.
              </p>
            </div>

            <div className="cta-form">
              <form className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input type="text" id="nome" className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder=" " required />
                    <label htmlFor="nome" className="absolute text-brand-muted text-sm top-4 left-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-primary pointer-events-none">Nome</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="azienda" className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder=" " required />
                    <label htmlFor="azienda" className="absolute text-brand-muted text-sm top-4 left-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-primary pointer-events-none">Azienda / venue</label>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input type="text" id="email" className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder=" " required />
                    <label htmlFor="email" className="absolute text-brand-muted text-sm top-4 left-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-primary pointer-events-none">Email</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="tele" className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors" placeholder=" " />
                    <label htmlFor="tele" className="absolute text-brand-muted text-sm top-4 left-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-primary pointer-events-none">Telefono</label>
                  </div>
                </div>

                <div className="relative">
                  <select id="tipo" className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors appearance-none" required defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="festival">Festival / Concerto</option>
                    <option value="stadio">Stadio / Palazzetto</option>
                    <option value="corporate">Evento Corporate</option>
                    <option value="altro">Altro</option>
                  </select>
                  <label htmlFor="tipo" className="absolute text-brand-muted text-xs top-1.5 left-4 transition-all peer-focus:text-brand-primary pointer-events-none">Tipo di evento</label>
                </div>

                <div className="relative">
                  <textarea id="messaggio" rows={3} className="peer w-full bg-brand-light/50 border border-brand-dark/10 rounded-xl px-4 pt-6 pb-2 text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-colors resize-none" placeholder=" "></textarea>
                  <label htmlFor="messaggio" className="absolute text-brand-muted text-sm top-4 left-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-primary pointer-events-none">Messaggio opzionale</label>
                </div>

                <button 
                  ref={btnRef}
                  onMouseMove={handleMouseMove}
                  type="button" 
                  className="group relative w-full rounded-xl bg-brand-dark py-4 text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] duration-500 mt-2 shadow-[0_10px_40px_rgba(4,7,7,0.1)] hover:shadow-[0_20px_60px_rgba(41,176,222,0.3)] border border-transparent overflow-hidden"
                >
                   {/* Main bold hover fill with motion */}
                   <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-[#1A90B8] to-brand-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-gradient-x transition-opacity duration-500 pointer-events-none" />
                   
                   {/* Spotlight effect tied to mouse */}
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                     style={{
                       background: 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.8), transparent 100%)'
                     }}
                   />
                   
                   <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide transform transition-transform duration-500 group-hover:scale-[1.03]">
                     Richiedi una demo
                     <svg className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                   </span>
                </button>
                
                <p className="text-xs text-brand-muted/70 text-center mt-2">
                  Ti ricontattiamo solo per valutare il progetto Orlay Pay.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
