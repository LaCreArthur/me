#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const https = require('node:https');

const ROOT = path.resolve(__dirname, '..');
const SITE_PREFIX = 'https://lacrearthur.github.io/me/';
const FILES = [
    'index.html',
    'js/data.js',
    'README.md',
    'llms.txt',
    'resume.md',
    'resume.html',
    'robots.txt',
    'sitemap.xml'
];

const EXPECTED = [
    {
        test: url => url.startsWith('https://formspree.io/'),
        ok: status => status === 405,
        note: 'Formspree form actions return 405 to GET checks.'
    },
    {
        test: url => url.includes('linkedin.com/in/arthur-scheidel'),
        ok: status => status === 999 || (status >= 200 && status < 400),
        note: 'LinkedIn often bot-blocks automated checks.'
    }
];

function extractUrls(file) {
    const fullPath = path.join(ROOT, file);
    if (!fs.existsSync(fullPath)) return [];

    const text = fs.readFileSync(fullPath, 'utf8');
    return [...text.matchAll(/https?:\/\/[^\s"'<>`)]+/g)]
        .map(match => match[0].replace(/[.,;)]$/, ''))
        .map(url => ({ file, url }));
}

function check(url) {
    return new Promise(resolve => {
        if (url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost')) {
            resolve({ url, status: 'SKIP', redirects: [], skipped: true, note: 'Local preview URL.' });
            return;
        }

        if (url === SITE_PREFIX || url.startsWith(SITE_PREFIX)) {
            const localPath = urlToLocalPath(url);
            if (localPath) {
                resolve({
                    url,
                    status: fs.existsSync(localPath) ? 200 : 404,
                    redirects: [],
                    localPath
                });
                return;
            }
        }

        const parsed = new URL(url);
        const client = parsed.protocol === 'http:' ? http : https;
        const req = client.request(url, {
            method: 'GET',
            headers: { 'User-Agent': 'Mozilla/5.0 portfolio-link-check' },
            timeout: 12000
        }, res => {
            const location = res.headers.location;
            res.resume();

            if (location && res.statusCode >= 300 && res.statusCode < 400) {
                const nextUrl = new URL(location, url).toString();
                check(nextUrl).then(result => resolve({
                    ...result,
                    redirects: [url, ...(result.redirects || [])]
                }));
                return;
            }

            resolve({ url, status: res.statusCode, redirects: [] });
        });

        req.on('timeout', () => {
            req.destroy(new Error('timeout'));
        });

        req.on('error', error => {
            resolve({ url, status: 0, error: error.message, redirects: [] });
        });

        req.end();
    });
}

function urlToLocalPath(url) {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    if (!pathname.startsWith('/me/')) return null;

    pathname = pathname.slice('/me/'.length);
    if (!pathname || pathname.endsWith('/')) {
        pathname = path.join(pathname, 'index.html');
    }

    const localPath = path.resolve(ROOT, pathname);
    return localPath.startsWith(ROOT) ? localPath : null;
}

function isExpected(url, status) {
    return EXPECTED.find(rule => rule.test(url) && rule.ok(status));
}

async function main() {
    const unique = new Map();
    FILES.flatMap(extractUrls).forEach(entry => {
        if (!unique.has(entry.url)) {
            unique.set(entry.url, { url: entry.url, files: new Set() });
        }
        unique.get(entry.url).files.add(entry.file);
    });

    const entries = [...unique.values()];
    const results = [];

    for (const entry of entries) {
        const result = await check(entry.url);
        const expected = isExpected(entry.url, result.status);
        const ok = result.skipped || expected || (result.status >= 200 && result.status < 400);
        results.push({ ...result, sourceUrl: entry.url, files: [...entry.files], ok, expected });
    }

    const failures = results.filter(result => !result.ok);
    const skipped = results.filter(result => result.skipped);
    const expected = results.filter(result => result.expected);
    const passed = results.filter(result => result.ok && !result.expected && !result.skipped);

    console.log(`Checked ${results.length} URLs: ${passed.length} ok, ${expected.length} expected exceptions, ${skipped.length} skipped, ${failures.length} failures.`);

    expected.forEach(result => {
        console.log(`EXPECTED ${result.status} ${result.sourceUrl} (${result.expected.note})`);
    });

    skipped.forEach(result => {
        console.log(`SKIP ${result.sourceUrl} (${result.note})`);
    });

    failures.forEach(result => {
        const suffix = result.error ? ` ${result.error}` : '';
        console.error(`FAIL ${result.status} ${result.sourceUrl} in ${result.files.join(',')}${suffix}`);
    });

    process.exit(failures.length ? 1 : 0);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
