import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, CheckCircle2, ArrowRight, Eye, Sparkles, MessageCircle, X, Clock, Bell } from 'lucide-react';
import DottedPattern from './decorations/DottedPattern';
import BackgroundCircle from './decorations/BackgroundCircle';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ className, children }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8, 1.02);
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}>
      {children}
    </div>
  );
}

export default function ProductsShowcase({ onOpenModal, whatsappUrl }) {
  const sectionRef = useRef(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.ebook-anim-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const waitlistMessage = encodeURIComponent("Olá Arielle! Gostaria de entrar na lista de espera para ser avisado(a) no lançamento do e-book 'Manual Prático de Treinamento para Idosos'.");
  const ebookWhatsappUrl = whatsappUrl 
    ? whatsappUrl.replace(/text=.*$/, `text=${waitlistMessage}`)
    : `https://wa.me/5581986833360?text=${waitlistMessage}`;

  return (
    <section ref={sectionRef} id="produtos" className="py-12 sm:py-16 lg:py-20 bg-[#FAF6E4] relative overflow-hidden">
      {/* Background Subtle Accents */}
      <BackgroundCircle size={360} color="#FEF3C7" opacity={0.4} className="-top-12 left-1/4 z-0" />
      <DottedPattern rows={5} cols={6} color="#D97706" opacity={0.08} className="absolute top-6 right-6 z-0 hidden sm:block" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Card Container */}
        <div className="ebook-anim-card bg-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-amber-200/90 shadow-xl shadow-amber-950/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Prominent 3D Book Cover */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <TiltCard className="relative w-56 sm:w-64 md:w-72 lg:w-full max-w-[320px] group cursor-pointer">
                <div 
                  onClick={() => setIsZoomOpen(true)} 
                  className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/80 bg-white transition-all duration-300 group-hover:shadow-amber-500/15 group-hover:border-amber-300"
                >
                  <img
                    src="/images/ebook-cover.webp"
                    alt="Manual Prático de Treinamento para Idosos por Arielle Alexandre Martins"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1C1400]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-[2px]">
                    <Eye size={16} />
                    <span>Ampliar Capa</span>
                  </div>
                </div>
              </TiltCard>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-[#5C4A28]">
                <BookOpen size={13} className="text-[#D97706]" />
                <span>Autora: Arielle Alexandre Martins</span>
              </div>
            </div>

            {/* Right: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-[#D97706] border border-amber-300/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Clock size={13} className="text-[#D97706]" />
                  <span>Lançamento em Breve</span>
                </span>
                <span className="text-xs font-semibold text-[#1C1400]/70 bg-slate-100 px-3 py-1 rounded-full">
                  E-book Digital
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1400] font-bold leading-tight">
                Manual Prático de Treinamento para Idosos
              </h2>

              <p className="text-[#453314] text-sm sm:text-base leading-relaxed">
                Desenvolva o raciocínio clínico na prescrição de exercícios para a terceira idade. Um guia prático com evidências, avaliações funcionais e estratégias para fortalecer a autonomia e longevidade.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-2 py-2 border-y border-slate-100 text-xs sm:text-sm text-[#1C1400]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#D97706] shrink-0" />
                  <span>Raciocínio clínico para prescrição segura e individualizada</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#D97706] shrink-0" />
                  <span>Avaliação prática de força, marcha e prevenção de quedas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#D97706] shrink-0" />
                  <span>Estudos de caso reais com tomadas de decisão clínica</span>
                </div>
              </div>

              {/* Action Button (Single Primary CTA) */}
              <div className="pt-3 w-full">
                <a
                  href={ebookWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[58px] sm:min-h-[60px] py-4 px-6 flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-2xl text-[15px] sm:text-base shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  <Bell size={20} className="shrink-0" />
                  <span>Entrar na Lista de Espera</span>
                  <ArrowRight size={18} className="shrink-0" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Modal Zoom */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-sm w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-11 right-0 p-2 text-white/90 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <img
              src="/images/ebook-cover.webp"
              alt="Capa do E-book"
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}
    </section>
  );
}
