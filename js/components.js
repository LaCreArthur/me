/**
 * Portfolio Components - Render functions for each section
 * These functions transform DATA into HTML
 */

// ===== UTILITY FUNCTIONS =====

function renderHeadline(lines, highlightLine, extraClasses = '') {
    return lines.map((line, i) =>
        i === highlightLine
            ? `<span class="text-teal-400">${line}</span>`
            : line
    ).join('<br>');
}

// ===== NAVIGATION =====

function renderNav(data) {
    const { logo, links, resumeUrl } = data.nav;

    const navLinks = links.map(link =>
        `<a href="${link.href}" class="hover:text-teal-400">${link.label}</a>`
    ).join('');

    const mobileLinks = links.map(link =>
        `<a href="${link.href}" class="block py-2 text-gray-500 hover:text-teal-400">> ${link.label}</a>`
    ).join('');

    return `
    <nav class="bg-black fixed top-0 left-0 right-0 z-50 border-b border-[#222]">
        <div class="max-w-6xl mx-auto px-4 md:px-8">
            <div class="flex items-center justify-between h-14">
                <a href="#" class="text-white text-sm tracking-widest uppercase">${logo}</a>

                <div class="nav-brutal hidden md:flex items-center gap-8 text-sm text-gray-500">
                    ${navLinks}
                    <a href="${resumeUrl}" class="btn-brutal text-xs px-4 py-2">Resume</a>
                </div>

                <button onclick="toggleMenu()" class="md:hidden p-2 text-teal-400">
                    <span class="text-xl">[=]</span>
                </button>
            </div>

            <div id="mobile-menu" class="mobile-menu md:hidden pb-4 border-t border-[#222] mt-2 pt-4">
                ${mobileLinks}
                <a href="${resumeUrl}" class="block py-2 text-gray-500 hover:text-teal-400">> Resume</a>
            </div>
        </div>
    </nav>`;
}

// ===== HERO SECTION =====

function renderHero(data) {
    const { terminal, headline, highlightLine, subhead, metrics, cta, socials } = data.hero;

    const metricsHtml = metrics.map(m => `
        <div class="metric">
            <div class="metric-number">${m.value}</div>
            <div class="metric-label">${m.label}</div>
        </div>
    `).join('');

    const socialsHtml = socials.map(s =>
        `<a href="${s.href}" class="raw-link hover:text-teal-400">${s.label}</a>`
    ).join('');

    return `
    <section class="min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 md:px-8">
        <div class="max-w-6xl mx-auto w-full">
            <div class="text-teal-400 text-sm mb-4 tracking-widest">${terminal}</div>

            <h1 class="headline text-white mb-6">
                ${renderHeadline(headline, highlightLine)}
            </h1>

            <p class="subhead max-w-xl mb-12">${subhead}</p>

            <div class="flex flex-wrap gap-8 md:gap-12 mb-12">
                ${metricsHtml}
            </div>

            <div class="flex flex-wrap gap-4 mb-12">
                <a href="${cta.primary.href}" class="btn-brutal-filled glitch-hover">${cta.primary.label}</a>
                <a href="${cta.secondary.href}" class="btn-brutal">${cta.secondary.label}</a>
            </div>

            <div class="flex gap-6 text-sm text-gray-600">
                ${socialsHtml}
            </div>
        </div>
    </section>`;
}

// ===== MARQUEE =====

function renderMarquee(data) {
    const items = data.marquee.items;
    const content = items.join(' · ');
    // Repeat 3x for seamless loop
    const repeated = `${content} · ${content} · ${content} · `;

    return `
    <div class="marquee py-3 text-gray-600 text-xs">
        <div class="marquee-content">${repeated}</div>
    </div>`;
}

// ===== PROJECT CARD =====

function renderProjectMedia(media) {
    if (media.type === 'image') {
        return `
        <div class="video-raw aspect-video flex items-center justify-center scanlines">
            <div class="text-center p-4">
                <img src="${media.src}" alt="${media.alt}" class="w-20 h-20 mx-auto mb-4">
                <p class="text-gray-600 text-xs uppercase tracking-widest">${media.placeholder}</p>
            </div>
        </div>`;
    }

    if (media.type === 'video') {
        return `
        <a href="${media.href}" target="_blank" class="video-raw aspect-video flex items-center justify-center scanlines group">
            <div class="text-center">
                <div class="w-16 h-16 border-2 border-teal-400 flex items-center justify-center mb-3 group-hover:bg-teal-400 transition-colors">
                    <svg class="w-8 h-8 text-teal-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p class="text-teal-400 text-xs uppercase tracking-widest group-hover:underline">${media.placeholder}</p>
            </div>
        </a>`;
    }

    if (media.type === 'code') {
        const linesHtml = media.lines.map(line => {
            let text = line.text;
            if (line.highlight) {
                text = text.replace(line.highlight, `<span class="text-teal-400">${line.highlight}</span>`);
            }
            return `<p class="${line.class}">${text}</p>`;
        }).join('');

        return `
        <div class="video-raw aspect-video p-4 text-xs text-left overflow-hidden">
            ${linesHtml}
        </div>`;
    }

    return '';
}

