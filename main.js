
gsap.registerPlugin(ScrollTrigger);
 

const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
 
// Load saved
const saved = localStorage.getItem('ayaan-theme') || 'dark';
root.setAttribute('data-theme', saved);
 
themeBtn.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('ayaan-theme', isDark ? 'light' : 'dark');
});
 

const pt = document.getElementById('pageTransition');
 
window.addEventListener('load', () => {
  gsap.timeline()
    .to(pt, {
      yPercent: -100,
      duration: 1,
      delay: 0.3,
      ease: 'power4.inOut',
    })
    .set(pt, { display: 'none' })
    .then(() => {
       initAnimations();
       setTimeout(() => { ScrollTrigger.refresh(); }, 400);
    });
});
 

const cursor     = document.getElementById('cCursor');
const cursorText = document.getElementById('cCursorText');
let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;
 
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
 
(function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  if(cursor) {
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
  }
  requestAnimationFrame(animateCursor);
})();
 

document.querySelectorAll('a, button, .srv-row, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if(cursor) cursor.classList.add('expanded');
    const label = el.dataset.cursor || '';
    if(cursorText) cursorText.textContent = label;
  });
  el.addEventListener('mouseleave', () => {
    if(cursor) cursor.classList.remove('expanded');
    if(cursorText) cursorText.textContent = '';
  });
});
 

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if(header) header.classList.toggle('scrolled', window.scrollY > 60);
});
 

const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
 
if(burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
}
 
function closeMobile() {
  if(burger && mobileMenu) {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
  }
}
 

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if(scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});
if(scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
 

function initAnimations() {
 
  
  if(document.getElementById('h1l1')) {
    gsap.from('#h1l1', { yPercent: 110, duration: 1.1, ease: 'power4.out', delay: 0.1 });
  }
  if(document.getElementById('h1l2')) {
    gsap.from('#h1l2', { yPercent: 110, duration: 1.1, ease: 'power4.out', delay: 0.22 });
  }
  if(document.getElementById('h1l3')) {
    gsap.from('#h1l3', { yPercent: 110, duration: 1.1, ease: 'power4.out', delay: 0.34 });
  }
 
  
  if(document.getElementById('heroPhoto')) {
    gsap.from('#heroPhoto', { scale: 0.7, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.5 });
  }
 
  gsap.from(['#heroDesc', '#heroActions', '#heroScroll'], {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.7,
  });
 
  
  gsap.from('.hero__meta > *', {
    y: 16,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.4,
  });
 
  
  ScrollTrigger.config({ ignoreMobileResize: true });

  
  gsap.utils.toArray('.reveal-up').forEach((el) => {
      if (el.classList.contains('proc-step')) return;

      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
      });
  });

 
  gsap.utils.toArray('.process-grid-trigger').forEach((triggerGrid) => {
      const steps = triggerGrid.querySelectorAll('.proc-step');
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
          gsap.to(steps, {
              scrollTrigger: {
                  trigger: triggerGrid,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                  once: true
              },
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              onComplete: () => {
                  gsap.set(steps, { clearProps: "transform,opacity" });
                  steps.forEach(s => s.style.opacity = "1");
              }
          });
      } else {
          steps.forEach((step, index) => {
              gsap.to(step, {
                  scrollTrigger: {
                      trigger: triggerGrid,
                      start: 'top 82%',
                      toggleActions: 'play none none none',
                      once: true
                  },
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: 'power3.out',
                  onComplete: () => {
                      gsap.set(step, { clearProps: "transform,opacity" });
                      step.style.opacity = "1";
                  }
              });
          });
      }
  });

  
  gsap.utils.toArray('.reveal-text').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
  });

  
  document.querySelectorAll('.skill-item').forEach((item, i) => {
    const fill = item.querySelector('.si-fill');
    const pct  = item.dataset.pct || '70';
 
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out' });
        gsap.to(fill, { width: pct + '%', duration: 1.4, delay: i * 0.08 + 0.2, ease: 'power3.out' });
      },
    });
  });
 
 
  const aboutPhoto = document.querySelector('.about__photo-wrap img');
  if (aboutPhoto) {
    gsap.to(aboutPhoto, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -60,
      ease: 'none',
    });
  }
 
  
  gsap.utils.toArray('.srv-row').forEach((row, i) => {
    const isMobile = window.innerWidth <= 768;
    
    gsap.fromTo(row, 
      {
        x: isMobile ? 0 : -30, 
        y: isMobile ? 20 : 0, 
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: row,
          start: isMobile ? 'top 95%' : 'top 90%', 
          toggleActions: 'play none none none',
          once: true // 
        },
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: isMobile ? 0 : i * 0.08, 
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(row, { clearProps: "transform,opacity" });
          row.style.opacity = "1";
        }
      }
    );
  });
 
  
  const contactBig = document.getElementById('contactBig') || document.querySelector('.contact__big-text');
  if (contactBig) {
    gsap.to(contactBig, {
        scrollTrigger: {
          trigger: contactBig,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      });
  }
 
  
  gsap.utils.toArray('.section__title').forEach((title) => {
    gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
    });
  });

  
  gsap.to('.work-featured', {
    scrollTrigger: {
      trigger: '.work-featured',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power4.out',
  });
 
  
  gsap.utils.toArray('.testi-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });
 
  
  gsap.utils.toArray('.fact').forEach((f, i) => {
    gsap.from(f, {
      scrollTrigger: {
        trigger: f,
        start: 'top 88%',
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });
 
  
  if(document.getElementById('heroPhoto')) {
    gsap.to('#heroPhoto', {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });
  }
 
 
  let lastScroll = 0;
  const track = document.querySelector('.marquee__track');
  if(track) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      const dir = current > lastScroll ? 1 : -1;
      track.style.animationDirection = dir === 1 ? 'normal' : 'reverse';
      lastScroll = current;
    }, { passive: true });
  }
}
 

/* ════════════════════════════════
   CONTACT FORM (FormSubmit Integration)
════════════════════════════════ */
async function submitForm(e) {
  if (e) e.preventDefault();
 
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();
  const out   = document.getElementById('form-msg');
  const form  = document.getElementById('contact-form'); // HTML form reference
 
  if (!name || !email || !msg) {
    if(out) {
      out.style.color = '#f87171';
      out.textContent = 'Please fill in all required fields.';
    }
    return false;
  }
 
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    if(out) {
      out.style.color = '#f87171';
      out.textContent = 'Please enter a valid email address.';
    }
    return false;
  }

  // Loading State
  if(out) {
    out.style.color = '#eab308';
    out.textContent = 'Sending message...';
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      if(out) {
        out.style.color = '#4ade80';
        out.textContent = '✓ Message sent! Ayaan will reply within 24 hours.';
      }
      // Fields clear kar do
      document.getElementById('cf-name').value  = '';
      document.getElementById('cf-email').value = '';
      document.getElementById('cf-msg').value   = '';
    } else {
      throw new Error('FormSubmit error');
    }
  } catch (error) {
    if(out) {
      out.style.color = '#f87171';
      out.textContent = 'Oops! There was a problem sending your message.';
    }
  }
 
  setTimeout(() => { if(out) out.textContent = ''; }, 6000);
  return false;
}

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-item');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.style.color = isActive ? 'var(--text)' : '';
  });
}, { passive: true });