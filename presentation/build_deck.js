// Builds QuantumHeadache_AntennaTilt.pptx (5-minute hackathon pitch, 12 slides).
// Run: powershell -ExecutionPolicy Bypass -File "$HOME\.agents\skills\working-with-pptx\scripts\run-pptx-node.ps1" C:\Projects\Hackton\group\presentation\build_deck.js
const pptxgen = require('pptxgenjs');
const path = require('path');

const G = 'C:/Projects/Hackton/group/';
const img = (p) => path.join(G, p);

const C = {
  bg: '0B1020', panel: '141B33', ink: 'F5F7FF', muted: 'A9B4D0',
  accent: '7C5CFF', accent2: '2BD4C2', warn: 'FFB454', red: 'FF5C7A',
};
const FONT = 'Calibri';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
pptx.author = 'Team Quantum Headache';
pptx.title = 'Antenna Tilt with QAOA — QUBIT 2026';

const TOTAL = 13;
let slideNo = 0;
function numberSlide(s) {
  slideNo += 1;
  s.addShape(pptx.ShapeType.roundRect, { x: 11.35, y: 6.6, w: 1.75, h: 0.7, fill: { color: C.accent }, line: { color: C.accent }, rectRadius: 0.1 });
  s.addText(slideNo + ' / ' + TOTAL, { x: 11.35, y: 6.6, w: 1.75, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: C.ink, align: 'center', valign: 'middle', margin: 0 });
}
function base(title, kicker) {
  const s = pptx.addSlide();
  numberSlide(s);
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.accent } });
  if (kicker) s.addText('SLIDE ' + slideNo + ' / ' + TOTAL + '   |   ' + kicker.toUpperCase(), { x: 0.6, y: 0.35, w: 12, h: 0.3, fontFace: FONT, fontSize: 11, color: C.accent2, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.65, w: 12.1, h: 0.75, fontFace: FONT, fontSize: 32, bold: true, color: C.ink, margin: 0 });
  s.addText('Quantum Headache · QUBIT 2026 · Antenna Tilt', { x: 0.6, y: 7.05, w: 8, h: 0.3, fontFace: FONT, fontSize: 10, color: C.muted, margin: 0 });
  return s;
}
function bullets(s, items, o) {
  s.addText(items.map((t) => ({ text: t, options: { bullet: { code: '25B8' }, breakLine: true, paraSpaceAfter: 6 } })),
    { fontFace: FONT, fontSize: o.fontSize || 16, color: C.ink, valign: 'top', margin: 0.05, ...o });
}
function stat(s, x, y, w, big, small, color) {
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 1.35, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText(big, { x, y: y + 0.12, w, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: color || C.accent2, align: 'center', margin: 0 });
  s.addText(small, { x: x + 0.1, y: y + 0.8, w: w - 0.2, h: 0.5, fontFace: FONT, fontSize: 11, color: C.muted, align: 'center', margin: 0 });
}
function caption(s, text, x, y, w) {
  s.addText(text, { x, y, w, h: 0.35, fontFace: FONT, fontSize: 10.5, color: C.muted, italic: true, margin: 0 });
}

// ---------- 1. Title ----------
{
  const s = pptx.addSlide();
  numberSlide(s);
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.25, fill: { color: C.accent } });
  s.addText('QUBIT 2026 HACKATHON · CHALLENGE: ANTENNA TILT', { x: 0.8, y: 1.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 14, color: C.accent2, bold: true, charSpacing: 3, margin: 0 });
  s.addText('Tilting 6 Tel Aviv antennas\nwith a 12-qubit QAOA', { x: 0.8, y: 2.1, w: 11.5, h: 2.0, fontFace: FONT, fontSize: 48, bold: true, color: C.ink, margin: 0 });
  s.addText('Real OpenCelliD data → cost Hamiltonian → Classiq circuit → Wolfram exact simulation → Lean 4 proof', { x: 0.8, y: 4.2, w: 11.5, h: 0.6, fontFace: FONT, fontSize: 18, color: C.muted, margin: 0 });
  s.addText('Team Quantum Headache', { x: 0.8, y: 5.6, w: 6, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: C.ink, margin: 0 });
  s.addText('5-minute demo · September 2026', { x: 0.8, y: 6.05, w: 6, h: 0.4, fontFace: FONT, fontSize: 14, color: C.muted, margin: 0 });
  s.addNotes('0:00–0:20. One sentence: we optimise the down-tilt of 6 real Tel Aviv sector antennas with QAOA, ran it on Classiq, and verified every number two independent ways. Everything shown is reproducible from the group folder.');
}

