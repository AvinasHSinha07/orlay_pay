import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const borderY = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.3)"]);
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(16px)"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problema', href: '#problema' },
    { name: 'Soluzione', href: '#soluzione' },
    { name: 'Funzionalità', href: '#console' },
    { name: 'Analytics', href: '#analytics' },
  ];

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: backgroundY,
          borderColor: borderY,
          backdropFilter: backdropBlur,
        }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          isScrolled ? "py-3" : "py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="relative z-10 flex items-center h-8 md:h-12 w-[120px] md:w-[200px] shrink-0 group">
            <img 
              src="https://i.ibb.co.com/rPR09h9/Orlay-Pay-png-01-removebg-preview.png" 
              alt="Orlay Pay" 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-12 md:h-28 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 text-sm font-medium text-brand-text/80">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="hover:text-brand-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a 
              href="#demo"
              className="relative overflow-hidden rounded-full bg-brand-dark px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105 duration-300 group"
            >
              <span className="relative z-10">Richiedi una demo</span>
              <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-10 p-2 -mr-2 text-brand-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div 
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary origin-left"
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-6 flex flex-col"
      >
        <div className="flex flex-col gap-6 text-2xl font-display font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-brand-text hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="mt-auto">
          <a 
            href="#demo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-full rounded-full bg-brand-dark px-6 py-4 text-base font-medium text-white"
          >
            Richiedi una demo
          </a>
        </div>
      </motion.div>
    </>
  );
}
