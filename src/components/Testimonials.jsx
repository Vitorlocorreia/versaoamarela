import React, { useEffect, useRef, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import BackgroundCircle from './decorations/BackgroundCircle';
import DottedPattern from './decorations/DottedPattern';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Gradient avatar por nome ── */
function GradientAvatar({ name }) {
  const gradients = [
    ['#D97706', '#F59E0B'],
    ['#7C3AED', '#A78BFA'],
    ['#059669', '#34D399'],
    ['#DC2626', '#F87171'],
    ['#D97706', '#FCD34D'],
    ['#0891B2', '#67E8F9'],
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  const [from, to] = gradients[idx];
  return (
    <div
      className="w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {name.charAt(0)}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.8,
          ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: section }
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  // Track active carousel index
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / reviews.length;
      setActiveIdx(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  const scrollTo = (idx) => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.scrollWidth / reviews.length;
    scrollRef.current.scrollTo({ left: cardW * idx, behavior: 'smooth' });
    setActiveIdx(idx);
  };

  const actionBadges = [
    { label: 'Cuidado & Postura', img: '/images/action-1.jpg', defaultImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80' },
    { label: 'Força & Autonomia', img: '/images/action-2.jpg', defaultImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80' },
    { label: 'Saúde & Sorrisos', img: '/images/action-3.jpg', defaultImg: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=300&q=80' },
  ];

  const reviews = [
    { name: 'João Carlos', role: '72 anos • Aluno de Consultoria', text: 'Melhorou minha disposição, minha força e minha autonomia. Hoje me sinto capaz de fazer coisas do dia a dia que há anos não conseguia fazer com facilidade!' },
    { name: 'Maria Helena', role: '68 anos • Aluna de Consultoria', text: 'Arielle é extremamente atenciosa e profissional! Os treinos são motivadores, respeitam meus limites e me devolveram a alegria de me movimentar.' },
    { name: 'Pedro Lima', role: 'Personal Trainer • Mentorado', text: 'A mentoria transformou minha carreira! Aprendi a me posicionar no mercado da longevidade com autoridade, segurança e captação de clientes.' },
  ];

  return (
    <section ref={sectionRef} id="depoimentos" className="py-16 lg:py-24 bg-[#FAF6E4] relative overflow-hidden">
      <BackgroundCircle size={360} color="#FEF3C7" opacity={0.4} className="-top-16 right-1/3 z-0" />
      <DottedPattern rows={5} cols={6} color="#D97706" opacity={0.12} className="absolute bottom-6 left-10 z-0 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.15em] text-[#D97706] uppercase mb-2 block">
            Depoimentos & Histórias Reais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1400] font-medium">
            O que meus alunos dizem
          </h2>
          <div className="h-1 w-12 bg-[#D97706] mx-auto mt-3 rounded-full" />

          {/* Authority Badges */}
          <div className="mt-8 inline-flex items-center justify-center gap-6 sm:gap-10 bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-full border border-amber-200 shadow-sm">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1C1400] border-r border-amber-200 pr-4">
              <ShieldCheck size={16} className="text-[#D97706]" />
              <span>Aulas Presenciais:</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              {actionBadges.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#D97706] to-blue-300 shadow-xs group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
                    <img src={b.img} alt={b.label} onError={e => { e.target.src = b.defaultImg; }} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1C1400] hidden md:inline">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav arrows row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="text-xs font-bold text-[#1C1400] uppercase tracking-wider">Avaliações dos Alunos</span>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full bg-white border border-amber-200 text-[#1C1400] flex items-center justify-center shadow-xs active:scale-95 transition-all" aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md shadow-amber-500/20 active:scale-95 transition-all" aria-label="Próximo">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={scrollRef} className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 pb-4 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 relative z-10">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="testimonial-card group w-[86vw] max-w-[360px] md:w-auto md:max-w-none snap-center shrink-0 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col justify-between transition-all duration-300 cursor-default relative overflow-hidden
                bg-white hover:bg-white/60 hover:backdrop-blur-md hover:border-amber-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Glass shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="text-[#D97706] w-8 h-8 opacity-40" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[#334155] text-xs sm:text-sm leading-relaxed italic mb-6">"{r.text}"</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3 relative z-10">
                <GradientAvatar name={r.name} />
                <div>
                  <h3 className="font-bold text-[#1C1400] text-xs sm:text-sm">{r.name}</h3>
                  <span className="text-[11px] text-[#D97706] font-semibold">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Dot indicators (mobile only) ── */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="transition-all duration-300"
              aria-label={`Ir para depoimento ${i + 1}`}
            >
              <div className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 h-2.5 bg-[#D97706]' : 'w-2.5 h-2.5 bg-amber-200'}`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
