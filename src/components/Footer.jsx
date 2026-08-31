import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { Phone, Instagram, Mail } from 'lucide-react';
import AmbientWaves from './decorations/AmbientWaves';

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contato"
      className="bg-[#120D00] text-amber-100/80 text-xs relative overflow-hidden border-t border-amber-900/60 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {/* Ambient Waves with Royal Blue Tint */}
      <AmbientWaves className="w-full -mt-12 mb-4 opacity-40" color="#D97706" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-amber-900/50 items-start">
          
          {/* Logo & Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="brightness-200">
              <Logo className="text-white" />
            </div>
            <p className="text-xs text-amber-200/80 max-w-xs leading-relaxed">
              Treinamento personalizado e mentoria especializada em longevidade, força e saúde integral.
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Navegação</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-amber-200/80">
              <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              <a href="#produtos" className="hover:text-white transition-colors">E-book</a>
              <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
              <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
              <a href="#programas" className="hover:text-white transition-colors">Mentoria</a>
              <a href="#contato" className="hover:text-white transition-colors">Contato</a>
              <a href="#programas" className="hover:text-white transition-colors">Consultoria</a>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Fale comigo</h4>
            <div className="space-y-2.5 text-amber-200/90">
              <a 
                href="https://wa.me/5581986833360" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone size={15} className="text-[#F59E0B]" />
                <span>(81) 98683-3360</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Instagram size={15} className="text-[#F59E0B]" />
                <span>@ariellemartins.pt</span>
              </div>
              <a 
                href="mailto:contato@ariellelongividade.com.br"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail size={15} className="text-[#F59E0B]" />
                <span>contato@ariellelongividade.com.br</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-amber-300/70">
          <p>© {new Date().getFullYear()} Arielle Martins Personal Trainer. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
