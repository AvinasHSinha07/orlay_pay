import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock3, Gauge, Lock, MapPin, MousePointer2, Radio, Signal, Sparkles, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function ConsoleOrganizzatore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const stats = [
    { label: 'Ordini/min', value: '248', trend: '+18%' },
    { label: 'Attesa media', value: '2.1m', trend: '-22%' },
    { label: 'Incasso live', value: '€48.6K', trend: '+11%' },
  ];

  const zones = [
    { name: 'Bar Nord', value: '87%', accent: 'bg-brand-primary' },
    { name: 'Food Court', value: '64%', accent: 'bg-amber-400' },
    { name: 'VIP Desk', value: '41%', accent: 'bg-emerald-400' },
    { name: 'Merch', value: '52%', accent: 'bg-violet-400' },
  ];

  const activity = [
    { title: 'Bar Nord', detail: '12 ordini in coda', time: '00:24', tone: 'bg-brand-primary' },
    { title: 'Food Court', detail: 'Picco in arrivo', time: '01:05', tone: 'bg-amber-400' },
    { title: 'VIP Desk', detail: 'Checkout fluido', time: '00:11', tone: 'bg-emerald-400' },
    { title: 'Merch', detail: 'Traffico in crescita', time: '00:37', tone: 'bg-violet-400' },
  ];

  useGSAP(() => {
    if (!containerRef.current || !mockupRef.current || !headlineRef.current || !bgRef.current) return;

  

  

    const text = new SplitType(headlineRef.current, { types: 'words,chars' });
    gsap.from(text.chars, {
      y: 60,
      rotationX: -45,
      stagger: 0.018,
      duration: 1.05,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      }
    });

    gsap.fromTo('.console-subtext',
      { y: 30 },
      {
        y: 0,
        duration: 0.95,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.console-header',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );

    gsap.fromTo(mockupRef.current,
      { scale: 0.9, y: 70 },
      {
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top 90%',
          end: 'center center',
          scrub: 1,
        }
      }
    );

    gsap.fromTo('.chart-bar',
      { height: 0 },
      {
        height: (i, target) => target.dataset.h,
        duration: 1.25,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );

    gsap.fromTo('.console-stat',
      { y: 22 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    gsap.to('.console-scanline', {
      xPercent: 120,
      duration: 3.5,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.console-float', {
      y: -10,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.25,
    });

    return () => text.revert();
  }, { scope: containerRef });

  return (
    <section id="console" ref={containerRef} className="py-28 lg:py-44 relative z-20 overflow-visible bg-brand-white">
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 h-96 w-3xl -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-120 w-120 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(41,176,222,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_30%)]" />

      <div className="console-header max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/15 bg-white/90 text-brand-primary text-sm font-semibold shadow-sm mb-6">
          <Signal size={16} className="animate-pulse" />
          Console operativa in tempo reale
        </div>
        <h2 ref={headlineRef} className="text-4xl md:text-5xl lg:text-[66px] font-display font-bold text-brand-dark mb-6 tracking-tight leading-[1.05]" style={{ perspective: '1000px' }}>
          Controllo live dell&apos;evento.
        </h2>
        <p className="console-subtext text-lg md:text-xl text-brand-muted max-w-2xl mx-auto">
          Monitora ordini, incassi, ritiri, punti di servizio e aree critiche da un unico centro operativo, con segnali chiari e animazioni che guidano l&apos;attenzione.
        </p>
      </div>

      <div className="max-w-350 mx-auto px-6 sm:px-8 relative z-20 perspective-distant">
        <div
          ref={mockupRef}
          className="relative z-10 rounded-[2.5rem] bg-brand-dark/95 overflow-hidden p-2 sm:p-4 border border-white/10 shadow-[0_40px_100px_rgba(4,7,7,0.26)] origin-bottom"
        >
          <div className="console-scanline absolute inset-y-0 left-0 w-28 bg-linear-to-r from-transparent via-white/10 to-transparent blur-sm" />

          <div className="relative rounded-4xl overflow-hidden bg-[#0a0f0f] border border-white/10 aspect-16/10 md:aspect-21/9 flex items-center justify-center">
            <div className="w-full h-full p-5 md:p-7 lg:p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-[0.24em] uppercase text-white/70">Live console</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2 text-white/60 text-xs">
                    <Radio size={12} className="text-brand-primary" />
                    14 zone attive, 3 criticità sotto controllo
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                  <div className="console-float rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 flex items-center gap-2">
                    <MapPin size={12} className="text-brand-primary" />
                    Main stage
                  </div>
                  <div className="console-float rounded-full border border-white/10 bg-brand-primary/15 px-4 py-2 text-xs text-white flex items-center gap-2">
                    <TrendingUp size={12} className="text-brand-primary" />
                    +11% revenue
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-5 flex-1 min-h-0">
                <div className="flex flex-col gap-5 min-h-0">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="console-stat rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                      >
                        <div className="flex items-center justify-between mb-3 text-white/60 text-[11px] uppercase tracking-[0.22em] font-semibold">
                          <span>{stat.label}</span>
                          <span className="text-emerald-300">{stat.trend}</span>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <p className="text-2xl md:text-3xl font-display font-bold text-white">{stat.value}</p>
                          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary">
                            <Sparkles size={18} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-5 flex-1 min-h-0">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold mb-2">Flow engine</p>
                          <h3 className="text-lg md:text-xl font-display font-semibold text-white">Ordini per minuto</h3>
                        </div>
                        <div className="rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/20 px-3 py-1 text-xs font-semibold flex items-center gap-2">
                          <Clock3 size={12} />
                          picco 19:40
                        </div>
                      </div>

                      <div className="absolute inset-x-0 top-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,176,222,0.18),transparent_45%)] pointer-events-none" />

                      <div className="mt-2 h-52 md:h-72 flex items-end gap-2 md:gap-3 relative z-10">
                        {[24, 38, 32, 56, 48, 72, 66, 82, 74, 96, 84, 92].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <div className="w-full flex-1 flex items-end">
                              <div
                                data-h={`${height}%`}
                                className="chart-bar w-full rounded-t-xl bg-linear-to-t from-brand-primary/20 via-brand-primary/60 to-brand-primary shadow-[0_0_20px_rgba(41,176,222,0.18)]"
                                style={{ height: '0%' }}
                              />
                            </div>
                            <span className="text-[10px] text-white/35 font-medium">{8 + index}:00</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-white/50 relative z-10">
                        <span>3 last minute</span>
                        <span>Realtime sync on</span>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 flex flex-col gap-4 min-h-0 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold mb-2">Operational zones</p>
                          <h3 className="text-lg md:text-xl font-display font-semibold text-white">Carico per area</h3>
                        </div>
                        <div className="rounded-full bg-white/5 border border-white/10 p-2 text-brand-primary">
                          <Gauge size={18} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        {zones.map((zone) => (
                          <div key={zone.name} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div className="flex items-center justify-between text-sm font-medium text-white mb-2">
                              <span>{zone.name}</span>
                              <span className="text-white/60">{zone.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className={`h-full rounded-full ${zone.accent}`} style={{ width: zone.value }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto rounded-2xl border border-white/10 bg-black/25 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold">Live alert</p>
                            <p className="text-sm text-white mt-1 font-semibold">Micro-picchi rilevati a Food Court</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-300">
                            <Activity size={16} />
                          </div>
                        </div>
                        <p className="text-xs leading-6 text-white/55">
                          Il sistema evidenzia la coda prima che diventi un collo di bottiglia, così il team può spostare personale e cassa in pochi secondi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-5 md:p-6 flex flex-col gap-4 min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold mb-2">Command feed</p>
                      <h3 className="text-lg md:text-xl font-display font-semibold text-white">Cosa sta succedendo adesso</h3>
                    </div>
                    <div className="rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/20 px-3 py-1 text-xs font-semibold flex items-center gap-2">
                      <Users size={12} />
                      +1.4k presenti
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-semibold mb-2">Checkout rate</p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-2xl font-display font-bold text-white">98.7%</p>
                        <MousePointer2 size={16} className="text-brand-primary" />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-semibold mb-2">Queue drift</p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-2xl font-display font-bold text-white">-38%</p>
                        <TrendingUp size={16} className="text-emerald-300" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                    {activity.map((item, index) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ x: 4, scale: 1.01 }}
                        className="console-float rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4"
                      >
                        <div className={`w-11 h-11 rounded-2xl ${item.tone}/15 border border-white/10 flex items-center justify-center`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${item.tone} ${index === 0 ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <p className="font-semibold text-white truncate">{item.title}</p>
                            <span className="text-[11px] text-white/40 shrink-0">{item.time}</span>
                          </div>
                          <p className="text-sm text-white/55">{item.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-sm md:text-base text-brand-muted mt-8 max-w-xl mx-auto">
          Capisci dove la domanda cresce, dove il servizio rallenta e cosa correggere durante l&apos;evento, prima che il problema si veda in cassa.
        </p>
      </div>
    </section>
  );
}