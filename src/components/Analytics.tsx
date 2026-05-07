import { useRef } from 'react';
import { BarChart3, LineChart, PieChart, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    icon: BarChart3,
    title: "Performance per area",
    text: "Quali zone vendono e quali rallentano."
  },
  {
    icon: Activity,
    title: "Picchi reali",
    text: "Quando la domanda cresce davvero."
  },
  {
    icon: PieChart,
    title: "Mix prodotti",
    text: "Cosa viene scelto, cosa resta indietro."
  },
  {
    icon: LineChart,
    title: "Decisioni migliori",
    text: "Meno percezioni, più evidenze operative."
  }
];

export function Analytics() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

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

    // Header reveal
    gsap.fromTo(".analytics-header", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".analytics-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Cards staggered reveal
    gsap.fromTo(".analytics-card", 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".analytics-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="analytics" className="pt-16 lg:pt-24 pb-32 lg:pb-48 bg-[#040707] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0TTAgNDBoNDBNMTAgMHY0ME0yMCAwdjQwTTMwIDB2NDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="analytics-header text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-display font-bold mb-6 tracking-tight leading-tight">
            Il valore non finisce a fine serata.
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Leggi cosa converte, cosa rallenta e dove si perde domanda. Usa i dati per migliorare pricing, staffing, layout e offerta del prossimo evento.
          </p>
        </div>

        <div className="analytics-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="analytics-card group bg-white/[0.03] border border-white/[0.05] p-8 rounded-3xl hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <item.icon size={20} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
