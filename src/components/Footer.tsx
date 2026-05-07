export function Footer() {
  return (
    <footer className="bg-brand-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          
          <div className="flex flex-col gap-6">
            <a href="#" className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co.com/7JgVKqx4/Orlay-Pay-png-01.png" 
                alt="Orlay Pay" 
                className="h-16 md:h-24 lg:h-[100px] object-contain invert brightness-0"
                loading="lazy"
              />
            </a>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              La regia unica per trasformare il servizio in ricavo durante gli eventi live ad alta affluenza.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-medium text-sm">Piattaforma</h4>
              <a href="#problema" className="text-white/50 hover:text-brand-primary text-sm transition-colors">Il Problema</a>
              <a href="#soluzione" className="text-white/50 hover:text-brand-primary text-sm transition-colors">La Soluzione</a>
              <a href="#console" className="text-white/50 hover:text-brand-primary text-sm transition-colors">Funzionalità</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-medium text-sm">Contatti</h4>
              <a href="#demo" className="text-white/50 hover:text-brand-primary text-sm transition-colors">Richiedi Demo</a>
              <a href="mailto:info@orlaypay.com" className="text-white/50 hover:text-brand-primary text-sm transition-colors">info@orlaypay.com</a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Orlay Pay. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Termini di Servizio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
