import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DottedPattern from './decorations/DottedPattern';
import BackgroundCircle from './decorations/BackgroundCircle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.step-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.7,
          ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: section, start: 'top 80%' }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Conhecer',
      desc: 'Compreensão detalhada do seu histórico, rotina, capacidades e necessidades específicas.'
    },
    {
      num: '02',
      title: 'Planejar',
      desc: 'Construção de uma estratégia individualizada integrando força, mobilidade e equilíbrio.'
    },
    {
      num: '03',
      title: 'Treinar',
      desc: 'Exercícios guiados com foco na função e na segurança de cada movimento.'
    },
    {
      num: '04',
      title: 'Acompanhar',
      desc: 'Evolução contínua para que os ganhos do treino se traduzam em mais autonomia na vida real.'
    }
  ];

  return (
    <section ref={sectionRef} id="metodo" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <BackgroundCircle size={350} color="#FEF3C7" opacity={0.4} className="-top-12 right-12 z-0" />
      <DottedPattern rows={6} cols={6} color="#D97706" opacity={0.12} className="absolute bottom-8 left-8 z-0 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D97706] uppercase block mb-3">
            Meu Método
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1400] font-medium mb-4">
            Exercício com estratégia e propósito.
          </h2>
          <p className="text-base sm:text-lg font-bold text-[#D97706] mb-4">
            Não acredito em treinos prontos.
          </p>
          <p className="text-[#5C4A28] text-sm sm:text-base leading-relaxed">
            O acompanhamento é construído a partir das necessidades de cada pessoa, integrando força, equilíbrio, coordenação, mobilidade e funcionalidade para que os resultados do treino sejam percebidos também na vida cotidiana.
          </p>
          <div className="h-0.5 w-10 bg-[#D97706] mx-auto mt-6 rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="step-card bg-[#FAF6E4] rounded-3xl p-7 border border-amber-200/80 shadow-xs relative flex flex-col justify-between hover:shadow-md hover:border-amber-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl font-bold text-[#D97706]">
                    {step.num}
                  </span>
                  <div className="w-8 h-0.5 bg-[#D97706]/30 rounded-full" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#1C1400] mb-2.5 flex items-center gap-2">
                  {step.title}
                  {idx < steps.length - 1 && (
                    <ArrowRight size={14} className="text-amber-300 hidden lg:inline" />
                  )}
                </h3>
                <p className="text-[#5C4A28] text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
