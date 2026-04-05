document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MOUSE SPOTLIGHT GLOW --- */
    const rootElement = document.documentElement;
    window.addEventListener('mousemove', (e) => {
        rootElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        rootElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });

    /* --- 2. THEME TOGGLE --- */
    const btn = document.getElementById('settings-btn');
    const dropdown = document.getElementById('settings-dropdown');
    const toggle = document.getElementById('theme-toggle');

    if (btn && dropdown && toggle) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                btn.classList.remove('open');
            }
        });

        const savedTheme = localStorage.getItem('cinematic-theme');
        if (savedTheme === 'light') {
            rootElement.setAttribute('data-theme', 'light');
            toggle.checked = true; 
        } else {
            rootElement.setAttribute('data-theme', 'dark');
            toggle.checked = false;
        }

        toggle.addEventListener('change', () => {
            const newTheme = toggle.checked ? 'light' : 'dark';
            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('cinematic-theme', newTheme);
        });
    }

    /* --- 3. APPLE-STYLE REVERSIBLE SCROLL REVEALS --- */
    const animatedElements = document.querySelectorAll('.scroll-animate, .project-card, .timeline-item');
    if (animatedElements.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(element => {
            element.classList.add('scroll-animate');
            intersectionObserver.observe(element);
        });
    }

    /* --- 4. DYNAMIC PARALLAX HERO SCRUBBING --- */
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                const opacity = 1 - (scroll / 600);
                const transform = scroll * 0.2;
                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${transform}px)`;
            }
        }, { passive: true });
    }

    /* --- 5. NAVIGATION SCROLL SPY --- */
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    /* --- 6. TIMELINE LOGIC --- */
    const timelineContainer = document.getElementById('timeline-list');
    if (timelineContainer) {
        timelineContainer.addEventListener('click', (event) => {
            const trigger = event.target.closest('.timeline-trigger');
            if (!trigger || !timelineContainer.contains(trigger)) return;

            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const contentId = trigger.getAttribute('aria-controls');
            const contentElement = document.getElementById(contentId);

            if (!contentElement) return;

            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                contentElement.setAttribute('aria-hidden', 'true');
                contentElement.style.maxHeight = '0px';
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                contentElement.setAttribute('aria-hidden', 'false');
                contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
            }
        });

        const updatePointer = () => {
            const items = document.querySelectorAll('.timeline-item');
            if (items.length === 0) return;

            const lastItem = items[items.length - 1];
            const lastDotY = lastItem.offsetTop + 56; 
            timelineContainer.style.setProperty('--line-height', `${lastDotY}px`);

            const rect = timelineContainer.getBoundingClientRect();
            const startScrollDist = (window.innerHeight / 2) - rect.top;
            let progress = Math.max(0, Math.min(startScrollDist, lastDotY));
            
            const pointer = document.getElementById('timeline-pointer');
            if (pointer) {
                pointer.style.transform = `translateY(${progress}px)`;
            }

            items.forEach(item => {
                if (progress >= item.offsetTop + 30) {
                    item.classList.add('passed');
                } else {
                    item.classList.remove('passed');
                }
            });
        };

        window.addEventListener('scroll', updatePointer, { passive: true });
        window.addEventListener('resize', updatePointer, { passive: true });
        timelineContainer.addEventListener('click', () => setTimeout(updatePointer, 400)); 
        updatePointer();
    }

    /* --- 7. PROJECTS FILTER WITH AUTO-SCROLL --- */
    const filterControls = document.getElementById('filter-controls');
    const projectsGallery = document.getElementById('projects-gallery');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const projectsHeader = document.querySelector('.projects-header'); 
    
    if (filterControls && projectsGallery && clearFiltersBtn) {
        const filterBtns = filterControls.querySelectorAll('.filter-btn:not(.clear-btn)');
        const projectCardsFilter = projectsGallery.querySelectorAll('.project-card');
        let activeTags = []; 

        const applyFilters = () => {
            projectCardsFilter.forEach(card => card.classList.remove('is-flipped'));

            filterBtns.forEach(btn => {
                if (activeTags.includes(btn.dataset.tag)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            setTimeout(() => {
                projectCardsFilter.forEach(card => {
                    if (activeTags.length === 0) {
                        card.style.display = ''; 
                        return;
                    }
                    const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(t => t.trim()) : [];
                    const matches = activeTags.some(tag => cardTags.includes(tag));
                    card.style.display = matches ? '' : 'none'; 
                });
            }, 50);

            if (activeTags.length > 0) {
                clearFiltersBtn.style.display = 'inline-block';
            } else {
                clearFiltersBtn.style.display = 'none';
            }
        };

        filterControls.addEventListener('click', (event) => {
            const btn = event.target.closest('.filter-btn');
            if (!btn) return;

            if (btn.id === 'clear-filters') {
                activeTags = [];
            } else {
                const tag = btn.dataset.tag;
                if (activeTags.includes(tag)) {
                    activeTags = activeTags.filter(t => t !== tag);
                } else {
                    activeTags.push(tag);
                }
            }
            applyFilters();
            
            if (projectsHeader) {
                const yOffset = projectsHeader.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: yOffset, behavior: 'smooth' });
            }
        });

        projectsGallery.addEventListener('click', (event) => {
            const flipBtn = event.target.closest('.flip-trigger');
            if (flipBtn) {
                flipBtn.closest('.project-card').classList.toggle('is-flipped');
            }
        });
    }
});