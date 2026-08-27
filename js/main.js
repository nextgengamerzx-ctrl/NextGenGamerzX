// 1. Web Audio API Synth Sound Effects (Zero MP3 files needed)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCyberSound(freq = 800, type = 'sine', duration = 0.05) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + duration);
  
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// 2. Custom Glowing Cyber Cursor Follower
const cursor = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className = 'cyber-cursor';
cursorRing.className = 'cyber-cursor-ring';
document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  
  cursorRing.style.left = `${e.clientX}px`;
  cursorRing.style.top = `${e.clientY}px`;
});

// Cursor expansion & Audio trigger on hover
document.querySelectorAll('a, button, .spotlight-card, .job-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
    playCyberSound(900, 'triangle', 0.04);
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
  el.addEventListener('click', () => {
    playCyberSound(400, 'sawtooth', 0.08);
  });
});

// 3. Mouse Spotlight Tracker on Cards
document.querySelectorAll('.spotlight-card, .hero-avatar-box').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3D Tilt calculation
    const tiltX = (y - rect.height / 2) / (rect.height / 2) * -7;
    const tiltY = (x - rect.width / 2) / (rect.width / 2) * 7;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// 4. Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    playCyberSound(600, 'sine', 0.06);
  });
}