// ---------- 2. Problem ----------
{
  const s = base('The problem: pick one down-tilt per antenna', 'Problem');
  s.addImage({ path: img('charts/map_small.jpg'), x: 0.6, y: 1.55, w: 7.6, h: 3.83 });
  caption(s, 'Two real 3-sector sites from OpenCelliD (Ayalon, Tel Aviv). Left: all tilts 0. Right: optimum plan — only A1 tilts to level 3.', 0.6, 5.42, 7.6);
  bullets(s, [
    '6 sector antennas A0…A5, 4 tilt levels each → 4⁶ = 4096 plans',
    'Tilting down: less interference on neighbours, less coverage',
    'Cost(t) = tᵀ I t − 1.5 · c·t + 0.3 · Σt   (interference − coverage + penalty)',
    'Classical brute force: unique optimum −2.844 at (0,3,0,0,0,0)',
    'Real networks: 100s of antennas × 10 levels → intractable → quantum',
  ], { x: 8.5, y: 1.6, w: 4.4, h: 4.6, fontSize: 14 });
  s.addNotes('0:20–1:00. Data: opencellid_il2.csv, two 3-sector sites, interference matrix from geometry. 4096 plans is small on purpose: it lets us check the quantum answer exactly. The real operator problem (hundreds of antennas, 10 levels) has no exact classical check — that is where QAOA is meant to go.');
}

// ---------- 3. Encoding ----------
{
  const s = base('Encoding: 2 qubits per antenna, 12 qubits total', 'Model');
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.6, w: 6.0, h: 2.35, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText([
    { text: 'tiltᵢ = q₂ᵢ + 2·q₂ᵢ₊₁ ∈ {0,1,2,3}', options: { fontSize: 20, bold: true, color: C.accent2, breakLine: true } },
    { text: 'qᵢ = (1 − Zᵢ)/2  →  Cost becomes a Pauli-Z polynomial', options: { fontSize: 14, color: C.ink, breakLine: true } },
    { text: 'H_C = c₀·I + Σ hᵢ Zᵢ + Σ Jᵢⱼ ZᵢZⱼ', options: { fontSize: 18, bold: true, color: C.ink, breakLine: true } },
    { text: '73 terms: 1 identity + 12 Z + 60 ZZ — strictly 2-local, no ZZZ', options: { fontSize: 14, color: C.muted } },
  ], { x: 0.8, y: 1.7, w: 5.6, h: 2.15, fontFace: FONT, valign: 'middle', margin: 0.05 });
  stat(s, 0.6, 4.2, 1.9, '12', 'qubits', C.accent2);
  stat(s, 2.65, 4.2, 1.9, '73', 'Pauli terms', C.accent2);
  stat(s, 4.7, 4.2, 1.9, '2-local', 'ZZ max weight', C.accent2);
  bullets(s, [
    'Why binary (2 qubits) and not one-hot (4 qubits) or a dense 5-qubit pack?',
    'Binary keeps H_C quadratic → only RZ and CX gates after ZZ decomposition',
    'Fits Classiq student edition comfortably; 15 parallel jobs used for sweeps',
    'QAOA layer: phase exp(+iγ H_C) then mixer RX(2β) on every qubit',
    'Verified by Walsh–Hadamard: Pauli table reproduces all 4096 costs exactly',
  ], { x: 6.9, y: 1.6, w: 6.0, h: 4.2, fontSize: 14 });
  s.addNotes('1:00–1:40. Each antenna is a 2-bit number. Substituting q=(1−Z)/2 into the quadratic cost gives a Hamiltonian with only Z and ZZ terms — 73 in total, computed by gates/pauli_decomposition.py and checked against the full cost table. 2-local means the phase layer is 72 RZ rotations and CX ladders; no expensive multi-controlled gates.');
}

