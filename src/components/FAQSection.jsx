import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import BackgroundCircle from './decorations/BackgroundCircle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection({ onOpenModal, whatsappUrl }) {
  const sectionRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-item-anim",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6,
          ease: "power2.out", clearProps: "all",
          scrollTrigger: { trigger: section, start: "top 80%" }
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'Como funciona a Consulta Inicial?',
      a: 'A Consulta Inicial é o momento dedicado a compreender seu histórico de saúde, sua rotina, suas necessidades e seus objetivos. É a partir dessa conversa detalhada que definimos o melhor caminho para o seu acompanhamento.'
    },
    {
      q: 'Os treinos são seguros para quem tem dores, artrose ou limitações de movimento?',
      a: 'Sim, totalmente. Não trabalho com treinos prontos ou genéricos. Cada movimento é planejado respeitando suas capacidades e limites articulares, fortalecendo a musculatura sem sobrecarga ou risco.'
    },
    {
      q: 'Qual a diferença entre o acompanhamento Presencial e o On-line?',
      a: 'No presencial, o atendimento é próximo e direto durante as sessões. No on-line, você recebe um planejamento personalizado desenvolvido para sua rotina, com orientação e acompanhamento contínuo da sua evolução à distância.'
    },
    {
      q: 'Para quem é indicado o acompanhamento?',
      a: 'Para adultos que desejam se preparar para envelhecer bem com força e autonomia, e também para quem já percebe mudanças na força, equilíbrio, mobilidade ou segurança para realizar as atividades do cotidiano.'
    },
    {
      q: 'Como faço para agendar a minha Consulta Inicial?',
      a: 'Basta clicar no botão "Agendar consulta inicial" aqui no site ou entrar em contato direto pelo WhatsApp. Alinharemos o melhor dia e horário para nossa conversa.'
    }
  ];

  const toggleFaq = (idx) => setOpenIdx(openIdx === idx ? -1 : idx);

  return (
    <section ref={sectionRef} id="faq" className="py-20 lg:py-28 bg-[#FAF6E4] relative overflow-hidden">
      <BackgroundCircle size={380} color="#FEF3C7" opacity={0.35} className="top-1/4 -right-20 z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D97706] uppercase block mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1400] font-medium leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4A28] mt-3 max-w-lg mx-auto leading-relaxed">
            Tire suas principais dúvidas sobre como funciona o meu acompanhamento especializado para adultos e idosos.
          </p>
          <div className="h-0.5 w-10 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* ── Accordion ── */}
        <div className="space-y-3.5 max-w-3xl mx-auto mb-16 sm:mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="faq-item-anim bg-white rounded-2xl border border-amber-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-amber-300">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-[#1C1400] text-base sm:text-lg hover:text-[#D97706] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#D97706] text-white' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5C4A28] leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────
            CLEAN WHATSAPP CHAT SHOWCASE CARD
            Mockup 3D Fotorrealista do iPhone Titanium
            ───────────────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-amber-200/90 shadow-xl shadow-amber-500/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Coluna Esquerda: Texto & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-5">
              
              <div className="inline-flex items-center gap-2 bg-amber-50 text-[#D97706] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Atendimento Direto
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1400] font-medium leading-tight">
                Ainda tem alguma dúvida? Fale comigo agora.
              </h3>

              <p className="text-[#5C4A28] text-sm sm:text-base leading-relaxed">
                Estou à disposição no WhatsApp para entender o seu caso, tirar dúvidas sobre o acompanhamento e te orientar sobre o melhor caminho para sua saúde.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={whatsappUrl || "https://wa.me/5581986833360"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={20} className="fill-white" />
                  <span>Conversar no WhatsApp</span>
                  <ArrowRight size={18} />
                </a>
              </div>

              <p className="text-[11px] text-[#5C4A28] pt-1">
                Resposta rápida • Atendimento humanizado e sem compromisso
              </p>

            </div>

            {/* Coluna Direita: Mockup Oficial do WhatsApp com Arielle */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] flex justify-center">
                <img
                  src="/images/whatsapp-mockup-client.webp"
                  alt="Conversa no WhatsApp com Arielle Martins"
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.03] drop-shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
