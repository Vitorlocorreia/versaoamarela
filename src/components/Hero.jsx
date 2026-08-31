import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

/* ── Typing effect hook ── */
function useTypingEffect(lines, speed = 50, delayBetween = 500) {
  const [displayedLines, setDisplayedLines] = React.useState(['', '']);
  const [done, setDone] = React.useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timeout;

    const type = () => {
      if (lineIdx >= lines.length) { setDone(true); return; }
      const currentLine = lines[lineIdx];
      if (charIdx <= currentLine.length) {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx);
          return next;
        });
        charIdx++;
        timeout = setTimeout(type, speed);
      } else {
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(type, delayBetween);
      }
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return { displayedLines, done };
}

/* ── Lista de Fotos Embaralhadas do Hero (Ultra-HQ WebP) ── */
const heroSlides = [
  {
    src: "/images/hero/hero-main.webp",
    alt: "Arielle Martins Personal Trainer de Longevidade",
    position: "object-[center_15%]"
  },
  {
    src: "/images/hero/hero-5.webp",
    alt: "Arielle Martins sorrindo com aluna durante treino",
    position: "object-[center_10%]"
  },
  {
    src: "/images/hero/hero-1.webp",
    alt: "Arielle Martins Personal Trainer de Longevidade",
    position: "object-[center_15%]"
  },
  {
    src: "/images/hero/hero-4.webp",
    alt: "Arielle acolhendo e orientando aluna",
    position: "object-[center_15%]"
  },
  {
    src: "/images/hero/hero-2.webp",
    alt: "Arielle Martins sorrindo",
    position: "object-[center_15%]"
  }
];