// ---------- 4. Circuit ----------
{
  const s = base('The circuit Classiq synthesised', 'Gates');
  s.addImage({ path: img('charts/circuit_stats.png'), x: 0.6, y: 1.55, w: 7.4, h: 3.89 });
  stat(s, 8.3, 1.6, 2.2, '59', 'depth, p = 1', C.accent2);
  stat(s, 10.7, 1.6, 2.2, '114', 'depth, p = 2', C.accent2);
  stat(s, 8.3, 3.15, 2.2, '92 CX', '+ 72 RZ + 12 H + 12 RX', C.warn);
  stat(s, 10.7, 3.15, 2.2, '184 CX', '+ 144 RZ + 12 H + 24 RX', C.warn);
  bullets(s, [
    'Written in Qmod: QStruct of QArray[QNum[2], 6], phase(cost, γ), RX mixer',
    'Exported as OpenQASM 3 (group/classiq/results/*.qasm) + hand-written QASM 2 layer',
    'Same circuit re-simulated in Qiskit statevector: ⟨C⟩ = 1.9985 — identical to Wolfram',
  ], { x: 8.3, y: 4.7, w: 4.6, h: 1.9, fontSize: 12.5 });
  s.addNotes('1:40–2:10. The Qmod program uses Classiq\'s phase() on a QNum arithmetic expression, so the compiler builds the ZZ ladder for us. Transpiled: 12 qubits, depth 59 for one layer. We exported QASM3 and cross-checked a hand-written QASM2 of the same layer with Qiskit — three engines, same expectation value.');
}

// ---------- 5. Wolfram ----------
{
  const s = base('Wolfram exact simulation: where the good angles are', 'Simulation');
  s.addImage({ path: img('wolfram/img/landscape.png'), x: 0.6, y: 1.55, w: 5.3, h: 5.05 });
  caption(s, '⟨C⟩(γ, β) for p = 1 over all 4096 amplitudes (statevector, no shot noise).', 0.6, 6.62, 5.3);
  stat(s, 6.3, 1.6, 3.2, '(0.0654, 1.1293)', 'optimal (γ, β), p = 1', C.accent2);
  stat(s, 9.7, 1.6, 3.2, '⟨C⟩ = 1.9985', 'p = 1 (random: 35.5)', C.accent2);
  stat(s, 6.3, 3.15, 3.2, '⟨C⟩ = −0.3825', 'p = 2, 4 angles', C.warn);
  stat(s, 9.7, 3.15, 3.2, '−2.844', 'ground state = classical optimum', C.warn);
  bullets(s, [
    'Notebook + PDF + CDF + Markdown in group/wolfram/ (14 pages, 13 figures)',
    'Landscape is flat almost everywhere — a bad start sits on a plateau at ⟨C⟩ ≈ 35',
    'Angles found here are the warm start we hand to Classiq',
    'Also in the notebook: VQE (RY+CZ), Grover on a 2-antenna slice, 10-level scaling',
  ], { x: 6.3, y: 4.7, w: 6.6, h: 2.0, fontSize: 13 });
  s.addNotes('2:10–2:50. Wolfram lets us do the full 4096-dimensional statevector and scan the whole (γ,β) plane. The optimum is a narrow valley; most of the plane is a plateau — that will matter on Classiq. These optimal angles are exported to JSON and used as warm start in the Classiq run.');
}

// ---------- 6. Quantum gain ----------
{
  const s = base('What the quantum sampler buys us', 'Result');
  s.addImage({ path: img('charts/quantum_gain.png'), x: 0.6, y: 1.55, w: 6.2, h: 3.49 });
  s.addImage({ path: img('wolfram/img/shots.png'), x: 6.95, y: 1.55, w: 5.95, h: 2.85 });
  caption(s, 'Shots needed for 95% chance of sampling the exact optimum (Wolfram).', 6.95, 4.42, 5.95);
  stat(s, 0.6, 5.2, 2.9, '2.4% → 67%', 'P(cost < 0), random → p = 2', C.accent2);
  stat(s, 3.65, 5.2, 2.9, '12270 → 342', 'shots to hit optimum (95%)', C.accent2);
  bullets(s, [
    'Half of all samples at p = 1 and two-thirds at p = 2 are already better than the baseline',
    'Only 1–2 QAOA layers; more layers or larger p continue to sharpen the distribution',
  ], { x: 6.95, y: 5.2, w: 5.95, h: 1.4, fontSize: 13 });
  s.addNotes('2:50–3:20. The headline: a random plan is better than baseline 2.4% of the time; after one QAOA layer 53%; after two, 67%. The expected number of shots to see the exact optimum drops from over 12 000 to about 340. That is the gain, measured on the exact statevector and reproduced in shots on Classiq.');
}

