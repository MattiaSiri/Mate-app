// Enhances quiz interactions
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function confettiBurst(el) {
  if (prefersReduced || typeof confetti !== 'function') return;
  const r = el.getBoundingClientRect();
  confetti({
    particleCount: 30,
    spread: 60,
    origin: {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    },
  });
  setTimeout(() => confetti.reset && confetti.reset(), 400);
}

function progressCalc() {
  const questions = document.querySelectorAll('.question[data-question]');
  const answered = Array.from(questions).filter(q => q.dataset.answered === 'true').length;
  const percent = questions.length ? Math.round((answered / questions.length) * 100) : 0;
  const bar = document.querySelector('.progress-bar');
  if (bar) bar.style.setProperty('--progress', percent + '%');
}

function setupQuestions() {
  document.querySelectorAll('.question[data-question]').forEach(group => {
    group.setAttribute('role', 'radiogroup');
    const buttons = group.querySelectorAll('button.pill');
    buttons.forEach((btn, idx) => {
      btn.classList.add('tile');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      if (idx === 0) btn.tabIndex = 0; else btn.tabIndex = -1;
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
        group.dataset.answered = 'true';
        progressCalc();
        confettiBurst(btn);
      });
      btn.addEventListener('keydown', e => {
        let target;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          target = buttons[(idx + 1) % buttons.length];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          target = buttons[(idx - 1 + buttons.length) % buttons.length];
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          btn.click();
          return;
        }
        if (target) {
          e.preventDefault();
          target.focus();
        }
      });
    });
  });
}

function setupTraits() {
  const group = document.getElementById('traits');
  if (!group) return;
  const avatar = document.querySelector('.avatar');
  const counter = document.getElementById('count');
  const max = 8;
  const stickers = [];

  function overlap(x, y) {
    return stickers.some(s => {
      const dx = parseFloat(s.style.left) - x;
      const dy = parseFloat(s.style.top) - y;
      return Math.hypot(dx, dy) < 28;
    });
  }

  function addSticker(btn) {
    if (!avatar) return;
    const icon = btn.querySelector('svg');
    if (!icon) return;
    const node = icon.cloneNode(true);
    node.classList.add('sticker');
    node.dataset.from = btn.dataset.value;
    for (let i = 0; i < 10; i++) {
      const r = avatar.clientWidth / 2 - 16;
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * r;
      const x = r + d * Math.cos(a);
      const y = r + d * Math.sin(a);
      if (!overlap(x, y)) {
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        stickers.push(node);
        avatar.appendChild(node);
        if (!prefersReduced) {
          node.animate([
            { transform: 'scale(0.6)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 },
          ], { duration: 250, fill: 'forwards' });
        }
        break;
      }
    }
  }

  function removeSticker(btn) {
    const icon = avatar.querySelector(`[data-from="${btn.dataset.value}"]`);
    if (icon) {
      const idx = stickers.indexOf(icon);
      if (idx > -1) stickers.splice(idx, 1);
      avatar.removeChild(icon);
    }
  }

  function updateCounter() {
    const selected = group.querySelectorAll('.pill.selected').length;
    counter.textContent = selected === 0 ? `0/${max} chosen` : `${selected}/${max} tratti aggiunti 🎯`;
    group.dataset.answered = selected ? 'true' : '';
    progressCalc();
  }

  group.querySelectorAll('button.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        btn.setAttribute('aria-checked', 'false');
        removeSticker(btn);
      } else {
        if (group.querySelectorAll('.pill.selected').length >= max) return;
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
        addSticker(btn);
        confettiBurst(btn);
      }
      updateCounter();
    });
  });
  updateCounter();
}

document.addEventListener('DOMContentLoaded', () => {
  setupQuestions();
  setupTraits();
  progressCalc();
});
