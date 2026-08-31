import React, { useEffect, useRef } from 'react';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BottomCTA({ onOpenModal, whatsappUrl }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-button-anim",
        { opacity: 0, scale: 0.92, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.5)",
          clearProps: "all",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#FAF6E4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* ── 10. ENCERRAMENTO: Luxury Card ── */}
        <div className="bg-gradient-to-br from-[#1C1400] via-[#120D00] to-[#1C1400] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-amber-900/40 relative overflow-hidden text-white">
          
          {/* Ambient Lighting Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Text & Buttons */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold tracking-[0.18em] text-[#F59E0B] uppercase bg-[#120D00]/70 px-4 py-1.5 rounded-full border border-amber-1000/30 inline-block">
                Dê o Primeiro Passo
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-white">
                Como você deseja viver os seus próximos anos?
              </h2>

              <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Cuidar do corpo hoje é investir na força, na segurança e na liberdade de movimento que você deseja preservar no futuro. <strong className="text-white">O primeiro passo começa com uma conversa sobre você.</strong>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onOpenModal}
                  className="cta-button-anim w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/30 transition-all active:scale-95 cursor-pointer"
                >
                  <Calendar size={19} />
                  <span>Agendar consulta inicial</span>
                </button>

                <a
                  href={whatsappUrl || "https://wa.me/5581986833360"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button-anim w-full sm:w-auto flex items-center justify-center gap-2.5 border border-white/20 text-white hover:bg-white/10 px-7 py-4 rounded-xl font-bold text-sm transition-all bg-white/5 backdrop-blur-md text-center cursor-pointer"
                >
                  <MessageCircle size={19} className="text-[#F59E0B]" />
                  <span>Falar pelo WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 bg-[#120D00]">
                <img 
                  src="/images/arielle-com-aluna.webp" 
                  alt="Arielle Martins com aluna" 
                  className="w-full h-80 object-cover object-center contrast-105"
                  style={{ objectPosition: 'center 10%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D00]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs font-semibold text-white/90">
                    Preservar a capacidade de viver bem.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
