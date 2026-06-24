#!/usr/bin/env node

/*
 * Canonical-fact drift guard.
 *
 * The site keeps the same facts in several hand-edited surfaces (index.html,
 * resume.html, llms.txt). This script asserts they stay in agreement so a
 * single-surface miss (the exact failure that shipped before) becomes a loud,
 * pre-push error instead of silent drift. Facts stay authored inline; this only
 * checks them. Run: `npm run check:facts` (do it before pushing to master).
 *
 * Limit: this is substring presence/absence, not semantic equivalence. It catches
 * "you forgot to update surface X", not "you reworded X differently". Update the
 * PRESENT/FORBIDDEN tables below when a canonical fact legitimately changes.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SURFACES = ['index.html', 'resume.html', 'llms.txt'];

// Each fact must have at least one of `any` present in every file of `in`.
const PRESENT = [
    { name: 'games shipped (20+)', any: ['20+'], in: SURFACES },
    { name: 'education year (2017)', any: ['2017'], in: SURFACES },
    { name: 'University of Strasbourg', any: ['Strasbourg'], in: SURFACES },
    {
        name: 'Sorolla technical co-founder',
        any: ['Technical Co-Founder', 'Technical co-founder', 'technical co-founder'],
        in: SURFACES
    },
    { name: 'skate count (3x)', any: ['3x', '3×', '3&times;'], in: SURFACES },
    { name: 'skate latest season (2026)', any: ['2026'], in: SURFACES }
];

// Stale strings that must NOT appear in any surface (catch a half-finished update).
const FORBIDDEN = [
    { pattern: 'Two-time French', why: 'stale skate count (should be three-time / 3x)' },
    { pattern: '2× French', why: 'stale skate count (should be 3×)' },
    { pattern: '2x French', why: 'stale skate count (should be 3x)' },
    { pattern: '2&times; French', why: 'stale skate count (should be 3&times;)' },
    { pattern: 'resume.pdf', why: 'resume.html is the entry point; never link the PDF directly' }
];

function read(file) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) return null;
    return fs.readFileSync(full, 'utf8');
}

function main() {
    const cache = new Map();
    const text = file => {
        if (!cache.has(file)) cache.set(file, read(file));
        return cache.get(file);
    };

    const failures = [];

    for (const fact of PRESENT) {
        for (const file of fact.in) {
            const body = text(file);
            if (body === null) {
                failures.push(`MISSING FILE ${file} (needed for "${fact.name}")`);
                continue;
            }
            if (!fact.any.some(s => body.includes(s))) {
                failures.push(`MISSING "${fact.name}" in ${file} (expected one of: ${fact.any.join(', ')})`);
            }
        }
    }

    for (const file of SURFACES) {
        const body = text(file);
        if (body === null) continue;
        for (const rule of FORBIDDEN) {
            if (body.includes(rule.pattern)) {
                failures.push(`STALE "${rule.pattern}" in ${file} (${rule.why})`);
            }
        }
    }

    const checks = PRESENT.reduce((n, f) => n + f.in.length, 0) + SURFACES.length * FORBIDDEN.length;
    console.log(`Checked ${checks} fact assertions across ${SURFACES.length} surfaces: ${failures.length} failures.`);
    failures.forEach(line => console.error(`FAIL ${line}`));

    if (!failures.length) console.log('All canonical facts agree.');
    process.exit(failures.length ? 1 : 0);
}

main();
