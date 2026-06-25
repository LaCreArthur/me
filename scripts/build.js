#!/usr/bin/env node

/*
 * SSOT build: render the content surfaces from content.json + templates/.
 *
 * content.json owns atomic facts (numbers, dates, skate count, education, role
 * tenures, links, head copy). templates/ hold the design + prose with {{token}}
 * placeholders. This injects the facts and writes index.html, resume.html, and
 * llms.txt. The shipped files are plain static HTML/text with no runtime step.
 *
 * Edit facts in content.json, edit design/prose in templates/, then: npm run build.
 * Never hand-edit the generated root files; `npm run check:build` enforces that.
 *
 * One canonical value derives every surface form, e.g. skate { count, seasons }
 * yields 3x / 3&times; / 3x / Three-time / '24-'26 / the JSON-LD award string.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const NDASH = '–';   // en dash, used in date ranges (2024-now style)
const TIMES = '×';   // multiplication sign, used in "3x" skate stat glyph
const ORDINALS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

const content = JSON.parse(fs.readFileSync(path.join(ROOT, 'content.json'), 'utf8'));

function yy(year) { return "'" + String(year).slice(2); }

// Compact display range (timeline / resume): 2025-now, 2022-23, 2018-19, 2019.
function range(r) {
  if (r.end === 'now') return r.start + NDASH + 'now';
  if (r.end == null || r.end === r.start) return String(r.start);
  if (r.end >= 2000 && Math.floor(r.end / 100) === Math.floor(r.start / 100)) {
    return r.start + NDASH + String(r.end).slice(2);
  }
  return r.start + NDASH + r.end;
}

// Long display range (llms.txt): 2025-present, 2022-2023, 2019.
function present(r) {
  if (r.end === 'now') return r.start + '-present';
  if (r.end == null || r.end === r.start) return String(r.start);
  return r.start + '-' + r.end;
}

// Derived tokens (everything that has more than one surface form).
const computed = {};
for (const [id, m] of Object.entries(content.metrics)) {
  computed['metrics.' + id + '.display'] = m.count + (m.suffix || '');
}
const s = content.skate;
computed['skate.x'] = s.count + 'x';
computed['skate.times'] = s.count + '&times;';
computed['skate.glyph'] = s.count + TIMES;
computed['skate.word'] = (ORDINALS[s.count] || String(s.count)) + '-time';
computed['skate.seasons'] = s.seasons.join(', ');
computed['skate.seasonsAmp'] = s.seasons.length > 1
  ? s.seasons.slice(0, -1).join(', ') + ' &amp; ' + s.seasons[s.seasons.length - 1]
  : String(s.seasons[0]);
computed['skate.short'] = yy(s.seasons[0]) + NDASH + yy(s.seasons[s.seasons.length - 1]);
computed['skate.jsonld'] = computed['skate.x'] + ' French Skateboard Championship Qualifier (' + computed['skate.seasons'] + ')';
for (const [id, r] of Object.entries(content.roles)) {
  computed['role.' + id + '.title'] = r.title;
  computed['role.' + id + '.org'] = r.org;
  computed['role.' + id + '.range'] = range(r);
  computed['role.' + id + '.present'] = present(r);
}

function lookup(key) {
  if (key in computed) return computed[key];
  let v = content;
  for (const part of key.split('.')) {
    if (v == null || typeof v !== 'object') return undefined;
    v = v[part];
  }
  return (typeof v === 'object') ? undefined : v;
}

const TOKEN = /\{\{\s*([\w.]+)\s*\}\}/g;
const FILES = ['index.html', 'resume.html', 'llms.txt'];
const CHECK = process.argv.includes('--check');   // compare, do not write (CI / pre-push guard)

let failures = 0;
let stale = 0;
for (const file of FILES) {
  const tplPath = path.join(ROOT, 'templates', file);
  if (!fs.existsSync(tplPath)) { console.error('MISSING template ' + file); failures++; continue; }
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const missing = new Set();
  const out = tpl.replace(TOKEN, (m, key) => {
    const v = lookup(key);
    if (v === undefined) { missing.add(key); return m; }
    return String(v);
  });
  if (missing.size) {
    console.error('UNKNOWN token(s) in templates/' + file + ': ' + [...missing].join(', '));
    failures++;
    continue;
  }
  const outPath = path.join(ROOT, file);
  if (CHECK) {
    const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : '';
    if (current !== out) { console.error('STALE ' + file + ' (run: npm run build)'); stale++; }
  } else {
    fs.writeFileSync(outPath, out);
    console.log('built ' + file);
  }
}

if (failures) process.exit(1);
if (CHECK) {
  if (stale) process.exit(1);
  console.log('Generated surfaces are up to date.');
} else {
  console.log('SSOT build OK.');
}