// ---------- 7. Classiq run ----------
{
  const s = base('Same numbers from the Classiq simulator', 'Classiq');
  s.addImage({ path: img('charts/wolfram_vs_classiq.png'), x: 0.6, y: 1.55, w: 8.0, h: 3.27 });
  stat(s, 8.9, 1.6, 4.0, '2.0203 vs 1.9985', '⟨C⟩ p = 1, 4096 shots vs exact', C.accent2);
  stat(s, 8.9, 3.15, 4.0, '0.529 vs 0.530', 'P(cost < 0), p = 1', C.accent2);
  bullets(s, [
    'Best sampled bitstring in every run = the classical optimum (0,3,0,0,0,0)',
    'p = 2: ⟨C⟩ = −0.466 sampled vs −0.383 exact, P(cost<0) = 0.668 vs 0.67',
    'Results, QASM and per-iteration traces saved in group/classiq/results/',
    'Demo video: group/video/qaoa_distribution.mp4 (distribution sharpening as angles ramp)',
  ], { x: 0.6, y: 5.05, w: 12.3, h: 1.7, fontSize: 13 });
  s.addNotes('3:20–3:50. Switch to the live Classiq IDE / recorded screen here. Show the synthesised circuit and the histogram. The sampled expectation on the Classiq simulator agrees with Wolfram within shot noise and the most frequent low-cost sample is exactly the optimum.');
}

// ---------- 8. Video slide ----------
{
  const s = base('Demo: the QAOA distribution sharpening', 'Video');
  s.addMedia({ type: 'video', path: img('video/qaoa_distribution.mp4'), x: 0.6, y: 1.55, w: 8.4, h: 5.0 });
  bullets(s, [
    '120 frames, angles ramp from 0 to the p = 2 optimum',
    'Scatter: probability of each of the 4096 plans vs its cost',
    'Bars: P(cost < 0) climbing to 0.67',
    'Black line: classical optimum −2.844',
    'Second clip: group/video/classiq_convergence.mp4 — COBYLA on Classiq, iteration by iteration',
  ], { x: 9.2, y: 1.6, w: 3.7, h: 4.8, fontSize: 13 });
  s.addNotes('3:50–4:10. Play the clip (about 5 s). If the video does not play in the imported Canva/Google Slides deck, use the MP4 directly from the group folder.');
}

// ---------- 9. Optimisation lesson ----------
{
  const s = base('Optimising on Classiq: warm start beats blind search', 'Classiq');
  const cover = 'data:image/png;base64,' + require('fs').readFileSync(img('charts/classiq_convergence.png')).toString('base64');
  s.addMedia({ type: 'video', path: img('video/classiq_convergence.mp4'), cover, x: 0.6, y: 1.55, w: 8.0, h: 4.27 });
  caption(s, 'Click to play: 20 COBYLA iterations on the Classiq simulator, one 4096-shot job each (11 s).', 0.6, 5.85, 8.0);
  bullets(s, [
    'Start (0.20, 0.50): COBYLA stuck at ⟨C⟩ ≈ 35.5 — the plateau Wolfram predicted',
    'Start (0.02, 0.60): 20 Classiq jobs, ⟨C⟩ 21.6 → 7.0, still above warm start 2.0',
    'Shot noise (4096 shots) hides gradients; 15 parallel jobs let us sweep starts instead',
    'Takeaway: exact classical pre-simulation of small instances gives angles that transfer',
  ], { x: 8.9, y: 1.6, w: 4.0, h: 4.6, fontSize: 13 });
  s.addNotes('4:10–4:30. Optimising angles on the sampler alone is hard: a random start sits on the plateau and COBYLA cannot see a gradient through shot noise. Warm-starting from the Wolfram angles gives the best result immediately. That is our practical recipe.');
}

