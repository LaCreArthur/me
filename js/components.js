/**
 * Portfolio components - pure functions that turn DATA into HTML strings.
 *
 * Used at build time by scripts/prerender.js to generate a fully static index.html.
 * No DOM access here; interactivity lives in js/interactive.js.
 */

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderHeadline(lines, highlightLine) {
    return lines.map((line, index) =>
        index === highlightLine
            ? `<span class="text-teal-300">${line}</span>`
            : line
    ).join('<br>');
}

function renderExternalLink(link, className = 'raw-link') {
    const label = link.label || link.title;
    if (!link.href) {
        return `<span class="muted-link">${label}</span>`;
    }
    return `<a href="${link.href}" target="_blank" rel="noopener" class="${className}">${label}</a>`;
}

function renderHead(data) {
    const { seo, site } = data;
    const edu = seo.education;

    const jsonld = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "@id": site.url + "#arthur-scheidel",
            "name": data.about.name,
            "alternateName": seo.alternateName,
            "jobTitle": "Unity Game Developer and Technical Co-Founder",
            "description": seo.description,
            "url": site.url,
            "image": site.profileImage,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressCountry": "France"
            },
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": edu.school
            },
            "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "name": edu.degree,
                "dateCreated": edu.year
            },
            "knowsAbout": seo.keywords,
            "knowsLanguage": ["French", "English"],
            "sameAs": [
                "https://github.com/LaCreArthur",
                "https://www.linkedin.com/in/arthur-scheidel/",
                "https://lacrearthur.itch.io/",
                "https://www.youtube.com/@arthur.scheidel/videos"
            ],
            "worksFor": {
                "@type": "Organization",
                "name": "Sorolla",
                "url": site.sorollaUrl
            },
            "award": seo.award
        },
        "about": {
            "@type": "Person",
            "@id": site.url + "#arthur-scheidel"
        }
    };

    return `
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords.join(', '))}" />
    <meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />
    <meta property="og:image" content="${site.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${site.url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />
    <meta name="twitter:image" content="${site.ogImage}" />
    <link rel="canonical" href="${site.url}" />
    <link rel="icon" type="image/png" href="img/logo.png" />
    <title>${escapeHtml(seo.title)}</title>

    <script type="application/ld+json">
${JSON.stringify(jsonld, null, 4)}
    </script>

    <link rel="stylesheet" href="css/tailwind.css" />
    <link rel="stylesheet" href="css/style.css" />`;
}

function renderNav(data) {
    const { logo, links, resumeUrl } = data.nav;

    const navLinks = links.map(link =>
        `<a href="${link.href}" class="hover:text-teal-300">${link.label}</a>`
    ).join('');

    const mobileLinks = links.map(link =>
        `<a href="${link.href}" class="block py-2 text-gray-400 hover:text-teal-300">> ${link.label}</a>`
    ).join('');

    return `
    <nav class="site-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-6xl mx-auto px-4 md:px-8">
            <div class="flex items-center justify-between h-16">
                <a href="#" class="text-white text-sm uppercase">${logo}</a>

                <div class="nav-brutal hidden md:flex items-center gap-7 text-sm text-gray-400">
                    ${navLinks}
                    <a href="${resumeUrl}" class="btn-brutal text-xs px-4 py-2">Resume</a>
                </div>

                <button onclick="toggleMenu()" class="mobile-menu-button nav-icon-button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="mobile-menu" class="mobile-menu md:hidden pb-4 border-t border-[#222] mt-2 pt-4">
                ${mobileLinks}
                <a href="${resumeUrl}" class="block py-2 text-gray-400 hover:text-teal-300">> Resume</a>
            </div>
        </div>
    </nav>`;
}

function renderHero(data) {
    const { eyebrow, headline, highlightLine, subhead, metrics, cta, socials, media } = data.hero;

    const metricsHtml = metrics.map(item => `
        <div class="metric">
            <div class="metric-number">${item.value}</div>
            <div class="metric-label">${item.label}</div>
        </div>
    `).join('');

    const socialsHtml = socials.map(s =>
        `<a href="${s.href}" target="_blank" rel="noopener" class="raw-link hover:text-teal-300">${s.label}</a>`
    ).join('');

    return `
    <section class="hero-section min-h-screen flex items-center pt-24 pb-16 px-4 md:px-8">
        <div class="max-w-6xl mx-auto w-full">
            <div class="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 items-center">
                <div>
                    <div class="section-marker">${eyebrow}</div>

                    <h1 class="headline text-white mb-6">
                        ${renderHeadline(headline, highlightLine)}
                    </h1>

                    <p class="subhead mb-10">${subhead}</p>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        ${metricsHtml}
                    </div>

                    <div class="flex flex-wrap gap-4 mb-10">
                        <a href="${cta.primary.href}" class="btn-brutal-filled">${cta.primary.label}</a>
                        <a href="${cta.secondary.href}" class="btn-brutal">${cta.secondary.label}</a>
                    </div>

                    <div class="flex flex-wrap gap-5 text-sm text-gray-400">
                        ${socialsHtml}
                    </div>
                </div>

                <figure class="hero-media">
                    <img src="${media.src}" alt="${media.alt}" loading="eager">
                    <figcaption>${media.caption}</figcaption>
                </figure>
            </div>
        </div>
    </section>`;
}

