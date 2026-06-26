/* Headless render/compile test for the deconf findings page (no browser).
 *   node render_test.cjs
 * Loads deconf_data.js + the page's inline <script> in a vm sandbox with an
 * id-caching DOM shim, runs render(), and asserts the real output content.
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');

// id-caching DOM shim: getElementById returns the SAME element per id so we can
// read back the innerHTML the page set.
function makeEl(id) {
  return {
    id: id || '',
    _innerHTML: '',
    get innerHTML() { return this._innerHTML; },
    set innerHTML(v) { this._innerHTML = String(v); },
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    style: {},
    _attrs: {},
    getAttribute(k) { return this._attrs[k]; },
    setAttribute(k, v) { this._attrs[k] = v; },
    appendChild() {},
    addEventListener() {},
  };
}
const cache = {};
const documentShim = {
  getElementById(id) { return (cache[id] = cache[id] || makeEl(id)); },
  querySelector() { return makeEl(); },
  querySelectorAll() { return []; },     // buttons live in innerHTML strings, not nodes
  createElement() { return makeEl(); },
  addEventListener() {},
  body: makeEl('body'),
};

const sandbox = { console, document: documentShim };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

// data globals first
vm.runInContext(read('deconf_data.js'), sandbox, { filename: 'deconf_data.js' });

// then every inline <script> from the page (external-src scripts have empty bodies)
const html = read('index.html');
let ran = 0;
for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  if (m[1].trim()) { vm.runInContext(m[1], sandbox, { filename: 'inline' }); ran++; }
}

// assertions
const out = [];
const ck = (n, c) => { out.push((c ? 'PASS' : 'FAIL') + '  ' + n); if (!c) process.exitCode = 1; };
const app = cache['app'] ? cache['app']._innerHTML : '';
const det = cache['ex-detail'] ? cache['ex-detail']._innerHTML : '';
const D = sandbox.window.DECONF;

ck('inline script ran', ran >= 1);
ck('DECONF loaded', !!D && D.examples && D.examples.length === 18);
ck('no render error', app.indexOf('render error') === -1 && app.indexOf('failed to load') === -1);
ck('headline 0.917 present', app.indexOf('0.917') !== -1);
ck('all four arms in legend', ['Arm 0','Arm 1','Arm 2','Arm 3'].every(s => app.indexOf(s) !== -1));
ck('training-detail section', app.indexOf('How each arm is trained') !== -1
  && app.indexOf('Hyperparameters') !== -1 && app.indexOf('GRPO') !== -1
  && app.indexOf('warm-start') !== -1 && app.indexOf('meticulous AI researcher') !== -1);
ck('per-arm warm-start recipes present', app.indexOf('leads-the-witness') !== -1
  && app.indexOf('kNN') !== -1 && app.indexOf('contrastive') !== -1);
ck('tests-run section', app.indexOf('Tests run') !== -1 && app.indexOf('grounded-rate judging') !== -1);
ck('fve chart drawn', app.indexOf('<svg') !== -1 && app.indexOf('RL step') !== -1 && app.indexOf('polyline') !== -1);
ck('grounded-rate bars', app.indexOf('grounded-rate') !== -1 || app.indexOf('Grounded-rate') !== -1);
ck('findings rendered', app.indexOf('Two verbalization styles') !== -1);
ck('example browser present', app.indexOf('ex-detail') !== -1 && app.indexOf('Held-out') !== -1);
ck('default example detail rendered', det.indexOf('badge') !== -1 && det.indexOf('armcard') !== -1);
ck('default detail shows a verdict', /badge (grounded|mixed|confabulated)/.test(det));

// exercise DV.show across held-out + training examples
const DV = sandbox.DV;
ck('DV.show is a function', typeof DV.show === 'function');
let threw = null;
try { for (let gi = 0; gi < 18; gi++) DV.show(gi); } catch (e) { threw = e; }
ck('DV.show runs for all 18 without throwing', !threw);
DV.show(2);  // HO2 teaching example (WV pottery): filter=confabulated, evidence=grounded
const ho2 = cache['ex-detail']._innerHTML;
ck('HO2 shows confabulated + grounded verdicts', ho2.indexOf('confabulated') !== -1 && ho2.indexOf('grounded') !== -1);
ck('HO2 shows a flagged claim (Arkansas)', ho2.indexOf('Arkansas') !== -1);
DV.show(12); // first training example
const tr0 = cache['ex-detail']._innerHTML;
ck('training example shows warm-start (t=0)', tr0.indexOf('warm-start (t=0)') !== -1 && tr0.indexOf('post-RL') !== -1);

// eval-suite reproduction section
ck('eval-suite section present', app.indexOf('NLA paper eval-suite reproduction') !== -1
  && app.indexOf('48') !== -1 && app.indexOf('evaluations catalogued') !== -1);
ck('catalog has all 6 sections', ['Case Studies','Auditing benchmark','evaluation awareness']
  .every(s => app.toLowerCase().indexOf(s.toLowerCase()) !== -1));
ck('reproducibility tag pills rendered', app.indexOf('Reproduced — open arms') !== -1
  && app.indexOf('Needs the model organism') !== -1 && app.indexOf('Closed-model internals') !== -1);
ck('confab-by-specificity table', app.indexOf('Theme %true') !== -1
  && app.indexOf('Detail %true') !== -1 && app.indexOf('claims/expl') !== -1);
ck('writing-quality reproduced', app.indexOf('Writing quality (0') !== -1);
ck('already-on-site cross-refs', app.indexOf('Factual Accuracy') !== -1
  && app.indexOf('FVE training dynamics') !== -1);
const D2 = sandbox.window.DECONF;
ck('eval_suite data: 48 catalogued', D2.eval_suite && D2.eval_suite.summary.total === 48);
ck('eval_suite reproduced >= 2', D2.eval_suite && D2.eval_suite.reproduced.length >= 2);
const hasAware = D2.eval_suite && D2.eval_suite.reproduced.some(r => r.key === 'eval_awareness');
if (hasAware) {
  ck('eval-awareness table rendered', app.indexOf('Sensitivity (eval)') !== -1
    && app.indexOf('Separation') !== -1 && app.indexOf('False-pos (deploy)') !== -1);
  ck('suffix-prediction table rendered', app.indexOf('10-way accuracy') !== -1);
  ck('eval-awareness caveat shown', app.indexOf('on-distribution analog') !== -1);
}
// new arm-based evals (steganography + claim-removal; behavioural if present)
ck('steganography card present', D2.eval_suite.reproduced.some(r => r.key === 'steganography')
  && app.indexOf('FVE-maintained') !== -1);
ck('claim-removal card present', D2.eval_suite.reproduced.some(r => r.key === 'claim_removal')
  && app.indexOf('claim verifier') !== -1);
ck('generic table renders (French col)', app.indexOf('French') !== -1);
// hosted Llama-70B NLA subsection
ck('hosted reproduced subsection', D2.eval_suite.reproduced_hosted
  && D2.eval_suite.reproduced_hosted.length >= 4
  && app.indexOf('Reproduced on the hosted Llama-3.3-70B NLA') !== -1);
ck('safety-sandbagging card present', D2.eval_suite.reproduced_hosted.some(r => r.key === 'safety_sandbagging')
  && app.indexOf('answered correctly') !== -1);
ck('language-switching case study', D2.eval_suite.reproduced_hosted.some(r => r.key === 'language_switching'));
ck('hosted eval-awareness corpus', D2.eval_suite.reproduced_hosted.some(r => r.key === 'eval_awareness_corpus'));
// organism gap note
ck('organism-gap note rendered', D2.eval_suite.organism_gap
  && app.indexOf('auditing-game gap') !== -1
  && app.indexOf('out-of-distribution') !== -1);
ck('organism-gap links rendered', app.indexOf('arxiv.org/abs/2503.10965') !== -1
  && app.indexOf('auditing-agents/llama-3.3-70b-dpo-rt-lora') !== -1);
// summary count consistency
ck('summary reproduced_here matches arms+hosted',
  D2.eval_suite.summary.reproduced_here === (D2.eval_suite.reproduced.length + D2.eval_suite.reproduced_hosted.length));
// SAE consistency (arms) + blackmail + answer-thrashing (hosted)
ck('SAE-consistency card present', D2.eval_suite.reproduced.some(r => r.key === 'sae_consistency')
  && app.indexOf('SAE Consistency') !== -1 && app.indexOf('polysemantic') !== -1);
ck('blackmail case study present', D2.eval_suite.reproduced_hosted.some(r => r.key === 'blackmail')
  && app.indexOf('Agentic Misalignment') !== -1);
ck('answer-thrashing honest negative present', D2.eval_suite.reproduced_hosted.some(r => r.key === 'answer_thrashing')
  && app.indexOf('honest negative') !== -1);

// Phase-1 held-out FVE / length / shortening-tradeoff section
ck('phase1 data present (4 arms)', D2.phase1 && D2.phase1.arms && D2.phase1.arms.length === 4);
ck('phase1 arms have fve_own + length + curve', D2.phase1
  && D2.phase1.arms.every(a => a.fve_own != null && a.length != null && Array.isArray(a.curve) && a.curve.length >= 3));
ck('phase1 section heading + renumber', app.indexOf('4.</span>Held-out reconstruction') !== -1
  && app.indexOf('shortening tradeoff') !== -1 && app.indexOf('5.</span>Grounded-rate') !== -1);
ck('phase1 FVE-vs-length scatter drawn', app.indexOf('FVE vs explanation length') !== -1
  && app.indexOf('explanation length (tokens)') !== -1 && app.indexOf('<circle') !== -1);
ck('phase1 truncation curve drawn', app.indexOf('Which tokens pay rent') !== -1
  && app.indexOf('fraction of explanation tokens kept') !== -1 && app.indexOf('<polyline') !== -1);
ck('phase1 table columns present', app.indexOf('FVE (own critic)') !== -1
  && app.indexOf('FVE (common critic)') !== -1 && app.indexOf('CJK frac') !== -1);
ck('downstream sections renumbered', app.indexOf('6.</span>NLA paper eval-suite reproduction') !== -1
  && app.indexOf('7.</span>Findings') !== -1 && app.indexOf('11.</span>Caveats') !== -1);
ck('phase1 prefix-rent finding rendered', app.indexOf('anti-informative') !== -1
  && app.indexOf('pays rent') !== -1);
ck('phase1 interpretation note rendered', app.indexOf('deliberately complicate the headline') !== -1);
ck('phase1 common-critic caveat in finding', app.indexOf('not under a shared one') !== -1);

console.log(out.join('\n'));
console.log(out.some(l => l.startsWith('FAIL')) ? '\nRESULT: FAIL' : '\nRESULT: PASS');
