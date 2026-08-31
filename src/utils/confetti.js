/**
 * confetti.js — Efeito de confetti canvas sem dependência externa.
 * Dispara partículas coloridas do ponto de origem (botão Agendar).
 */

const COLORS = ['#D97706', '#F59E0B', '#1C1400', '#93C5FD', '#BFDBFE', '#FCD34D', '#6EE7B7'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function fireConfetti(originX, originY) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; inset: 0; width: 100vw; height: 100vh;
    z-index: 9999; pointer-events: none;
  `;
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const PARTICLE_COUNT = 90;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = random(-Math.PI, Math.PI);
    const speed = random(4, 14);
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - random(2, 8),
      color: COLORS[Math.floor(random(0, COLORS.length))],
      size: random(6, 14),
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-0.25, 0.25),
      opacity: 1,
      gravity: random(0.18, 0.35),
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }

  let frame;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, p.opacity - 0.016);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (alive) {
      frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  };

  frame = requestAnimationFrame(animate);
}
