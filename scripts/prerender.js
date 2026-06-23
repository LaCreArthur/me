/**
 * Pre-render the portfolio to a fully static index.html.
 *
 * Reads the canonical content from js/data.js, runs the pure render functions in
 * js/components.js, and writes the complete HTML (head + body content) to index.html.
 * Run via `npm run build`. The shipped page contains real content with no client-side
 * rendering; js/interactive.js only adds progressive-enhancement behaviour.
 */

const fs = require('fs');
const path = require('path');

const { DATA } = require('../js/data.js');
const { renderHead, renderBody } = require('../js/components.js');

const html = `<!DOCTYPE html>
<html lang="en">

<head>${renderHead(DATA)}
</head>

<body class="bg-black text-gray-200 overflow-x-hidden grid-lines">
    <div id="app">${renderBody(DATA)}</div>

    <script src="js/interactive.js"></script>
</body>

</html>
`;

const outPath = path.join(__dirname, '..', 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Wrote ' + outPath + ' (' + html.length + ' bytes)');