function renderProjectCard(project) {
    const tagsHtml = project.tags.map(tag =>
        `<span class="tag-raw ${tag.highlight ? 'text-teal-400 border-teal-400' : 'text-gray-400'}">${tag.label}</span>`
    ).join('');

    const bulletsHtml = project.bullets.map(b =>
        `<p><span class="text-teal-400">></span> ${b.prefix} ${b.text}</p>`
    ).join('');

    const linksHtml = project.links.map(link =>
        `<a href="${link.href}" target="_blank" class="raw-link">[${link.label}]</a>`
    ).join('');

    return `
    <article class="project-card p-6 md:p-8 mb-8 relative">
        <span class="big-index">${project.id}</span>
        <div class="grid md:grid-cols-2 gap-8 relative z-10">
            ${renderProjectMedia(project.media)}
            <div>
                <div class="flex items-start gap-3 mb-4">
                    <h3 class="text-xl md:text-2xl font-bold text-white uppercase">${project.title}</h3>
                    ${tagsHtml}
                </div>
                <div class="space-y-3 text-sm text-gray-400 mb-6">
                    ${bulletsHtml}
                    <p class="text-gray-600">${project.meta}</p>
                </div>
                <div class="flex flex-wrap gap-3 text-xs">
                    ${linksHtml}
                </div>
            </div>
        </div>
    </article>`;
}

// ===== WORK SECTION =====

function renderWork(data) {
    const { sectionMarker, headline, highlightLine } = data.work;
    const projectsHtml = data.projects.map(renderProjectCard).join('');

    return `
    <section id="work" class="py-20 px-4 md:px-8">
        <div class="max-w-6xl mx-auto">
            <div class="section-marker">${sectionMarker}</div>
            <h2 class="headline text-white text-3xl sm:text-4xl md:text-5xl mb-16">
                ${renderHeadline(headline, highlightLine)}
            </h2>
            ${projectsHtml}
        </div>
    </section>`;
}

// ===== ARCHIVE SECTION =====

