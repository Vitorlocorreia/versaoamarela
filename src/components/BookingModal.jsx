import React, { useState, useRef } from 'react';
import { X, Calendar, Send } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function BookingModal({ isOpen, onClose, whatsappNumber = "5581986833360" }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    bairro: '',
    paraQuem: 'Para mim',
    mensagem: ''
  });
  const submitBtnRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🎉 Confetti do botão de envio
    if (submitBtnRef.current) {
      const rect = submitBtnRef.current.getBoundingClientRect();
      fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    const text = `Olá Arielle! Gostaria de agendar uma avaliação gratuita.%0A%0A*Nome:* ${encodeURIComponent(formData.nome)}%0A*WhatsApp:* ${encodeURIComponent(formData.whatsapp)}%0A*Bairro/Cidade:* ${encodeURIComponent(formData.bairro)}%0A*Perfil:* ${encodeURIComponent(formData.paraQuem)}%0A*Mensagem:* ${encodeURIComponent(formData.mensagem || 'Tenho interesse em iniciar treinos focados na saúde e mobilidade.')}`;
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF6E4] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#1C1400] hover:bg-amber-100/60 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-50 text-[#D97706] rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1400]">
              Agendar Consulta Inicial
            </h3>
            <p className="text-xs text-[#5C4A28]">Preencha os dados para conversarmos sobre você e seus objetivos</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1400] mb-1.5">
              Seu Nome Completo *
            </label>
            <input 
              type="text" 
              required
              placeholder="Ex: Maria da Silva"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-[#1C1400] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1400] mb-1.5">
                WhatsApp *
              </label>
              <input 
                type="tel" 
                required
                placeholder="(81) 98683-3360"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-[#1C1400] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1400] mb-1.5">
                Bairro / Cidade *
              </label>
              <input 
                type="text" 
                required
                placeholder="Ex: Recife, PE"
                value={formData.bairro}
                onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-[#1C1400] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1400] mb-1.5">
              O treino será para:
            </label>
            <select 
              value={formData.paraQuem}
              onChange={(e) => setFormData({...formData, paraQuem: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-[#1C1400] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm"
            >
              <option value="Para mim">Para mim mesmo(a)</option>
              <option value="Para meu pai / mãe">Para meu pai ou minha mãe</option>
              <option value="Para um casal (dupla)">Para um casal (treino em dupla)</option>
              <option value="Mentoria para Personal">Mentoria para mim (Personal Trainer)</option>
              <option value="Outro familiar">Outro familiar</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1400] mb-1.5">
              Observações ou Histórico de Saúde (Opcional)
            </label>
            <textarea 
              rows="3"
              placeholder="Ex: Dores no joelho, prótese de quadril, hipertensão..."
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-[#1C1400] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm resize-none"
            />
          </div>

          <button 
            ref={submitBtnRef}
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 transition-all text-base mt-2 active:scale-95"
          >
            <Send size={18} />
            <span>Enviar Solicitação via WhatsApp</span>
          </button>
        </form>

      </div>
    </div>
  );
}
