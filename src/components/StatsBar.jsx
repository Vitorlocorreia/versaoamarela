import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Star, Globe } from 'lucide-react';

/* ── Componente de número animado ── */
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isPlus = String(target).startsWith('+');
          const numTarget = parseFloat(String(target).replace('+', ''));

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * numTarget);
            setCount((isPlus ? '+' : '') + current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target + suffix);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return <span ref={ref}>{count || '0'}</span>;
}

export default function StatsBar() {
  const stats = [
    {
      icon: <Users className="w-5 h-5 text-[#D97706]" />,
      val: '+300',
      suffix: '',
      label: 'Alunos atendidos'
    },
    {
      icon: <Award className="w-5 h-5 text-[#D97706]" />,
      val: '5',
      suffix: ' Anos',
      label: 'De experiência'
    },
    {
      icon: <Star className="w-5 h-5 text-[#D97706]" />,
      val: '5.0',
      suffix: '★',
      label: 'Avaliação dos alunos'
    },
    {
      icon: <Globe className="w-5 h-5 text-[#D97706]" />,
      val: '100',
      suffix: '%',
      label: 'Online e presencial'
    }
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 mb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-4 sm:py-5 sm:px-8 border border-amber-200 shadow-xl shadow-amber-950/5 grid grid-cols-2 md:grid-cols-4 gap-6 items-center relative z-10">
          {stats.map((st, i) => (
            <div key={i} className="flex items-center gap-3 justify-start sm:justify-center border-r last:border-r-0 border-gray-100 pr-2">
              <div className="p-2.5 rounded-full bg-amber-50/80 shrink-0">
                {st.icon}
              </div>
              <div className="flex flex-col text-xs sm:text-sm">
                <span className="font-bold text-[#1C1400] leading-tight text-base sm:text-lg tabular-nums">
                  <CountUp target={st.val} suffix={st.suffix} duration={1800} />
                </span>
                <span className="text-[#64748B] text-[11px] sm:text-xs mt-0.5">{st.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
