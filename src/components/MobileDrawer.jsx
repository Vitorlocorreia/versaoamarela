import React from 'react';
import { X, MessageCircle, Calendar } from 'lucide-react';
import Logo from './Logo';

export default function MobileDrawer({ isOpen, onClose, onOpenModal, whatsappUrl }) {
  if (!isOpen) return null;

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Programas', href: '#programas' },
    { name: 'E-book', href: '#produtos' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Dúvidas', href: '#faq' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between animate-slide-in-right border-l border-amber-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-200">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 text-[#1C1400] hover:bg-amber-50 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={onClose}
                className="text-sm font-semibold text-[#1C1400] hover:text-[#D97706] hover:bg-amber-50 px-3 py-3 rounded-xl transition-all border-b border-amber-100 last:border-b-0"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col gap-3 pt-6 border-t border-amber-200">
          <button
            onClick={() => { onClose(); onOpenModal(); }}
            className="w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 px-5 rounded-xl shadow-md shadow-amber-500/25 text-sm transition-all active:scale-95"
          >
            <Calendar size={16} />
            <span>Agendar Avaliação</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border-2 border-[#22C55E] text-[#15803D] hover:bg-green-50 font-bold py-3.5 px-5 rounded-xl text-sm text-center transition-all active:scale-95"
          >
            <MessageCircle size={16} className="text-[#22C55E]" />
            <span>Falar pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
