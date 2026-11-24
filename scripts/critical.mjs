import fs from 'fs'; import path from 'path'; import Beasties from 'beasties';
const b = new Beasties({ path: 'dist', publicPath: '/', preload: 'media', pruneSource: false, inlineFonts: false, preloadFonts: false, keyframes: 'all', logLevel: 'warn' });
const walk = d => fs.readdirSync(d,{withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(d,e.name)) : e.name.endsWith('.html') ? [path.join(d,e.name)] : []);
let n=0; for (const f of walk('dist')) { fs.writeFileSync(f, await b.process(fs.readFileSync(f,'utf8'))); n++; }
console.log('critical CSS inlined in', n, 'pages');
