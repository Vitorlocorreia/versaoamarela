import React, { useState, useEffect } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenMobileMenu, whatsappUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');

  // Scroll progress + scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 50);
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy: detecta seção ativa
  useEffect(() => {
    const sectionIds = ['inicio', 'sobre', 'programas', 'produtos', 'depoimentos', 'faq'];
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio', section: 'inicio' },
    { name: 'Sobre', href: '#sobre', section: 'sobre' },
    { name: 'Programas', href: '#programas', section: 'programas' },
    { name: 'E-book', href: '#produtos', section: 'produtos' },
    { name: 'Depoimentos', href: '#depoimentos', section: 'depoimentos' },
    { name: 'Dúvidas', href: '#faq', section: 'faq' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-500">

      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#B45309] via-[#F59E0B] to-[#D97706] z-50 pointer-events-none rounded-r-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          opacity: progress > 1 ? 1 : 0,
        }}
      />

      <header
        className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? 'w-full top-0 py-3.5 px-6 sm:px-10 lg:px-12 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-md rounded-none'
            : 'w-[94%] max-w-7xl mt-3 sm:mt-4 py-3 px-5 sm:px-6 bg-white/80 backdrop-blur-md border border-amber-200/80 shadow-sm rounded-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#1C1400]/70">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={`hover:text-[#D97706] transition-colors py-1 relative group ${activeSection === link.section ? 'text-[#D97706]' : ''}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#D97706] rounded-full transition-all duration-300 ${activeSection === link.section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706] text-white text-xs font-semibold hover:bg-[#B45309] transition-all shadow-md shadow-amber-500/20"
            >
              <MessageCircle size={15} />
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>

          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-[#1C1400] hover:text-[#D97706] focus:outline-none transition-colors"
            aria-label="Abrir menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>
    </div>
  );
}
