document.addEventListener('DOMContentLoaded', function() {

        // ----------------------------------
        // SYSTEM 1: CINEMATIC HERO ENTRANCE
        // ----------------------------------
        document.querySelectorAll('.hero-name').forEach(function(el) {
            var originalText = el.textContent.trim();
            if (!originalText) return;
            el.innerHTML = originalText.split('').map(function(letter, i) {
                const delay = (i * 0.04 + 0.4);
                return `<span class="char" style="animation-delay:${delay}s;">${letter === ' ' ? '&nbsp;' : letter}</span>`;
            }).join('');
        });
        setTimeout(function() {
            document.querySelectorAll('.char').forEach(function(c) {
                c.style.opacity = '1'; c.style.transform = 'none';
                var col = window.getComputedStyle(c).color;
                if (!col || col === 'transparent' || col === 'rgba(0, 0, 0, 0)') {
                    c.style.setProperty('color', 'var(--text, #ffffff)', 'important');
                    c.style.setProperty('-webkit-text-fill-color', 'var(--text, #ffffff)', 'important');
                }
            });
        }, 3000);

        // -----------------------------------
        // SYSTEM 2: SCROLL-TRIGGERED REVEALS
        // -----------------------------------
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate').forEach(el => {
            el.classList.add('playful');
            revealObserver.observe(el);
        });

        // -----------------------------------
        // SYSTEM 4: MOUSE PARALLAX
        // -----------------------------------
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX / window.innerWidth - 0.5);
            mouseY = (e.clientY / window.innerHeight - 0.5);
            document.querySelectorAll('[data-speed]').forEach(el => {
                const s = parseFloat(el.dataset.speed) || 0.5;
                el.style.transform = 'translate(' + (mouseX * s * -50) + 'px, ' + (mouseY * s * -50) + 'px)';
            });
        });

        // -----------------------------------
        // SYSTEM 5: STAT COUNTER ANIMATION
        // -----------------------------------
        function animateCounter(el) {
            var rawTarget = el.dataset.target || el.textContent.match(/[0-9.]+/)?.[0] || '0';
            var target = parseFloat(rawTarget);
            var suffix = el.dataset.suffix || el.textContent.replace(/[0-9.]/g, '') || '';
            var dur = 1800;
            var startTime = performance.now();
            var easeOut = t => 1 - Math.pow(1 - t, 3);
            function tick(now) {
                var t = Math.min((now - startTime) / dur, 1);
                var val = Math.round(target * easeOut(t));
                el.textContent = val + suffix;
                if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCounter(e.target);
                    counterObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

        // -----------------------------------
        // SYSTEM 6: GLASSMORPHISM NAV
        // -----------------------------------
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.cssText = 'background:rgba(var(--bgRgb),0.7); backdrop-filter:blur(15px); -webkit-backdrop-filter:blur(15px); box-shadow:0 1px 20px rgba(0,0,0,0.1);';
            } else {
                nav.style.cssText = 'background:transparent; backdrop-filter:none; box-shadow:none;';
            }
        });

        // CARD HOVER TILT - combined with card flip css
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                if (card.style.transform.includes('rotateY')) return;
                const r = card.getBoundingClientRect();
                const rx = ((e.clientX - r.left) / r.width - 0.5) * 6; // reduced tilt for playful style
                const ry = ((e.clientY - r.top) / r.height - 0.5) * -6;
                card.style.transform = 'perspective(1000px) rotateX(' + ry + 'deg) rotateY(' + rx + 'deg) translateY(-10px) scale(1.01)';
            });
            card.addEventListener('mouseleave', () => {
                if (card.style.transform.includes('rotateY')) return;
                card.style.transform = '';
            });
        });
        
        // PAGE PROGRESS BAR
        const bar = document.querySelector('.progress-bar');
        window.addEventListener('scroll', () => {
            const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            bar.style.width = pct + '%';
        }, { passive: true });

        // CUSTOM CURSOR
        const cursorInner = document.querySelector('.custom-cursor-inner');
        const cursorOuter = document.querySelector('.custom-cursor-outer');
        let innerX = 0, innerY = 0, outerX = 0, outerY = 0;
        document.addEventListener('mousemove', e => {
            innerX = e.clientX;
            innerY = e.clientY;
            cursorInner.style.left = `${innerX}px`;
            cursorInner.style.top = `${innerY}px`;
        });
        function animateOuterCursor() {
            outerX += (innerX - outerX) * 0.15;
            outerY += (innerY - outerY) * 0.15;
            cursorOuter.style.left = `${outerX}px`;
            cursorOuter.style.top = `${outerY}px`;
            requestAnimationFrame(animateOuterCursor);
        }
        animateOuterCursor();
        document.body.style.cursor = 'none';

    });
    
(function(){
  var nav=document.querySelector('nav,[class*="nav"],[class*="header"]');
  if(nav){
    window.addEventListener('scroll',function(){
      if(window.scrollY>60){nav.style.background='rgba(0,0,0,0.85)';nav.style.backdropFilter='blur(20px)';nav.style.boxShadow='0 4px 30px rgba(0,0,0,0.15)';}
      else{nav.style.background='transparent';nav.style.backdropFilter='none';nav.style.boxShadow='none';}
    });
  }
})();