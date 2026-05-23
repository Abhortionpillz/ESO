 // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // ── Theme toggle ──
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = stored || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', theme);
    updateThemeIcon();

    function updateThemeIcon() {
      document.getElementById('theme-icon').textContent = theme === 'dark' ? '☀' : '☽';
    }

    document.getElementById('theme-toggle').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon();
    });

    // ── Navbar scroll ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      highlightNav();
    }, { passive: true });

    // ── Active nav ──
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sections = ['hero','about','skills','projects','experience','contact'];

    function highlightNav() {
      let current = 'hero';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      });
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }

    // ── Smooth scroll nav links ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          document.getElementById('mobile-menu').classList.remove('open');
          document.getElementById('menu-icon').textContent = '☰';
          document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
        }
      });
    });

    // ── Mobile menu ──
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      document.getElementById('menu-icon').textContent = open ? '✕' : '☰';
      menuBtn.setAttribute('aria-expanded', open.toString());
    });

    // ── Typewriter ──
    const roles = ['Web Developer', 'Virtual Assistant', 'AI Enthusiast'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const tw = document.getElementById('typewriter-text');

    function typeLoop() {
      const current = roles[roleIdx];
      if (!deleting) {
        tw.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; return setTimeout(typeLoop, 2200); }
      } else {
        tw.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; return setTimeout(typeLoop, 300); }
      }
      setTimeout(typeLoop, deleting ? 45 : 80);
    }
    setTimeout(typeLoop, 500);

    // ── Scroll reveal ──
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '-60px 0px' });
    reveals.forEach(el => observer.observe(el));

    // ── Skill bar animation ──
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach(fill => {
            fill.style.width = fill.dataset.width + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

    // ── Contact form ──
    document.getElementById('form-submit').addEventListener('click', handleSubmit);

    function handleSubmit() {
      const name = document.getElementById('form-name');
      const email = document.getElementById('form-email');
      const message = document.getElementById('form-message');
      let valid = true;

      // Reset
      [name, email, message].forEach(f => { f.classList.remove('error'); });
      ['error-name','error-email','error-message'].forEach(id => { document.getElementById(id).textContent = ''; });

      if (!name.value.trim()) { showError(name, 'error-name', 'Name is required'); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'error-email', 'Valid email is required'); valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'error-message', 'Message must be at least 10 characters'); valid = false;
      }

      if (!valid) return;

      const btn = document.getElementById('form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('success-box').classList.add('show');
      }, 1400);
    }

    function showError(input, errId, msg) {
      input.classList.add('error');
      document.getElementById(errId).textContent = msg;
    }

    function resetForm() {
      document.getElementById('contact-form').style.display = 'flex';
      document.getElementById('success-box').classList.remove('show');
      ['form-name','form-email','form-message'].forEach(id => { document.getElementById(id).value = ''; });
      document.getElementById('form-submit').textContent = 'Send Message ↗';
      document.getElementById('form-submit').disabled = false;
    }