function renderProjectMedia(media) {
    if (media.type === 'image') {
        return `
        <figure class="project-media">
            <img src="${media.src}" alt="${media.alt}" loading="lazy">
        </figure>`;
    }

    if (media.type === 'code') {
        const linesHtml = media.lines.map(line => {
            let text = escapeHtml(line.text);
            if (line.highlight) {
                text = text.replace(escapeHtml(line.highlight), `<span class="text-teal-300">${escapeHtml(line.highlight)}</span>`);
            }
            return `<p>${text}</p>`;
        }).join('');

        return `
        <pre class="code-media" aria-label="CI/CD workflow snippet"><code>${linesHtml}</code></pre>`;
    }

    return '';
}

function renderProjectCard(project) {
    const tagsHtml = project.tags.map(tag =>
        `<span class="tag-raw ${tag.highlight ? 'text-teal-300 border-teal-300' : 'text-gray-300'}">${tag.label}</span>`
    ).join('');

    const bulletsHtml = project.bullets.map(b => {
        const prefix = b.prefix ? `<strong>${b.prefix}</strong> ` : '';
        return `<p><span class="text-teal-300">></span> ${prefix}${b.text}</p>`;
    }).join('');

    const linksHtml = project.links.map(link => renderExternalLink(link)).join('');

    return `
    <article class="project-card p-6 md:p-8 mb-8 relative">
        <span class="big-index" aria-hidden="true">${project.id}</span>
        <div class="grid md:grid-cols-2 gap-8 relative z-10">
            ${renderProjectMedia(project.media)}
            <div>
                <div class="flex flex-wrap items-start gap-3 mb-4">
                    <h3 class="text-xl md:text-2xl font-bold text-white">${project.title}</h3>
                    ${tagsHtml}
                </div>
                <div class="space-y-3 text-sm text-gray-300 mb-6">
                    ${bulletsHtml}
                    <p class="text-gray-400">${project.meta}</p>
                </div>
                <div class="flex flex-wrap gap-4 text-xs">
                    ${linksHtml}
                </div>
            </div>
        </div>
    </article>`;
}

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

function renderSkills(data) {
    const skills = data.skills;
    const itemsHtml = skills.items.map(item => `
        <article class="proof-item">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </article>
    `).join('');

    return `
    <section id="skills" class="py-16 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="section-marker">${skills.sectionMarker}</div>
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-10">${skills.headline}</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                ${itemsHtml}
            </div>
        </div>
    </section>`;
}

