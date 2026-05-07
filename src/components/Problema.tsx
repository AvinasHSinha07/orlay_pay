import { useRef } from 'react';
import { AlertTriangle, Clock, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Clock,
    title: "Code e doppia attesa",
    text: "Il fan perde tempo tra scelta, pagamento e ritiro.",
  },
  {
    icon: AlertTriangle,
    title: "Staff sotto pressione",
    text: "Il banco rallenta quando deve ricostruire ordini, importi e prossime azioni.",
  },
  {
    icon: Activity,
    title: "Dati frammentati",
    text: "A fine evento è difficile capire dove si è persa domanda.",
  }
];

export function Problema() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || !headlineRef.current) return;

    // ⭐ DRAMATIC Background color transition - red/warm tones for problems
    gsap.fromTo(bgRef.current, 
      { background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,245,240,1) 100%)' },
      {
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(239,68,68,0.04) 25%, rgba(239,68,68,0.12) 50%, rgba(239,68,68,0.08) 75%, rgba(239,68,68,0.03) 100%)',
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
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
    gsap.fromTo(".problema-subtext", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".problema-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Cards staggered reveal
    gsap.fromTo(".problema-card", 
      { opacity: 0, scale: 0.9, y: 50 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".problema-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="problema" className="py-32 lg:py-48 bg-brand-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-80 mix-blend-multiply"
        style={{ willChange: "background" }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="problema-header max-w-3xl mb-24">
          <h2 ref={headlineRef} className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-display font-bold text-brand-dark tracking-tight mb-8" style={{ perspective: "1000px" }}>
            La vendita si perde prima del pagamento.
          </h2>
          <p className="problema-subtext text-lg md:text-xl text-brand-muted leading-relaxed">
            Quando l'affluenza cresce, il punto di servizio diventa il collo di bottiglia: il pubblico aspetta, ordina meno o rinuncia. Lo staff gestisce confusione invece di servire. L'organizzatore vede i dati quando è troppo tardi.
          </p>
        </div>

        <div className="problema-grid grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="problema-card group relative bg-white/80 backdrop-blur-md rounded-3xl p-10 hover:bg-white border border-brand-primary/10 transition-all duration-500 shadow-[0_4px_20px_transparent] hover:shadow-[0_30px_60px_rgba(4,7,7,0.06)] hover:-translate-y-3 hover:scale-[1.02] overflow-hidden"
            >
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-brand-dark/5 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:border-brand-primary/20">
                <item.icon size={24} className="text-brand-primary transition-all duration-500 group-hover:scale-110" />
              </div>
              
              <h3 className="relative z-10 text-xl font-display font-bold text-brand-dark mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                {item.title}
              </h3>
              
              <p className="relative z-10 text-brand-muted leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
