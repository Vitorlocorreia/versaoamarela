import React, { useEffect, useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

export default function StickyMobileBar({ onOpenModal, whatsappUrl }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio') || document.querySelector('section');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mostra a barra quando o Hero SAI da tela (igual ao FloatingWhatsApp)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 p-3 flex items-center gap-2.5 shadow-2xl transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        onClick={onOpenModal}
        className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#D97706] active:bg-[#B45309] text-white rounded-xl font-bold text-xs shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
      >
        <Calendar size={17} />
        <span>Agendar Consulta Inicial</span>
      </button>

      <a
        href={whatsappUrl || "https://wa.me/5581986833360"}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-[#22C55E] active:bg-[#16A34A] text-white rounded-xl shadow-md shadow-green-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
