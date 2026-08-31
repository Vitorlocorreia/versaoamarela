import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DottedPattern from './decorations/DottedPattern';
import BackgroundCircle from './decorations/BackgroundCircle';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Wrapper que aplica tilt 3D individualmente a cada card */
function TiltCard({ className, children }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(10, 1.04);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}

export default function OfferingsSection({ onOpenModal }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.offering-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards, 
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            toggleActions: "play none none none"
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cards = [
    {
      badge: 'Ponto de Partida',
      title: 'Consulta Inicial',
      desc: 'Antes de começar, eu preciso conhecer você. Um momento dedicado a compreender seu histórico, sua rotina, seus objetivos e as necessidades para definirmos o melhor caminho.',
      btnText: 'Agendar minha consulta inicial',
      btnBg: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-md shadow-amber-500/20',
      isPrimary: true
    },
    {
      badge: 'Treinamento Próximo',
      title: 'Acompanhamento Presencial',
      desc: 'Treinamento próximo e personalizado, com sessões planejadas de acordo com suas capacidades, necessidades e evolução. Você entende o que está sendo trabalhado e por que é importante para sua rotina.',
      btnText: 'Conhecer o presencial',
      btnBg: 'bg-[#1C1400] hover:bg-[#120D00] text-white shadow-md shadow-amber-950/20',
      isPrimary: false
    },
    {
      badge: 'Orientação à Distância',
      title: 'Acompanhamento On-line',
      desc: 'Um acompanhamento estruturado para quem deseja treinar com orientação profissional, mesmo à distância. Seu planejamento é desenvolvido para sua realidade e evolui junto com você.',
      btnText: 'Conhecer o on-line',
      btnBg: 'bg-white border border-[#D97706]/40 text-[#1C1400] hover:bg-amber-50',
      isPrimary: false
    }
  ];

  return (
    <section ref={sectionRef} id="programas" className="py-16 lg:py-24 bg-[#FAF6E4] relative overflow-hidden">
      <BackgroundCircle size={400} color="#FEF3C7" opacity={0.4} className="top-10 -left-20 z-0" />
      <DottedPattern rows={6} cols={8} color="#D97706" opacity={0.12} className="absolute top-12 right-8 z-0 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-14 text-center sm:text-left gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D97706] uppercase block mb-2">
              Formatos de Acompanhamento
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1400] font-medium">
              Como podemos começar
            </h2>
            <div className="h-0.5 w-10 bg-[#D97706] mt-3 rounded-full mx-auto sm:mx-0"></div>
          </div>

          {/* Carousel Navigation Arrows for Mobile/Tablet */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#1C1400] hover:bg-amber-50 flex items-center justify-center shadow-xs active:scale-95 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 pb-6 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {cards.map((c, i) => (
            <TiltCard
              key={i}
              className={`offering-card w-[86vw] max-w-[360px] md:w-auto md:max-w-none snap-center shrink-0 bg-white rounded-3xl p-7 sm:p-8 border ${
                c.isPrimary ? 'border-[#D97706]/40 shadow-lg ring-1 ring-[#D97706]/15' : 'border-amber-200/90 shadow-sm'
              } flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all duration-300 relative z-10 cursor-default`}
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="text-[11px] font-bold tracking-wider text-[#D97706] uppercase">
                    Opção 0{i + 1}
                  </span>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md ${
                    c.isPrimary ? 'bg-amber-600 text-white' : 'bg-amber-50 text-[#1C1400]'
                  }`}>
                    {c.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#1C1400] mb-3">
                  {c.title}
                </h3>

                <p className="text-[#5C4A28] text-sm leading-relaxed mb-8">
                  {c.desc}
                </p>
              </div>

              <button
                onClick={onOpenModal}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs transition-all ${c.btnBg} cursor-pointer active:scale-95`}
              >
                {c.btnText}
              </button>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
