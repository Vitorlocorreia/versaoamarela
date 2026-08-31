import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Signature({ className = "", width = 310, height = 80, color = "#1C1400" }) {
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1
    });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 3.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        toggleActions: "play none none none"
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`inline-block relative ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 310 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Authentic Handwritten Pen-stroke Path for "Arielle Martins" */}
        <path
          ref={pathRef}
          d="
            M 18 54 C 12 36, 24 12, 38 12 C 52 12, 44 38, 30 64
            M 22 45 Q 46 42 58 46
            C 62 38, 68 38, 72 48
            C 76 38, 80 38, 82 52
            M 81 24 A 2 2 0 1 1 81 20
            C 85 40, 92 40, 95 50
            C 98 25, 102 12, 105 52
            C 108 25, 112 12, 115 52
            C 118 40, 125 40, 128 50
            M 152 56 L 158 18 C 168 14, 178 35, 182 54 C 190 20, 200 35, 204 54
            C 208 42, 215 42, 220 54
            C 224 44, 228 44, 232 52
            C 236 25, 238 18, 240 52
            M 230 28 L 248 26
            C 244 44, 248 44, 252 52
            M 251 24 A 2 2 0 1 1 251 20
            C 255 42, 260 44, 264 54 C 268 44, 274 44, 278 54
            C 282 46, 288 42, 292 48 C 295 54, 302 54, 306 50
          "
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />
      </svg>
      <span className="block text-[10px] uppercase font-bold tracking-[0.18em] text-[#D97706] mt-0.5">
        Arielle Martins • Personal Trainer
      </span>
    </div>
  );
}
