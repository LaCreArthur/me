/**
 * Portfolio content - single source of truth.
 *
 * This file is the ONLY place to edit copy and facts. The site (index.html) is
 * generated from it by `npm run build` (scripts/prerender.js). llms.txt, resume.md,
 * resume.html and the PDF are synced by hand from the canonical facts below.
 */

const SITE = {
    url: "https://lacrearthur.github.io/me/",
    resumeUrl: "https://lacrearthur.github.io/me/resume.pdf",
    ogImage: "https://lacrearthur.github.io/me/img/og-image.png",
    profileImage: "https://lacrearthur.github.io/me/img/id2018.jpg",
    sorollaUrl: "https://github.com/sorolla-studio"
};

const DATA = {
    site: SITE,

    // SEO / head. Kept distinct so social previews don't repeat the same string.
    seo: {
        title: "Arthur Scheidel - Unity Developer & Tech Co-Founder | Paris",
        description: "I'm a Unity developer and tech co-founder of Sorolla in Paris. I ship mobile games, build publishing SDKs and playable ads, and automate Unity release pipelines.",
        ogTitle: "Arthur Scheidel - I make mobile games and the tools to ship them",
        ogDescription: "Unity developer, 20+ games shipped, tech co-founder of Sorolla. SDKs, playable ads, and CI/CD for mobile game releases.",
        keywords: ["Unity", "C#", "Game Development", "Playable Ads", "Mobile Games", "Game Publishing"],
        alternateName: "LaCreArthur",
        award: "2x French Skateboard Championship Qualifier (2024, 2025)",
        education: {
            degree: "Master's in Computer Science (Software and Knowledge Engineering)",
            school: "University of Strasbourg",
            year: "2017"
        }
    },

    nav: {
        logo: "Arthur Scheidel",
        links: [
            { href: "#work", label: "Work" },
            { href: "#skills", label: "Skills" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" }
        ],
        resumeUrl: SITE.resumeUrl
    },

    hero: {
        eyebrow: "Hi, I'm Arthur Scheidel",
        headline: ["I make mobile games", "and the tools", "to ship them."],
        highlightLine: 0,
        subhead: "Unity developer and tech co-founder of Sorolla, based in Paris. I've shipped 20+ games, and I build the SDKs, playable ads, and release pipelines that get mobile games out the door.",
        metrics: [
            { value: "20+", label: "games shipped" },
            { value: "10K+", label: "Google Play installs" },
            { value: "4.5/5", label: "Play Store rating" },
            { value: "7+ yrs", label: "Unity & game dev" }
        ],
        cta: {
            primary: { href: SITE.resumeUrl, label: "View Resume" },
            secondary: { href: "#work", label: "See my work" }
        },
        socials: [
            { href: "https://github.com/LaCreArthur/", label: "GitHub" },
            { href: "https://www.linkedin.com/in/arthur-scheidel/", label: "LinkedIn" },
            { href: "https://www.youtube.com/@arthur.scheidel/videos", label: "YouTube" },
            { href: "https://lacrearthur.itch.io/", label: "itch.io" }
        ],
        media: {
            src: "img/background3.png",
            alt: "Collage of Arthur Scheidel's game development work",
            caption: "SDKs, playable ads, and shipped mobile games."
        }
    },

    work: {
        sectionMarker: "Work",
        headline: ["Selected", "work"],
        highlightLine: 1
    },

    projects: [
        {
            id: "01",
            title: "Sorolla Palette SDK",
            tags: [
                { label: "Current", highlight: true },
                { label: "Unity SDK", highlight: false }
            ],
            media: {
                type: "image",
                src: "img/logo.png",
                alt: "Sorolla Palette SDK"
            },
            bullets: [
                { prefix: "", text: "A publisher SDK that drops mobile-publishing setup (ATT, ad networks, analytics, release instrumentation) into any Unity game in one package." },
                { prefix: "", text: "I design and build it as technical co-founder and lead engineer at Sorolla." },
                { prefix: "", text: "Public Unity package under the Sorolla Studio GitHub organization." }
            ],
            meta: "Sorolla, 2024-now, Unity + C#",
            links: [
                { label: "GitHub", href: "https://github.com/sorolla-studio/sorolla-palette" }
            ]
        },
        {
            id: "02",
            title: "Doge To Mars / Dogecoin To The Moon",
            tags: [
                { label: "10K+ installs", highlight: true },
                { label: "Indie", highlight: false }
            ],
            media: {
                type: "image",
                src: "img/background2.jpg",
                alt: "Doge To Mars project artwork"
            },
            bullets: [
                { prefix: "", text: "A Dogecoin-community mobile game I built and shipped solo, with no paid marketing." },
                { prefix: "", text: "10K+ installs and a 4.5 rating on Google Play, grown purely through the community." },
                { prefix: "", text: "Still live on Android, with itch.io and GitHub project pages." }
            ],
            meta: "Solo dev, 2021, Unity + C#",
            links: [
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.bretzelstudio.dogecointothemoon" },
                { label: "GitHub", href: "https://github.com/LaCreArthur/doge-to-mars-gh-page" },
                { label: "itch.io", href: "https://lacrearthur.itch.io/dogecoin-to-the-moon" }
            ]
        },
        {
            id: "03",
            title: "Rody & Mastico Collection",
            tags: [
                { label: "3 years", highlight: false },
                { label: "Level editor", highlight: true }
            ],
            media: {
                type: "image",
                src: "img/RMCC.jpg",
                alt: "Rody and Mastico Collection"
            },
            bullets: [
                { prefix: "", text: "A Unity remaster of the Atari ST Rody games I grew up with, built solo over about three years. This is the project I taught myself Unity and C# on." },
                { prefix: "", text: "I rebuilt the game's 1987-era voice synthesis from scratch using the original phoneme technique (there's a playable demo)." },
                { prefix: "", text: "Added Rody Maker, an in-game level editor that shares the game's art style. Featured by French YouTubers Bob Lennon and Benzaie." }
            ],
            meta: "Solo dev, 2015-2018, Unity + C#",
            links: [
                { label: "itch.io", href: "https://lacrearthur.itch.io/rody-mastico-collection" },
                { label: "Website", href: "https://lacrearthur.github.io/RodyAIbiza/" },
                { label: "Voice synth demo", href: "https://lacrearthur.github.io/RodyAIbiza/Synth/index.html" },
                { label: "Trailer", href: "https://www.youtube.com/watch?v=DEktCBMKopE" }
            ]
        },
        {
            id: "04",
            title: "Unity CI/CD Template",
            tags: [
                { label: "Open source", highlight: true },
                { label: "DevOps", highlight: false }
            ],
            media: {
                type: "code",
                lines: [
                    { text: "name: Unity mobile release" },
                    { text: "on: [push]" },
                    { text: "jobs:" },
                    { text: "  build_android:" },
                    { text: "    uses: game-ci/unity-builder", highlight: "game-ci/unity-builder" },
                    { text: "  deploy_ios:" },
                    { text: "    uses: fastlane/deliver", highlight: "fastlane/deliver" },
                    { text: "  distribute: Firebase + stores" }
                ]
            },
            bullets: [
                { prefix: "", text: "A reusable GitHub Actions pipeline for Unity mobile releases: build, test, deploy." },
                { prefix: "", text: "GameCI for builds, Fastlane for store delivery, Firebase for test distribution." },
                { prefix: "", text: "A practical base for TestFlight and Play Store automation." }
            ],
            meta: "GitHub Actions + Fastlane + GameCI + Firebase",
            links: [
                { label: "GitHub", href: "https://github.com/LaCreArthur/unity-fastlane-ci" }
            ]
        }
    ],

    skills: {
        sectionMarker: "Capabilities",
        headline: "What I build",
        items: [
            {
                title: "Publisher SDKs",
                text: "Unity packages for ATT, ad networks, analytics, and release instrumentation."
            },
            {
                title: "Playable ads",
                text: "Three.js and Unity ad prototypes built for network constraints and fast iteration."
            },
            {
                title: "Mobile pipelines",
                text: "CI/CD for Android, iOS, TestFlight, Firebase, and store releases."
            },
            {
                title: "Game teams",
                text: "Lead and CTO roles across WebGL, Web3, hyper-casual, and multiplayer."
            }
        ]
    },

    archive: {
        sectionMarker: "Archive",
        headline: "Shipped titles and older work",
        shippedTitles: [
            { title: "Happy Snake 3D", role: "Sorolla mobile game", note: "App Store + Google Play", href: "https://apps.apple.com/us/app/happy-snake-3d/id6755388400" },
            { title: "Don't Fall Guys", role: "Hyper-casual mobile game", note: "Google Play", href: "https://play.google.com/store/apps/details?id=com.bretzelstudio.dontfallguys" },
            { title: "Snap Guys", role: "Hyper-casual mobile game", note: "itch.io", href: "https://lacrearthur.itch.io/snap-guys" },
            { title: "Mine Block", role: "Hyper-casual mobile game", note: "Trailer", href: "https://www.youtube.com/shorts/c0PTXM9esgA" },
            { title: "Farm Run", role: "Ketchapp / Ubisoft prototype", note: "Hyper-casual" },
            { title: "Find-it 3D", role: "Hyper-casual mobile game", note: "iOS / Android" }
        ],
        categories: [
            {
                title: "SDKs & Tools",
                items: [
                    { href: "https://github.com/sorolla-studio/sorolla-palette", title: "Sorolla Palette SDK", subtitle: "Mobile publishing SDK" },
                    { href: "https://github.com/LaCreArthur/facebook-unity-sdk-upm", title: "Facebook SDK UPM", subtitle: "Unity Package Manager port" },
                    { href: "https://github.com/LaCreArthur/unity-fastlane-ci", title: "Unity CI/CD Template", subtitle: "GitHub Actions + Fastlane" }
                ]
            },
            {
                title: "Game Jams",
                items: [
                    { href: "https://lacrearthur.itch.io/the-binding-of-euclide", title: "Binding of Euclide", subtitle: "Math roguelike" },
                    { href: "https://lacrearthur.itch.io/plot-hole", title: "Plot Hole: Little Red", subtitle: "Narrative jam, team" },
                    { href: "https://lacrearthur.itch.io/univeria", title: "Univeria", subtitle: "Scale-shift puzzle" }
                ]
            },
            {
                title: "Teaching",
                items: [
                    { href: "https://github.com/LaCreArthur/FuturaeVampireSurvivor", title: "Vampire Survivor Clone", subtitle: "Unity course material" },
                    { href: "https://github.com/LaCreArthur/FuturaeScifiTD", title: "Sci-Fi Tower Defense", subtitle: "Architecture patterns" }
                ]
            },
            {
                title: "CS fundamentals",
                items: [
                    { href: "https://github.com/LaCreArthur/MatC-Compiler", title: "Mat-C Compiler", subtitle: "Sub-C compiler (Lex & Yacc)" },
                    { href: "https://github.com/LaCreArthur/shortestPathGA", title: "Shortest Path GA", subtitle: "C++ distributed-island genetic algorithm" },
                    { href: "https://github.com/LaCreArthur/GenBank-Miner", title: "GenBank Miner", subtitle: "Java genomic big-data stats" }
                ]
            }
        ]
    },

    about: {
        sectionMarker: "About",
        headline: ["Builder, co-founder,", "and teacher."],
        highlightLine: 0,
        bio: "I'm a game developer and studio co-founder based in Paris. I started out teaching myself Unity and C# to remake the Atari ST games I grew up with, and I've since shipped 20+ titles, from indie passion projects to hyper-casual games at Ubisoft/Ketchapp. Today I'm the technical co-founder of Sorolla, building the SDKs, playable ads, and release pipelines that get mobile games shipped.",
        bioExtra: "Outside code, I skate competitively (2x French Championship qualifier, 2024 and 2025) and teach Unity to students. Same loop as shipping games: practice, fail, adjust, repeat.",
        photo: {
            src: "img/id2018.jpg",
            alt: "Arthur Scheidel"
        },
        name: "Arthur Scheidel",
        location: "Paris, France",
        timeline: [
            { years: "2024-now", role: "Technical Co-Founder", company: "Sorolla - mobile game publishing", current: true },
            { years: "2024", role: "Senior Unity & Full-Stack Engineer", company: "YourArt", current: false },
            { years: "2023", role: "Lead Unity Developer", company: "Yumon", current: false },
            { years: "2022-23", role: "Chief Technology Officer", company: "CARFT - Web3 gaming", current: false },
            { years: "2015-now", role: "Independent Game Developer", company: "Bretzel Studio", current: true },
            { years: "2019", role: "Gameplay Programmer", company: "Ubisoft / Ketchapp", current: false },
            { years: "2018-19", role: "Game Developer", company: "Celsius Online", current: false },
            { years: "2017", role: "Master's in Computer Science", company: "University of Strasbourg (with honors)", current: false }
        ]
    },

    contact: {
        sectionMarker: "Contact",
        headline: ["Let's build", "something"],
        highlightLine: 1,
        description: "Best fit: Unity SDK work, mobile-publishing consulting, playable-ad production, or focused freelance engineering with a clear shipping target.",
        info: [
            "Response time: about 24h",
            "Available for: selected consulting and publishing partnerships",
            "Based in Paris, France, remote friendly"
        ],
        email: "arthur.scheidel@gmail.com",
        form: {
            action: "https://formspree.io/f/xblgjdky",
            redirect: SITE.url,
            fields: {
                email: { label: "Email", placeholder: "you@example.com", type: "email" },
                subject: { label: "Subject", placeholder: "Unity SDK / publishing inquiry", type: "text" },
                message: { label: "Message", placeholder: "What are you trying to ship?", type: "textarea", rows: 5 }
            },
            submitLabel: "Send Message"
        }
    },

    footer: {
        name: "Arthur Scheidel",
        year: 2026,
        links: [
            { href: "https://github.com/LaCreArthur/", label: "GitHub" },
            { href: "https://www.linkedin.com/in/arthur-scheidel/", label: "LinkedIn" },
            { href: "https://www.instagram.com/arthur.scheidel/", label: "Instagram" },
            { href: "https://www.youtube.com/@arthur.scheidel/videos", label: "YouTube" },
            { href: "https://lacrearthur.itch.io/", label: "itch.io" }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DATA };
}