// ---------- 10. Lean ----------
{
  const s = base('Lean 4 certificates: the classical facts are machine-checked', 'Proof');
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.6, w: 12.3, h: 3.0, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText([
    { text: 'theorem decodeTilt_bijective : Function.Bijective (fun q : Fin 2 × Fin 2 => decodeTilt q.1 q.2)   -- 2 qubits ↔ 4 tilts', options: { breakLine: true } },
    { text: 'theorem costS_optTilt      : costS optTilt = -28440                                   -- cost ×10⁴ (decide)', options: { breakLine: true } },
    { text: 'theorem costS_lower_bound  : ∀ t : Fin 6 → Fin 4, -28440 ≤ costS t                       -- 4096 cases (native_decide)', options: { breakLine: true } },
    { text: 'theorem costS_unique       : ∀ t : Fin 6 → Fin 4, costS t = -28440 → t = optTilt          -- optimum is unique', options: { breakLine: true } },
    { text: 'theorem cost_phase_preserves_probability : ∀ γ c a, ‖exp(γ c i) · a‖² = ‖a‖²             -- phase layer keeps P', options: { breakLine: true } },
    { text: 'theorem two_smul_P0 / two_smul_P1 : 2•P0 = 1 + Z,  2•P1 = 1 − Z                        -- qubit → Pauli-Z' },
  ], { x: 0.8, y: 1.7, w: 11.9, h: 2.8, fontFace: 'Consolas', fontSize: 12.5, color: C.accent2, valign: 'middle', margin: 0.05 });
  stat(s, 0.6, 4.85, 2.9, '0 sorry', 'lake build succeeded', C.accent2);
  stat(s, 3.65, 4.85, 2.9, 'Mathlib', 'Lean 4.33.1', C.accent2);
  bullets(s, [
    'group/lean/TiltQAOA.lean + build log',
    'Proves the optimum, its uniqueness and the encoding are exactly what the quantum runs report',
    'Quantum layer: unitarity of the phase operator, so QAOA never destroys probability mass',
  ], { x: 6.9, y: 4.85, w: 6.0, h: 1.8, fontSize: 13 });
  s.addNotes('4:30–4:40. Judges asked for trust: the classical optimum, its uniqueness and the bit encoding are theorems in Lean 4 with Mathlib, checked by kernel decision procedures over all 4096 cases. No sorry.');
}

// ---------- 11. Scaling ----------
{
  const s = base('From 4 tilt levels to the operator\'s 10 — and beyond', 'Scale');
  s.addImage({ path: img('wolfram/img/levels.png'), x: 0.6, y: 1.55, w: 6.6, h: 4.48 });
  bullets(s, [
    '10 levels → 4 qubits per antenna → 24 qubits for the same 6 antennas',
    'Hamiltonian stays 2-local: gate count grows quadratically, not exponentially',
    '100 antennas × 10 levels ≈ 400 qubits — QAOA depth stays p·O(n²)',
    'Grover alternative: quadratic speed-up, needs a fault-tolerant machine and an oracle for “cost < threshold”; shown on a 16-state slice in the notebook',
    'Next: run p = 1 on IonQ simulator backend via Classiq, then hardware',
  ], { x: 7.5, y: 1.6, w: 5.4, h: 4.6, fontSize: 13 });
  s.addNotes('4:40–4:47. Scaling story: binary encoding grows with log of the level count; the Hamiltonian stays quadratic so the circuit stays shallow. Grover is the long-term alternative but needs error correction.');
}