export default function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // Transição 100% contínua e suave a cada 4.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(".hero-carousel-container", { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.9 });
      tl.fromTo(".hero-animate-text",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, clearProps: "all" },
        "-=0.6"
      );
      tl.fromTo(".hero-animate-cta",
        { opacity: 0, scale: 0.94, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)", clearProps: "all" },
        "-=0.4"
      );
    }, hero);
    return () => ctx.revert();
  }, []);

  // Typing lines (desktop)
  const { displayedLines } = useTypingEffect(
    ['Movimento para viver bem', 'em todas as fases da vida.'],
    45, 450
  );

  return (
    <section 
      ref={heroRef} 
      id="inicio" 
      className="relative lg:min-h-[92vh] flex flex-col justify-start lg:justify-center pt-0 lg:pt-16 pb-8 lg:pb-12 overflow-hidden bg-white"
    >

      {/* ── DESKTOP: FUSÃO SUAVE CONTÍNUA (FOTO-SOBRE-FOTO SEM CORTE) ── */}
      <div 
        className="hero-carousel-container hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] xl:w-[50%] overflow-hidden z-0 select-none pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,1) 22%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,1) 22%)'
        }}
      >
        {/* Todas as fotos sobrepostas em camadas para transição direta e suave */}
        {heroSlides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover ${slide.position} transition-all duration-1200 ease-in-out will-change-[opacity,transform] ${
              current === idx
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-[1.03] z-0'
            }`}
          />
        ))}

        {/* Leve fade no rodapé para fusão com a próxima seção */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-20" />
      </div>

      {/* ── MOBILE: FOTO EM ALTA RESOLUÇÃO COM FUSÃO SUAVE ── */}
      <div className="hero-carousel-container lg:hidden relative w-full overflow-hidden mt-14 sm:mt-16 z-0 pointer-events-none">
        <div className="relative w-full h-[400px] sm:h-[480px] overflow-hidden">
          
          {/* Fotos sobrepostas em crossfade perfeito */}
          {heroSlides.map((slide, idx) => (
            <img
              key={idx}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover ${slide.position} transition-all duration-1200 ease-in-out will-change-[opacity,transform] ${
                current === idx
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-[1.03] z-0'
              }`}
            />
          ))}
          
          {/* Fusão suave na base da foto (substituindo o corte rígido) */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent z-20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-10 relative h-full flex flex-col lg:justify-center">

        {/* ── DESKTOP CONTENT ── */}
        <div className="hidden lg:flex flex-col max-w-[580px] text-left pt-6">

          <div className="hero-animate-text mb-4">
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#D97706] uppercase">
              Especialista em Envelhecimento & Longevidade
            </span>
            <div className="h-[2px] w-12 bg-[#D97706] mt-2" />
          </div>

          {/* H1 com Typing Effect */}
          <h1 className="hero-animate-text font-serif text-[44px] xl:text-[48px] leading-[1.14] font-normal tracking-tight mb-5 min-h-[115px]">
            <span className="text-[#1C1400] block mb-2">
              {displayedLines[0]}
              {displayedLines[0].length < 'Movimento para viver bem'.length && (
                <span className="inline-block w-0.5 h-[1em] bg-[#D97706] ml-0.5 animate-pulse align-middle" />
              )}
            </span>
            <span className="text-[#D97706] font-semibold block">
              {displayedLines[1]}
              {displayedLines[0] === 'Movimento para viver bem' &&
                displayedLines[1].length < 'em todas as fases da vida.'.length && (
                <span className="inline-block w-0.5 h-[0.85em] bg-[#D97706] ml-0.5 animate-pulse align-middle" />
              )}
            </span>
          </h1>

          <p className="hero-animate-text text-base text-[#1C1400]/90 leading-relaxed max-w-lg mb-8">
            Treinamento especializado para adultos e idosos, desenvolvido para preservar força, funcionalidade e qualidade de vida ao longo dos anos.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onOpenModal}
              className="hero-animate-cta flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar size={18} />
              <span>Agendar consulta inicial</span>
            </button>

            <a
              href="#sobre"
              className="hero-animate-cta flex items-center justify-center gap-2 border border-[#D97706] text-[#1C1400] hover:bg-[#FEF9C3] px-7 py-3.5 rounded-xl text-sm font-semibold transition-all bg-white active:scale-95 cursor-pointer"
            >
              <span>Conhecer o método</span>
              <ArrowRight size={16} className="text-[#D97706]" />
            </a>
          </div>
        </div>

        {/* ── MOBILE CONTENT ── */}
        <div className="lg:hidden w-full flex flex-col pt-2 pb-8 px-2 z-10 relative">
          <div className="hero-animate-text mb-3 text-left">
            <span className="text-[11px] font-bold tracking-[0.14em] text-[#D97706] uppercase">
              Especialista em Envelhecimento & Longevidade
            </span>
            <div className="h-[2px] w-10 bg-[#D97706] mt-1.5" />
          </div>

          <h1 className="hero-animate-text font-serif text-[28px] sm:text-[32px] leading-[1.2] font-normal tracking-tight mb-3 text-left">
            <span className="text-[#1C1400] block mb-0.5">Movimento para viver bem</span>
            <span className="text-[#D97706] font-semibold block">em todas as fases da vida.</span>
          </h1>

          <p className="hero-animate-text text-[14px] text-[#453314] leading-relaxed mb-6 text-left">
            Treinamento especializado para adultos e idosos, desenvolvido para preservar força, funcionalidade e qualidade de vida ao longo dos anos.
          </p>

          <div className="flex flex-col gap-3 mb-2 w-full">
            <button
              onClick={onOpenModal}
              className="hero-animate-cta w-full h-[52px] flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-5 rounded-xl text-[15px] shadow-md shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calendar size={19} />
              <span>Agendar consulta inicial</span>
            </button>

            <a
              href="#sobre"
              className="hero-animate-cta w-full h-[52px] flex items-center justify-center gap-2.5 border border-[#D97706]/40 text-[#1C1400] hover:bg-[#FEF9C3] px-5 rounded-xl font-semibold text-[15px] transition-all bg-white active:scale-[0.98] cursor-pointer"
            >
              <span>Conhecer o método</span>
              <ArrowRight size={18} className="text-[#D97706]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
