export function fire(x: number, y: number) {
  if (typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.pointerEvents = 'none';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: Array<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    life: number;
    color: string;
  }> = [];

  const colors = ['#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'];
  for (let i = 0; i < 25; i++) {
    particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 1.5) * 6,
      size: Math.random() * 6 + 4,
      life: 400,
      color: colors[i % colors.length],
    });
  }

  let prev = performance.now();
  function draw(time: number) {
    const dt = time - prev;
    prev = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.1;
      p.life -= dt;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    if (particles.some((p) => p.life > 0)) {
      requestAnimationFrame(draw);
    } else {
      document.body.removeChild(canvas);
    }
  }
  requestAnimationFrame(draw);
}