// ---------- 12. Hierarchical scaling ----------
{
  const s = base('Whole network: coarse-to-fine k-means, one QAOA job per group', 'Architecture');
  // tree
  const box = (x, y, w, h, text, fill, size) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.06 });
    s.addText(text, { x, y, w, h, fontFace: FONT, fontSize: size || 12, color: C.ink, align: 'center', valign: 'middle', margin: 0.02 });
  };
  const line = (x1, y1, x2, y2) => s.addShape(pptx.ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: (x2 - x1) * (y2 - y1) < 0, line: { color: C.muted, width: 1 },
  });
  box(2.3, 1.6, 3.4, 0.6, 'Whole network — feature vector x_r per region', C.panel, 12);
  s.addText('k-means, k = 5', { x: 5.8, y: 1.75, w: 1.6, h: 0.3, fontFace: FONT, fontSize: 10, color: C.accent2, margin: 0 });
  const gx = [0.6, 2.05, 3.5, 4.95, 6.4];
  gx.forEach((x, i) => { line(4.0, 2.2, x + 0.5, 2.85); box(x, 2.85, 1.0, 0.5, `G${i + 1}`, i === 0 ? C.accent : C.panel, 13); });
  s.addText('each group: joint QAOA of its antennas · 2 qubits/antenna · 2-local H_C · one Classiq job (15 in parallel)',
    { x: 4.3, y: 3.45, w: 3.2, h: 0.5, fontFace: FONT, fontSize: 10, color: C.muted, margin: 0 });
  s.addText('refine G1 where ΔU is still large', { x: 4.3, y: 4.2, w: 3.2, h: 0.3, fontFace: FONT, fontSize: 10, color: C.accent2, margin: 0 });
  const cx = [0.6, 1.3, 2.0, 2.7, 3.4];
  cx.forEach((x, i) => { line(1.1, 3.35, x + 0.3, 4.15); box(x, 4.15, 0.6, 0.45, `G1${i + 1}`, i === 1 ? C.accent : C.panel, 11); });
  line(1.6, 4.6, 1.6, 5.0);
  box(0.6, 5.0, 6.9, 0.7, 'our run = one leaf: 2 real sites, 6 sectors, 12 qubits, optimum −2.844 found and proven', C.accent, 12);
  s.addText('5 → 25 → 125 groups: distinct plans grow, jobs per level ≤ 25 → two batches of 15', { x: 0.6, y: 5.85, w: 6.9, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.muted, margin: 0 });

  s.addShape(pptx.ShapeType.roundRect, { x: 7.9, y: 1.6, w: 5.0, h: 2.35, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText([
    { text: 'Two stated assumptions', options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: '1. Regions in one group are similar enough to share the coarse tilt plan — refinement relaxes this level by level.', options: { fontSize: 12, breakLine: true } },
    { text: '2. Interference between groups is ignored at each level — fixed by re-optimising boundary antennas with neighbours held fixed.', options: { fontSize: 12 } },
  ], { x: 8.05, y: 1.7, w: 4.7, h: 2.15, fontFace: FONT, color: C.ink, valign: 'top', margin: 0.05 });
  bullets(s, [
    'Group = antennas optimised jointly (the coupled ZZ problem) — that is where QAOA does work; a single shared 27-way choice would be brute-forced classically',
    'Quantum budget per job stays what we ran today: 12 qubits = 6 antennas; 24 qubits = 6 antennas × 10 tilt levels',
    'Classical: k-means + utility aggregation; quantum: one warm-started QAOA per group',
  ], { x: 7.9, y: 4.15, w: 5.0, h: 2.4, fontSize: 12 });
  s.addNotes('4:47–4:55. Whole-network story: cluster regions by a classical feature vector, k=5; each group is one QAOA job optimising its antennas jointly, 2 qubits per antenna; refine only where utility still improves. Our 12-qubit real-data run is one leaf. Two assumptions stated: shared plan within a group, no cross-group interference at a level.');
}

// ---------- 13. Summary ----------
{
  const s = base('Everything is in the group folder — reproducible end to end', 'Summary');
  const rows = [
    ['Artifact', 'Path (C:\\Projects\\Hackton\\group\\…)', 'Key number'],
    ['Classiq QAOA program + results', 'classiq\\qaoa_tilt_classiq.py, classiq\\results\\*.json/*.qasm', '⟨C⟩ 2.020 (p1), −0.466 (p2)'],
    ['Pauli decomposition + QASM layer', 'gates\\pauli_terms.json, gates\\qaoa_layer_schedule.qasm', '73 terms, 2-local'],
    ['Wolfram notebook, PDF, CDF, MD', 'wolfram\\wolfram_realdataset_algorithms.*', 'P(cost<0) 0.024→0.53→0.67'],
    ['Lean 4 proof + build log', 'lean\\TiltQAOA.lean', 'optimum −2.844 unique, 0 sorry'],
    ['Charts + demo videos', 'charts\\*.png, video\\*.mp4', '120 + 22 frames'],
    ['Hamiltonian write-up', 'qaoa_antenna_hamiltonian_explanation.md', '—'],
  ];
  s.addTable(rows.map((r, i) => r.map((c) => ({ text: c, options: { bold: i === 0, color: i === 0 ? C.accent2 : C.ink, fill: { color: i === 0 ? C.panel : C.bg }, fontFace: i === 0 ? FONT : 'Consolas', fontSize: i === 0 ? 12 : 11 } }))),
    { x: 0.6, y: 1.6, w: 12.3, colW: [3.3, 6.0, 3.0], border: { type: 'solid', pt: 0.5, color: '2A3358' }, margin: 0.06 });
  s.addText('Team Quantum Headache — thank you. Questions?', { x: 0.6, y: 6.2, w: 12.3, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addNotes('4:55–5:00. Close: everything is reproducible from the group folder with wolframscript, python and lake. Thank you.');
}

const out = path.join(G, 'presentation', process.argv[2] || 'QuantumHeadache_AntennaTilt.pptx');
pptx.writeFile({ fileName: out }).then((f) => console.log('written', f));
