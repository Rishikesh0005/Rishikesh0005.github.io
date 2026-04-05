document.addEventListener('DOMContentLoaded', function() {
            // Char split hero name
            const heroName = document.querySelector('.hero-name');
            const text = heroName.textContent;
            heroName.innerHTML = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 50}ms`;
                heroName.appendChild(span);
            });

            // Nav glass effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Hamburger menu
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const links = document.querySelectorAll('.nav-links li a');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('nav-active');
                hamburger.classList.toggle('toggle');
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                     navLinks.classList.remove('nav-active');
                     hamburger.classList.remove('toggle');
                });
            });

            // Scroll reveal & Stat Counter
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        const statNumbers = entry.target.querySelectorAll('.stat-number');
                        statNumbers.forEach(statNumber => {
                            if (!statNumber.classList.contains('counted')) {
                               statNumber.classList.add('counted');
                               const target = +statNumber.getAttribute('data-target');
                               let current = 0;
                               const increment = target / 100;

                               const updateCount = () => {
                                   if (current < target) {
                                       current += increment;
                                       statNumber.innerText = Math.ceil(current);
                                       requestAnimationFrame(updateCount);
                                   } else {
                                       statNumber.innerText = target;
                                   }
                               };
                               setTimeout(updateCount, 300);
                            }
                        });
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal, .timeline-item, .project-card, .education-item').forEach(el => observer.observe(el));

            // Tilt card effect
            const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (!isTouchDevice()) {
                document.querySelectorAll('.tilt-card').forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const { left, top, width, height } = card.getBoundingClientRect();
                        const x = (e.clientX - left - width / 2) / (width/2);
                        const y = (e.clientY - top - height / 2) / (height/2);
                        const rotateX = y * 5;
                        const rotateY = -x * 5;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                    });
                });
            }
        });