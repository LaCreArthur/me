/**
 * Portfolio Data - All content separated from structure
 * Edit this file to update content without touching HTML/CSS
 */

const DATA = {
    meta: {
        title: "Arthur Scheidel - Game Developer & Founder | Paris",
        description: "Arthur Scheidel - Game developer & founder of Sorolla (mobile game publishing). 7+ years at Ubisoft, leading Web3 startups, shipping indie hits. 25k+ downloads.",
        ogImage: "https://lacrearthur.github.io/img/logo.png",
        url: "https://lacrearthur.github.io/"
    },

    nav: {
        logo: "Arthur_Scheidel",
        links: [
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" }
        ],
        resumeUrl: "https://lacrearthur.github.io/resume.pdf"
    },

    hero: {
        terminal: "> LOADING PORTFOLIO...",
        headline: ["UNITY", "DEVELOPER", "WHO SHIPS"],
        highlightLine: 1, // 0-indexed, which line gets teal color
        subhead: "7+ years building games at Ubisoft, CTO at Web3 startups, now founder of Sorolla — a mobile game publisher. I ship things that work.",
        metrics: [
            { value: "25K+", label: "Downloads" },
            { value: "4.9★", label: "Rating" },
            { value: "10+", label: "Games" },
            { value: "20+", label: "Students" }
        ],
        cta: {
            primary: { href: "https://lacrearthur.github.io/resume.pdf", label: "View Resume" },
            secondary: { href: "#contact", label: "Contact Me" }
        },
        socials: [
            { href: "https://github.com/LaCreArthur/", label: "GitHub" },
            { href: "https://www.linkedin.com/in/arthur-scheidel/", label: "LinkedIn" },
            { href: "https://youtube.com/c/LaCreArthur", label: "YouTube" },
            { href: "https://lacrearthur.itch.io/", label: "itch.io" }
        ]
    },

    marquee: {
        items: ["UNITY", "C#", "MOBILE", "WEB3", "REACT", "PYTHON", "CICD", "GAME DEV"]
    },

    work: {
        sectionMarker: "Featured Work",
        headline: ["PROJECTS THAT", "SHIPPED"],
        highlightLine: 1
    },

    projects: [
        {
            id: "01",
            title: "Doge To Mars",
            tags: [
                { label: "25K+ DL", highlight: true }
            ],
            media: {
                type: "image",
                src: "https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/8d/47/15/8d47153a-b3c1-9efe-3e47-064b725b11f7/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/146x0w.webp",
                alt: "Doge To Mars",
                placeholder: "Trailer Coming"
            },
            bullets: [
                { prefix: "Challenge:", text: "Build a mobile game for the Dogecoin community with $0 marketing." },
                { prefix: "Result:", text: "25,000 organic downloads, 4.9★ rating. Invited to Dogecoin Hackathon 2025." }
            ],
            meta: "Solo dev · 2021-2025 · Unity + C#",
            links: [
                { label: "App Store", href: "https://apps.apple.com/us/app/dogecoin-to-moon/id1574465636" },
                { label: "GitHub", href: "https://github.com/LaCreArthur/DogecoinToTheMoon" },
                { label: "itch.io", href: "https://lacrearthur.itch.io/" }
            ]
        },
        {
            id: "02",
            title: "Rody & Mastico",
            tags: [
                { label: "3 YRS DEV", highlight: false }
            ],
            media: {
                type: "video",
                href: "https://www.youtube.com/watch?v=DEktCBMKopE",
                placeholder: "Watch Trailer"
            },
            bullets: [
                { prefix: "Challenge:", text: "Recreate childhood Atari ST games with modern features." },
                { prefix: "Result:", text: "Complete remaster + Rody Maker level editor. YouTuber Bob Lennon collab." }
            ],
            meta: "Solo dev · 3+ years · Unity + C# + Level Editor",
            links: [
                { label: "itch.io", href: "https://lacrearthur.itch.io/rody-mastico-collection" },
                { label: "Website", href: "https://lacrearthur.github.io/RodyAIbiza/" },
                { label: "Trailer", href: "https://www.youtube.com/watch?v=DEktCBMKopE" }
            ]
        },
        {
            id: "03",
            title: "Unity CI/CD",
            tags: [
                { label: "OSS", highlight: true }
            ],
            media: {
                type: "code",
                lines: [
                    { text: "# .github/workflows/build.yml", class: "text-gray-600" },
                    { text: "name: Unity CI/CD", class: "text-teal-400" },
                    { text: "on: [push]", class: "text-gray-500" },
                    { text: "jobs:", class: "text-gray-500" },
                    { text: "  build:", class: "text-gray-500" },
                    { text: "    - uses: game-ci/unity-builder", class: "text-gray-400", highlight: "game-ci/unity-builder" },
                    { text: "    - uses: fastlane/deliver", class: "text-gray-400", highlight: "fastlane/deliver" },
                    { text: "# Auto-deploy to stores ✓", class: "text-gray-600 mt-2" }
                ]
            },
            bullets: [
                { prefix: "Problem:", text: "Setting up Unity pipelines for mobile is painful." },
                { prefix: "Solution:", text: "Template for Android → Play Store, iOS → TestFlight. One click." }
            ],
            meta: "GitHub Actions + Fastlane + GameCI + Firebase",
            links: [
                { label: "GitHub", href: "https://github.com/LaCreArthur/unity-fastlane-ci" }
            ]
        }
    ],

    archive: {
        sectionMarker: "Archive",
        headline: "More Work",
        mobileGames: {
            title: "Mobile Games @ Ketchapp/Ubisoft",
            items: [
                { href: "https://play.google.com/store/apps/details?id=com.bretzelstudio.farmrun", img: "https://play-lh.googleusercontent.com/FICrMRrxStHsEiVib7fiZFsapQqkflB_JWCzAn4wYegpfd7UjDP2eMzPr0cos8Oc3xlM=s256-rw", alt: "Farm Land Run 3D", label: "Farm Run" },
                { href: "https://apps.apple.com/us/app/mine-block-tap/id1570215589", img: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/6e/f2/84/6ef284aa-7c28-17f0-2f4e-35c15b4f7b92/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/146x0w.webp", alt: "Mine Block Tap", label: "Mine Block" },
                { href: "https://apps.apple.com/us/app/find-it-3d/id1566705591", img: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/de/91/c6/de91c6ed-835b-7138-ec1b-8d301f5b0e91/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/146x0w.webp", alt: "Find-it 3D", label: "Find-it 3D" },
                { href: "https://apps.apple.com/us/app/dont-fall-guys/id1563951588", img: "https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/24/5f/d6/245fd693-0c59-7cb6-144c-119903475560/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/146x0w.webp", alt: "Don't Fall Guys", label: "Don't Fall" },
                { href: "https://apps.apple.com/us/app/snap-guys/id1542504605", img: "https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/62/53/ef/6253ef72-1286-51a6-9b47-b635e8920c45/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/146x0w.webp", alt: "Snap Guys", label: "Snap Guys" }
            ],
            more: { href: "https://lacrearthur.itch.io/", label: "View all on itch.io" }
        },
        categories: [
            {
                title: "SDKs & Tools",
                items: [
                    { href: "https://github.com/LaCreArthur/sorolla-palette-upm", title: "Sorolla Palette SDK", subtitle: "Mobile publishing (iOS ATT + ads)" },
                    { href: "https://github.com/LaCreArthur/facebook-unity-sdk-upm", title: "Facebook SDK UPM", subtitle: "Unity Package Manager port" },
                    { href: "https://github.com/LaCreArthur/happy-snake-3d", title: "Happy Snake 3D", subtitle: "Three.js playable ad" }
                ]
            },
            {
                title: "Game Jams",
                items: [
                    { href: "https://lacrearthur.itch.io/the-binding-of-euclide", title: "Binding of Euclide", subtitle: "Math roguelike" },
                    { href: "https://lacrearthur.itch.io/plot-hole", title: "Plot Hole: Little Red", subtitle: "Narrative" },
                    { href: "https://lacrearthur.itch.io/univeria", title: "Univeria", subtitle: "Scale puzzle" }
                ]
            },
            {
                title: "Teaching",
                items: [
                    { href: "https://github.com/LaCreArthur/FuturaeVampireSurvivor", title: "Vampire Survivor Clone", subtitle: "20 students @ Futurae" },
                    { href: "https://github.com/LaCreArthur/FuturaeScifiTD", title: "Sci-Fi Tower Defense", subtitle: "Architecture patterns" },
                    { href: "https://github.com/LaCreArthur/shortestPathGA", title: "Genetic Pathfinder", subtitle: "Master's thesis" }
                ]
            }
        ]
    },

    about: {
        sectionMarker: "About",
        headline: ["The Human", "Behind The Code"],
        highlightLine: 1,
        bio: "Game developer & founder based in Paris. I love shipping games that people actually play. After 7+ years—from AAA at Ubisoft to founding Sorolla—I've learned that <span class=\"text-teal-400\">the best code is the code that ships.</span>",
        bioExtra: "When not coding: skateboarding (2x French Championship qualifier) or teaching game dev at Futurae school.",
        photo: {
            src: "img/id2018.jpg",
            alt: "Arthur Scheidel"
        },
        name: "Arthur Scheidel",
        location: "Paris, France",
        timeline: [
            { years: "2024-now", role: "Founder", company: "Sorolla (mobile game publishing)", current: true },
            { years: "2024", role: "Senior Unity Engineer", company: "YourArt", current: false },
            { years: "2023", role: "Lead Unity Developer", company: "Yumon", current: false },
            { years: "2022-23", role: "CTO", company: "CARFT (Web3 gaming)", current: false },
            { years: "2019-21", role: "Hyper-Casual Developer", company: "Ketchapp / Ubisoft", current: false },
            { years: "2018", role: "Master's in CS", company: "University of Strasbourg", current: false }
        ]
    },

    contact: {
        sectionMarker: "Contact",
        headline: ["Let's Build", "Something"],
        highlightLine: 1,
        description: "Looking for a Unity developer? Have a project idea? Just want to chat about game dev?",
        info: [
            "Response time: ~24h",
            "Available for: Freelance, Full-time",
            "Location: Paris / Barcelona (remote OK)"
        ],
        form: {
            action: "https://formspree.io/f/xblgjdky",
            redirect: "https://lacrearthur.github.io/",
            fields: {
                email: { label: "Email", placeholder: "you@example.com", type: "email" },
                subject: { label: "Subject", placeholder: "Project inquiry", type: "text" },
                message: { label: "Message", placeholder: "Tell me about your project...", type: "textarea", rows: 5 }
            },
            submitLabel: "Send Message"
        }
    },

    footer: {
        name: "Arthur_Scheidel",
        year: 2026,
        links: [
            { href: "https://github.com/LaCreArthur/", label: "GitHub" },
            { href: "https://www.linkedin.com/in/arthur-scheidel/", label: "LinkedIn" },
            { href: "https://x.com/LaCreArthur", label: "X" },
            { href: "https://youtube.com/c/LaCreArthur", label: "YouTube" },
            { href: "https://lacrearthur.itch.io/", label: "itch.io" }
        ]
    }
};