function renderArchive(data) {
    const { sectionMarker, headline, mobileGames, categories } = data.archive;

    const mobileGamesHtml = mobileGames.items.map(game => `
        <a href="${game.href}" class="group text-center">
            <img src="${game.img}" alt="${game.alt}" class="w-14 h-14 mx-auto border border-[#333] group-hover:border-teal-400 transition-colors">
            <p class="mt-2 text-xs text-gray-600 group-hover:text-teal-400">${game.label}</p>
        </a>
    `).join('');

    const categoriesHtml = categories.map(cat => `
        <div>
            <h3 class="text-xs text-gray-600 uppercase tracking-widest mb-4">${cat.title}</h3>
            <div class="space-y-2">
                ${cat.items.map(item => `
                    <a href="${item.href}" target="_blank" class="work-card block p-3">
                        <span class="text-white">${item.title}</span>
                        <span class="block text-gray-600 text-xs">${item.subtitle}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `
    <section class="py-16 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="section-marker">${sectionMarker}</div>
            <h2 class="text-2xl font-bold text-white uppercase mb-12">${headline}</h2>

            <div class="mb-12">
                <h3 class="text-xs text-gray-600 uppercase tracking-widest mb-4">${mobileGames.title}</h3>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    ${mobileGamesHtml}
                </div>
                <p class="mt-4">
                    <a href="${mobileGames.more.href}" class="raw-link text-xs">[${mobileGames.more.label}]</a>
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 text-sm">
                ${categoriesHtml}
            </div>
        </div>
    </section>`;
}

// ===== ABOUT SECTION =====

function renderAbout(data) {
    const { sectionMarker, headline, highlightLine, bio, bioExtra, photo, name, location, timeline } = data.about;

    const timelineHtml = timeline.map(item => `
        <div class="flex gap-4 ${item.current ? 'border-l-2 border-teal-400' : 'border-l border-[#333]'} pl-4">
            <span class="${item.current ? 'text-teal-400' : 'text-gray-600'} w-16 shrink-0">${item.years}</span>
            <div>
                <p class="text-white">${item.role}</p>
                <p class="text-gray-600">${item.company}</p>
            </div>
        </div>
    `).join('');

    return `
    <section id="about" class="py-20 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <div class="section-marker">${sectionMarker}</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white uppercase mb-8">
                        ${renderHeadline(headline, highlightLine)}
                    </h2>

                    <div class="terminal-box p-6 mb-6">
                        <p class="text-gray-400 text-sm leading-relaxed mb-4">${bio}</p>
                        <p class="text-gray-600 text-sm">${bioExtra}</p>
                    </div>

                    <div class="flex items-center gap-4">
                        <img src="${photo.src}" alt="${photo.alt}" class="w-16 h-16 border-2 border-teal-400 object-cover">
                        <div class="text-xs text-gray-600">
                            <p class="text-white">${name}</p>
                            <p>${location}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs text-gray-600 uppercase tracking-widest mb-6">Timeline</h3>
                    <div class="space-y-4 text-sm">
                        ${timelineHtml}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ===== CONTACT SECTION =====

function renderContact(data) {
    const { sectionMarker, headline, highlightLine, description, info, form } = data.contact;

    const infoHtml = info.map(item =>
        `<p><span class="text-teal-400">></span> ${item}</p>`
    ).join('');

    return `
    <section id="contact" class="py-20 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <div class="section-marker">${sectionMarker}</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white uppercase mb-6">
                        ${renderHeadline(headline, highlightLine)}
                    </h2>
                    <p class="text-gray-600 text-sm mb-8">${description}</p>
                    <div class="text-xs text-gray-600 space-y-2">
                        ${infoHtml}
                    </div>
                </div>

                <div>
                    <form action="${form.action}" method="POST" class="space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-xs text-gray-600 uppercase tracking-widest mb-2">${form.fields.email.label}</label>
                                <input type="${form.fields.email.type}" id="email" name="_replyto" required placeholder="${form.fields.email.placeholder}" class="input-brutal w-full">
                            </div>
                            <div>
                                <label for="subject" class="block text-xs text-gray-600 uppercase tracking-widest mb-2">${form.fields.subject.label}</label>
                                <input type="${form.fields.subject.type}" id="subject" name="_subject" required placeholder="${form.fields.subject.placeholder}" class="input-brutal w-full">
                            </div>
                        </div>
                        <div>
                            <label for="message" class="block text-xs text-gray-600 uppercase tracking-widest mb-2">${form.fields.message.label}</label>
                            <textarea id="message" name="body" rows="${form.fields.message.rows}" required placeholder="${form.fields.message.placeholder}" class="input-brutal w-full"></textarea>
                        </div>
                        <input type="hidden" name="_next" value="${form.redirect}" />
                        <input type="text" name="_gotcha" style="display:none" />
                        <button type="submit" class="btn-brutal-filled w-full glitch-hover">${form.submitLabel}</button>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
}

// ===== FOOTER =====

function renderFooter(data) {
    const { name, year, links } = data.footer;

    const linksHtml = links.map(link =>
        `<a href="${link.href}" class="raw-link">[${link.label}]</a>`
    ).join('');

    return `
    <footer class="footer-brutal py-8 px-4 md:px-8 bg-black">
        <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div class="text-xs text-gray-600">
                <span class="text-white">${name}</span> © ${year}
            </div>
            <div class="flex flex-wrap gap-4 text-xs">
                ${linksHtml}
            </div>
        </div>
    </footer>`;
}

// ===== SCROLL TO TOP BUTTON =====

function renderScrollTop() {
    return `
    <button id="scrollTop" onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
        class="fixed bottom-6 right-6 border-2 border-teal-400 bg-black text-teal-400 w-12 h-12 flex items-center justify-center transition-all opacity-0 translate-y-4 pointer-events-none z-50 hover:bg-teal-400 hover:text-black"
        aria-label="Scroll to top">
        <span class="text-xl">↑</span>
    </button>`;
}

// ===== MAIN RENDER FUNCTION =====

function renderApp(data) {
    const app = document.getElementById('app');

    app.innerHTML = `
        ${renderNav(data)}
        ${renderHero(data)}
        ${renderMarquee(data)}
        ${renderWork(data)}
        ${renderArchive(data)}
        ${renderAbout(data)}
        ${renderContact(data)}
        ${renderScrollTop()}
        ${renderFooter(data)}
    `;
}

// ===== UTILITY SCRIPTS =====

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}

function initScrollHandler() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        // Scroll-to-top button visibility
        const scrollBtn = document.getElementById('scrollTop');
        if (scrolled > 400) {
            scrollBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100', 'translate-y-0');
        }

        // Active nav highlighting
        const sections = ['work', 'about', 'contact'];
        const navLinks = document.querySelectorAll('.nav-brutal a[href^="#"]');

        let current = '';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && section.getBoundingClientRect().top <= 150) {
                current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-teal-400');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('text-teal-400');
            }
        });
    });
}

// ===== INITIALIZE =====

document.addEventListener('DOMContentLoaded', function() {
    renderApp(DATA);
    initScrollHandler();
});
