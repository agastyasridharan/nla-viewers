/* Headless render/compile test for the lightweight summary page (no browser).
 *   node summary_test.cjs
 * Boots deconf_data.js + summary.html's inline <script> in a vm sandbox with an
 * id-caching DOM shim, runs render(), and asserts the real output content.
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');

function makeEl(id) {
  return {
    id: id || '', _innerHTML: '',
    get innerHTML() { return this._innerHTML; },
    set innerHTML(v) { this._innerHTML = String(v); },
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    style: {}, _attrs: {},
    getAttribute(k) { return this._attrs[k]; },
    setAttribute(k, v) { this._attrs[k] = v; },
    appendChild() {}, addEventListener() {},
  };
}
const cache = {};
const documentShim = {
  getElementById(id) { return (cache[id] = cache[id] || makeEl(id)); },
  querySelector() { return makeEl(); },
  querySelectorAll() { return []; },
  createElement() { return makeEl(); },
  addEventListener() {},
  body: makeEl('body'),
};
const sandbox = { console, document: documentShim };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

vm.runInContext(read('deconf_data.js'), sandbox, { filename: 'deconf_data.js' });
const html = read('summary.html');
let ran = 0;
for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  if (m[1].trim()) { vm.runInContext(m[1], sandbox, { filename: 'inline' }); ran++; }
}

const out = [];
const ck = (n, c) => { out.push((c ? 'PASS' : 'FAIL') + '  ' + n); if (!c) process.exitCode = 1; };
const app = cache['app'] ? cache['app']._innerHTML : '';
const det = cache['ex-detail'] ? cache['ex-detail']._innerHTML : '';
const D = sandbox.window.DECONF;

ck('inline script ran', ran >= 1);
ck('DECONF loaded', !!D && D.examples && D.examples.length === 18);
ck('no render error', app.indexOf('render error') === -1 && app.indexOf('failed to load') === -1);

// (a) the four arms — human-sentence recipes, all four present
ck('has the three sections', app.indexOf('The four arms') !== -1
  && app.indexOf('Reconstruction quality (FVE)') !== -1
  && app.indexOf('Example explanations') !== -1);
ck('all four arm labels present', ['Arm 0','Arm 1','Arm 2','Arm 3'].every(s => app.indexOf(s) !== -1));
ck('arm recipes are the canonical human sentences', app.indexOf('leads-the-witness') !== -1
  && app.indexOf('kNN') !== -1 && app.indexOf('contrastive') !== -1
  && app.indexOf('never seeing the row') !== -1);
ck('arm tags present', app.indexOf('control') !== -1
  && app.indexOf('activation-derived evidence') !== -1);

// (b) FVE scores — a number for every arm, both critics, plus training FVE
ck('FVE definition present', app.indexOf('fraction of variance explained') !== -1
  && app.indexOf('perfect recovery') !== -1);
ck('held-out own-critic FVE for each arm', ['0.498','0.515','0.518','0.464'].every(s => app.indexOf(s) !== -1));
ck('shared-critic FVE drop for arm3 shown', app.indexOf('0.293') !== -1);
ck('training final FVE shown (%)', app.indexOf('53.6%') !== -1 && app.indexOf('48.1%') !== -1);
ck('FVE bars drawn', app.indexOf('class="fbar"') !== -1);
ck('FVE honest note present', app.indexOf('within noise') !== -1
  && app.indexOf('only its own reconstructor learned to invert') !== -1);

// (c) example explanations with the activation's document for context
ck('example browser present', app.indexOf('Held-out') !== -1 && app.indexOf('__showEx(') !== -1
  && app.indexOf('id="ex-detail"') !== -1);
ck('default example rendered (context + 4 cards)', det.indexOf('class="ctx"') !== -1
  && det.indexOf('armcard') !== -1 && det.indexOf('activation at token') !== -1);
ck('default example shows all four arms', ['Arm 0','Arm 1','Arm 2','Arm 3'].every(s => det.indexOf(s) !== -1));
ck('default example shows a verdict badge', /badge (grounded|mixed|confabulated)/.test(det));

// exercise showEx across every example
let threw = null;
try { for (let gi = 0; gi < D.examples.length; gi++) sandbox.window.__showEx(gi); } catch (e) { threw = e; }
ck('__showEx runs for all examples without throwing', !threw);

// HO2 (WV pottery teaching example): filter confabulates, evidence is grounded
sandbox.window.__showEx(2);
const ho2 = cache['ex-detail']._innerHTML;
ck('HO2 shows confabulated + grounded verdicts', ho2.indexOf('confabulated') !== -1 && ho2.indexOf('grounded') !== -1);
ck('HO2 shows its document context', ho2.indexOf('Donaghho') !== -1 || ho2.indexOf('Parkersburg') !== -1);

console.log(out.join('\n'));
console.log(out.some(l => l.startsWith('FAIL')) ? '\nRESULT: FAIL' : '\nRESULT: PASS');
