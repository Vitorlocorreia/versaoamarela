import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Modal ao clicar em foto ── */
function ImageModal({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[90vh] w-full rounded-2xl object-contain shadow-2xl"
        />
        <div className="absolute bottom-8 left-8 right-8 p-4 rounded-xl bg-black/60 backdrop-blur-sm text-white">
          <h3 className="text-base font-bold">{item.title}</h3>
          <p className="text-sm text-white/80 mt-0.5">{item.desc}</p>
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
        aria-label="Fechar"
      >
        <X size={24} />
      </button>
    </motion.div>
  );
}

/* ── Componente de Card de Vídeo ── */
function VideoTestimonialCard({ src, title, subtitle, badge }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative group bg-white rounded-3xl overflow-hidden border border-amber-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-amber-400 transition-all duration-300 h-full">
      <div className="relative aspect-[9/13] max-h-[460px] w-full bg-slate-900 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          playsInline
          controls={isPlaying}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col items-center justify-center cursor-pointer transition-all group-hover:bg-black/40"
          >
            <button
              type="button"
              className="w-16 h-16 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-xl shadow-amber-500/40 group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Assistir relato"
            >
              <Play size={28} className="translate-x-0.5 fill-white" />
            </button>
            <span className="text-xs font-bold text-white uppercase tracking-wider mt-3.5 bg-black/50 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
              Assistir depoimento
            </span>
          </div>
        )}
      </div>

      <div className="p-6 bg-white flex flex-col justify-between flex-grow">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#D97706] uppercase bg-amber-50 px-2.5 py-1 rounded-md mb-2 inline-block">
            {badge}
          </span>
          <h4 className="font-serif text-xl font-semibold text-[#1C1400] leading-snug">
            {title}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#5C4A28] mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ── Carrossel de Vídeos ── */
function VideoCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const videoList = [
    {
      src: "/videos/depoimento-1.mov",
      badge: "Relato Real • Autonomia",
      title: "Superação, firmeza e mais qualidade de vida",
      subtitle: "Veja como o treinamento especializado transformou a rotina e devolveu a segurança no dia a dia."
    },
    {
      src: "/videos/depoimento-2.mov",
      badge: "Relato Real • Independência",
      title: "Força e confiança para viver o melhor da longevidade",
      subtitle: "Depoimento sincero sobre a evolução dos movimentos, equilíbrio e bem-estar físico."
    },
    {
      src: "/videos/depoimento-3.mov",
      badge: "Relato Real • Vitalidade",
      title: "Resultados reais e liberdade no dia a dia",
      subtitle: "Experiência transformadora com acompanhamento personalizado e foco em saúde funcional."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
      {/* Header com botões de navegação */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 text-center sm:text-left">
        <div>
          <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-[0.2em] block mb-1">
            Depoimentos em Vídeo
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1400] font-medium">
            Histórias reais de transformação
          </h3>
        </div>

        {/* Setas de navegação */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#1C1400] hover:bg-amber-50 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer hover:bg-[#B45309]"
            aria-label="Próximo vídeo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carrossel Horizontal Snap — Zero empilhamento vertical */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {videoList.map((item, idx) => (
          <div
            key={idx}
            className="w-[84vw] max-w-[380px] sm:w-[380px] shrink-0 snap-center"
          >
            <VideoTestimonialCard
              src={item.src}
              badge={item.badge}
              title={item.title}
              subtitle={item.subtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dados de Fotos ── */
const photos = [
  {
    id: 1,
    url: "/images/proof/supermercado-cesta-sorrindo.webp",
    title: "Fazer compras sozinha",
    desc: "Com leveza, sem dor e com um sorriso no rosto.",
    span: "row-span-2",
  },
  {
    id: 2,
    url: "/images/proof/carrinho-supermercado-sorrindo.webp",
    title: "Empurrar o carrinho",
    desc: "Membros superiores fortes garantem independência.",
    span: "row-span-1",
  },
  {
    id: 3,
    url: "/images/proof/supermercado-caminhando.webp",
    title: "Caminhar com confiança",
    desc: "Passos firmes, postura ereta, vitalidade visível.",
    span: "row-span-1",
  },
  {
    id: 4,
    url: "/images/proof/supermercado-escolhendo.webp",
    title: "Se abaixar sem medo",
    desc: "Mobilidade que devolve a independência e autonomia.",
    span: "row-span-2",
  },
  {
    id: 5,
    url: "/images/proof/carrinho-supermercado.webp",
    title: "Suas compras, do seu jeito",
    desc: "Força funcional que mantém a rotina.",
    span: "col-span-2 row-span-1",
  },
  {
    id: 6,
    url: "/images/proof/carro-abrindo-porta.webp",
    title: "Entrar no carro sozinha",
    desc: "Equilíbrio e força que devolvem a liberdade.",
    span: "row-span-1",
  },
  {
    id: 7,
    url: "/images/proof/carrinho-supermercado-2.webp",
    title: "Viver com leveza",
    desc: "Cada gesto feito com segurança, independência e autonomia.",
    span: "row-span-1",
  },
  {
    id: 8,
    url: "/images/proof/carro-saindo.webp",
    title: "Sair do carro sozinha",
    desc: "Sem ajuda, no seu ritmo, com sua independência e autonomia.",
    span: "col-span-2 row-span-2",
  },
  {
    id: 9,
    url: "/images/proof/carro-entrando.webp",
    title: "Entrar no carro com segurança",
    desc: "Flexibilidade para cada movimento do dia.",
    span: "row-span-1",
  },
  {
    id: 10,
    url: "/images/proof/supermercado-caminhando-2.webp",
    title: "De volta à sua rotina",
    desc: "Independência que o treino funcional devolve.",
    span: "row-span-1",
  },
];

/* ── Card bento foto ── */
function BentoCard({ item, onOpen }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-amber-200/60 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-[220px] ${item.span}`}
      onClick={() => onOpen(item)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      aria-label={`Ver: ${item.title}`}
    >
      <img
        src={item.url}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1400]/85 via-[#1C1400]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-white/80">{item.desc}</p>
      </div>
      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

/* ── Seção Principal ── */
export default function ProofGallery() {
  const [selected, setSelected] = useState(null);

  const track = [...photos, ...photos];

  return (
    <section
      id="depoimentos"
      className="relative bg-[#FAF6E4] py-20 lg:py-28 overflow-hidden"
    >
      <style>{`
        @keyframes bento-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bento-track {
          animation: bento-scroll 38s linear infinite;
          will-change: transform;
        }
        .bento-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Header: 6. RESULTADOS ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14"
      >
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#D97706] uppercase block mb-4">
          Resultados na Vida Real
        </span>

        {/* Big Highlighted Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1400] font-medium leading-tight mb-6">
          O resultado mais importante{" "}
          <span className="relative inline-block text-[#D97706]">
            acontece fora do treino.
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D97706] rounded-full" />
          </span>
        </h2>

        <p className="text-[#5C4A28] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          O exercício ganha significado quando aquilo que é desenvolvido no treino melhora a maneira como você vive.
        </p>

        {/* 4 Outcome Pillars — Estilo Editorial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-left">
          {[
            "Sentir-se mais forte.",
            "Caminhar com segurança.",
            "Levantar-se com facilidade.",
            "Ter confiança para realizar as próprias atividades."
          ].map((title, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs hover:border-amber-400 transition-all duration-300 relative"
            >
              <div className="w-5 h-1 bg-[#D97706] mb-3 rounded-full" />
              <span className="text-sm font-semibold text-[#1C1400] leading-snug block">
                {title}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── CARROSSEL DE VÍDEOS DE DEPOIMENTOS ── */}
      <VideoCarousel />

      {/* ── Bento Carrossel Infinito com Fotos ── */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-[#FAF6E4] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-[#FAF6E4] to-transparent" />

        <div className="overflow-hidden">
          <div
            className="bento-track"
            style={{ width: "max-content" }}
          >
            <div
              className="grid gap-3 px-4"
              style={{
                gridTemplateRows: "repeat(2, 240px)",
                gridAutoFlow: "column",
                gridAutoColumns: "220px",
              }}
            >
              {track.map((item, idx) => (
                <BentoCard
                  key={`${item.id}-${idx}`}
                  item={item}
                  onOpen={setSelected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footnote — 1ª Pessoa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12 px-4"
      >
        <p className="text-[#5C4A28] text-sm sm:text-base max-w-xl mx-auto">
          Essa é a minha aluna. Ela realiza isso toda semana — com força,
          equilíbrio e segurança.{" "}
          <strong className="text-[#1C1400]">Você também pode conquistar essa independência e autonomia comigo.</strong>
        </p>
      </motion.div>

      {/* Modal Foto */}
      <AnimatePresence>
        {selected && (
          <ImageModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
