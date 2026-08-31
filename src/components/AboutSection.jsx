import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import BackgroundCircle from './decorations/BackgroundCircle';
import DottedPattern from './decorations/DottedPattern';
import WaveLine from './decorations/WaveLine';
import Signature from './Signature';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ onOpenModal }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".about-animate-img", 
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: section
          }
        }
      );

      gsap.fromTo(".about-animate-content", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: section
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Glow & Geometric Accent Patterns */}
      <BackgroundCircle size={450} color="#FEF3C7" opacity={0.5} className="-top-20 -left-20" />
      <DottedPattern rows={6} cols={6} color="#D97706" opacity={0.12} className="absolute top-10 right-8 z-0 hidden sm:block" />
      <WaveLine variant={2} color="#D97706" opacity={0.25} className="absolute bottom-6 right-12 z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Photo of Arielle */}
          <div className="lg:col-span-6 relative about-animate-img">
            <BackgroundCircle size={320} color="#DBEAFE" opacity={0.6} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white z-10">
              <img 
                src="/images/arielle-com-aluna.webp" 
                alt="Arielle Martins auxiliando aluna idosa nos exercícios" 
                className="w-full h-[440px] sm:h-[540px] object-cover"
                style={{ objectPosition: 'center 8%' }}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-amber-200/50">
                <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">Especialista</span>
                <span className="text-xs font-semibold text-[#1C1400]">Gerontologia & Exercício para Adultos e Idosos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio + Proposta Integrada + Assinatura */}
          <div className="lg:col-span-6 space-y-5">
            <div className="relative about-animate-content">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#D97706] uppercase mb-2 block">
                Sobre Mim & Proposta
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1400] font-medium leading-tight">
                Arielle Martins
              </h2>
            </div>

            <p className="text-sm sm:text-base font-semibold text-[#D97706] leading-snug about-animate-content">
              Profissional de Educação Física e pós-graduanda em Gerontologia, com atuação voltada ao exercício físico para adultos e idosos.
            </p>

            <div className="space-y-3.5 text-[#5C4A28] text-sm sm:text-base leading-relaxed about-animate-content">
              <p>
                Meu trabalho parte de uma ideia simples: <strong className="text-[#1C1400]">não basta acrescentar anos à vida. É preciso preservar a capacidade de vivê-los bem.</strong>
              </p>
              
              <p>
                Treinar hoje é cuidar de como você quer viver amanhã. Com o passar dos anos, preservar força, equilíbrio e capacidade de movimento torna-se essencial para continuar realizando com segurança aquilo que faz parte da sua rotina.
              </p>

              {/* Destaque da Proposta */}
              <div className="pl-4 border-l-2 border-[#D97706] py-1 my-3 bg-amber-50/40 rounded-r-xl pr-3">
                <p className="font-medium text-[#1C1400] text-sm sm:text-base italic">
                  "Estudo o envelhecimento para transformar o exercício em uma ferramenta que prepara o corpo não apenas para o treino, <span className="text-[#D97706] font-bold not-italic">mas para a vida real.</span>"
                </p>
              </div>
            </div>

            {/* Cursive SVG Signature */}
            <div className="pt-1 about-animate-content">
              <Signature width={220} height={70} color="#1C1400" />
            </div>

            <div className="pt-1 about-animate-content">
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-7 py-3.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <Calendar size={16} />
                <span>Agendar consulta inicial</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