function renderArchive(data) {
    const { sectionMarker, headline, shippedTitles, categories } = data.archive;

    const titlesHtml = shippedTitles.map(item => {
        const inner = `
            <span>${item.title}</span>
            <small>${item.role}</small>
            <em>${item.note}</em>
        `;

        return item.href
            ? `<a href="${item.href}" target="_blank" rel="noopener" class="archive-title">${inner}</a>`
            : `<div class="archive-title">${inner}</div>`;
    }).join('');

    const categoriesHtml = categories.map(cat => `
        <div>
            <h3 class="text-xs text-gray-400 uppercase mb-4">${cat.title}</h3>
            <div class="space-y-2">
                ${cat.items.map(item => item.href ? `
                    <a href="${item.href}" target="_blank" rel="noopener" class="work-card block p-3">
                        <span class="text-white">${item.title}</span>
                        <span class="block text-gray-400 text-xs">${item.subtitle}</span>
                    </a>
                ` : `
                    <div class="work-card muted-card block p-3">
                        <span class="text-white">${item.title}</span>
                        <span class="block text-gray-400 text-xs">${item.subtitle}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `
    <section class="py-16 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="section-marker">${sectionMarker}</div>
            <h2 class="text-2xl font-bold text-white mb-10">${headline}</h2>

            <div class="archive-strip mb-12">
                ${titlesHtml}
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
                ${categoriesHtml}
            </div>
        </div>
    </section>`;
}

function renderAbout(data) {
    const { sectionMarker, headline, highlightLine, bio, bioExtra, photo, name, location, timeline } = data.about;

    const timelineHtml = timeline.map(item => `
        <div class="flex gap-4 ${item.current ? 'border-l-2 border-teal-300' : 'border-l border-[#333]'} pl-4">
            <span class="${item.current ? 'text-teal-300' : 'text-gray-400'} w-20 shrink-0">${item.years}</span>
            <div>
                <p class="text-white">${item.role}</p>
                <p class="text-gray-400">${item.company}</p>
            </div>
        </div>
    `).join('');

    return `
    <section id="about" class="py-20 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <div class="section-marker">${sectionMarker}</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-8">
                        ${renderHeadline(headline, highlightLine)}
                    </h2>

                    <div class="about-box p-6 mb-6">
                        <p class="text-gray-200 text-sm leading-relaxed mb-4">${bio}</p>
                        <p class="text-gray-400 text-sm">${bioExtra}</p>
                    </div>

                    <div class="flex items-center gap-4">
                        <img src="${photo.src}" alt="${photo.alt}" class="w-16 h-16 border-2 border-teal-300 object-cover">
                        <div class="text-xs text-gray-400">
                            <p class="text-white">${name}</p>
                            <p>${location}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs text-gray-400 uppercase mb-6">Timeline</h3>
                    <div class="space-y-4 text-sm">
                        ${timelineHtml}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderContact(data) {
    const { sectionMarker, headline, highlightLine, description, info, email, form } = data.contact;

    const infoHtml = info.map(item =>
        `<p><span class="text-teal-300">></span> ${item}</p>`
    ).join('');

    return `
    <section id="contact" class="py-20 px-4 md:px-8 border-t border-[#222]">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <div class="section-marker">${sectionMarker}</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
                        ${renderHeadline(headline, highlightLine)}
                    </h2>
                    <p class="text-gray-400 text-sm mb-8">${description}</p>
                    <div class="text-xs text-gray-400 space-y-2 mb-6">
                        ${infoHtml}
                    </div>
                    <a href="mailto:${email}" class="raw-link text-sm">${email}</a>
                </div>

                <div>
                    <form action="${form.action}" method="POST" class="space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-xs text-gray-300 uppercase mb-2">${form.fields.email.label}</label>
                                <input type="${form.fields.email.type}" id="email" name="_replyto" required placeholder="${form.fields.email.placeholder}" class="input-brutal w-full">
                            </div>
                            <div>
                                <label for="subject" class="block text-xs text-gray-300 uppercase mb-2">${form.fields.subject.label}</label>
                                <input type="${form.fields.subject.type}" id="subject" name="_subject" required placeholder="${form.fields.subject.placeholder}" class="input-brutal w-full">
                            </div>
                        </div>
                        <div>
                            <label for="message" class="block text-xs text-gray-300 uppercase mb-2">${form.fields.message.label}</label>
                            <textarea id="message" name="body" rows="${form.fields.message.rows}" required placeholder="${form.fields.message.placeholder}" class="input-brutal w-full"></textarea>
                        </div>
                        <input type="hidden" name="_next" value="${form.redirect}">
                        <input type="text" name="_gotcha" style="display:none">
                        <button type="submit" class="btn-brutal-filled w-full">${form.submitLabel}</button>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
}

function renderScrollTop() {
    return `
    <button id="scrollTop" onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
        class="fixed bottom-6 right-6 border-2 border-teal-300 bg-black text-teal-300 w-12 h-12 flex items-center justify-center transition-all opacity-0 translate-y-4 pointer-events-none z-50 hover:bg-teal-300 hover:text-black"
        aria-label="Scroll to top">
        <span class="text-xl">^</span>
    </button>`;
}

function renderBody(data) {
    return `
        ${renderNav(data)}
        ${renderHero(data)}
        ${renderWork(data)}
        ${renderSkills(data)}
        ${renderArchive(data)}
        ${renderAbout(data)}
        ${renderContact(data)}
        ${renderScrollTop()}
        ${renderFooter(data)}
    `;
}

function renderFooter(data) {
    const { name, year, links } = data.footer;

    const linksHtml = links.map(link =>
        `<a href="${link.href}" target="_blank" rel="noopener" class="raw-link">${link.label}</a>`
    ).join('');

    return `
    <footer class="footer-brutal py-8 px-4 md:px-8 bg-black">
        <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div class="text-xs text-gray-400">
                <span class="text-white">${name}</span> (c) ${year}
            </div>
            <div class="flex flex-wrap gap-4 text-xs">
                ${linksHtml}
            </div>
        </div>
    </footer>`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderHead, renderBody };
}
