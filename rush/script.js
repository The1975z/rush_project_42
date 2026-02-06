document.addEventListener('DOMContentLoaded', function () {
    var hamburgers = document.querySelectorAll('.cv-nav__hamburger');
    var mobileMenus = document.querySelectorAll('.cv-nav__mobile-menu');

    hamburgers.forEach(function (hamburger, index) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            if (mobileMenus[index]) {
                mobileMenus[index].classList.toggle('active');
            }
        });
    });

    document.querySelectorAll('.cv-nav__mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburgers.forEach(function (h) { h.classList.remove('active'); });
            mobileMenus.forEach(function (m) { m.classList.remove('active'); });
        });
    });

    var navLinks = document.querySelectorAll('.cv-nav__link');
    var sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    if (sections.length > 0) {
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cv-exp-item').forEach(function (item) {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });

    document.querySelectorAll('.cv-cert-card').forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';
        var certObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        certObserver.observe(card);
    });

    document.querySelectorAll('.cv-skill-card').forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        card.style.transition = 'opacity 0.4s ease ' + (i * 0.04) + 's, transform 0.4s ease ' + (i * 0.04) + 's, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
        var skillObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        skillObserver.observe(card);
    });

    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
        var currentLang = localStorage.getItem('lang') || 'en';
        var toggleText = langToggle.querySelector('.lang-toggle__text');

        function applyLang(lang) {
            currentLang = lang;
            localStorage.setItem('lang', lang);
            toggleText.textContent = lang === 'en' ? 'TH' : 'EN';
            langToggle.setAttribute('data-current', lang);
            document.documentElement.lang = lang === 'en' ? 'en' : 'th';

            document.querySelectorAll('[data-en][data-th]').forEach(function (el) {
                var text = el.getAttribute('data-' + lang);
                if (text) {
                    if (el.children.length === 0) {
                        el.textContent = text;
                    } else {
                        el.innerHTML = text;
                    }
                }
            });
        }

        applyLang(currentLang);

        langToggle.addEventListener('click', function () {
            var newLang = currentLang === 'en' ? 'th' : 'en';
            applyLang(newLang);
        });
    }

    var heroPhoto = document.getElementById('heroPhoto');
    var photoModal = document.getElementById('photoModal');
    var modalClose = document.getElementById('modalClose');

    if (heroPhoto && photoModal) {
        heroPhoto.addEventListener('click', function () {
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeModal() {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        photoModal.querySelector('.photo-modal__backdrop').addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
