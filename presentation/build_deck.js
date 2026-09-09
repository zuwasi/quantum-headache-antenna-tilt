// Builds QuantumHeadache_AntennaTilt.pptx (5-minute hackathon pitch, 14 slides, merged with the group deck).
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

const TOTAL = 14;
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
  s.addText('Tilting a city\'s antennas:\nk-means groups + a 12-qubit QAOA leaf', { x: 0.8, y: 2.1, w: 11.5, h: 2.0, fontFace: FONT, fontSize: 48, bold: true, color: C.ink, margin: 0 });
  s.addText('Real OpenCelliD data → cost Hamiltonian → Classiq circuit → Wolfram exact simulation → Lean 4 proof', { x: 0.8, y: 4.2, w: 11.5, h: 0.6, fontFace: FONT, fontSize: 18, color: C.muted, margin: 0 });
  s.addText('Team Quantum Headache', { x: 0.8, y: 5.6, w: 6, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: C.ink, margin: 0 });
  s.addText('5-minute demo · September 2026', { x: 0.8, y: 6.05, w: 6, h: 0.4, fontFace: FONT, fontSize: 14, color: C.muted, margin: 0 });
  s.addNotes('0:00–0:20. One sentence: we optimise the down-tilt of 6 real Tel Aviv sector antennas with QAOA, ran it on Classiq, and verified every number two independent ways. Everything shown is reproducible from the group folder.');
}

// ---------- 2. Motivation (group) ----------
{
  const s = base('From a city of users to interaction regions and one utility U', 'Motivation');
  s.addImage({ path: img('charts/group_interaction_region.png'), x: 0.6, y: 1.55, w: 4.7, h: 4.85 });
  caption(s, 'Toy model: hexagonal cells, 120° sectors. The green hexagon is one interaction region R: three sectors from three sites that overlap.', 0.6, 6.45, 4.9);
  s.addShape(pptx.ShapeType.roundRect, { x: 5.7, y: 1.6, w: 7.2, h: 1.95, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText([
    { text: 'U(t) = α·Q(t) − β·I(t) − γ·D(t)', options: { fontSize: 22, bold: true, color: C.accent2, breakLine: true } },
    { text: 'Q reception quality · I interference · D unmet demand (dead zones) — each summed over users, weighted by demand w_p', options: { fontSize: 13, color: C.ink, breakLine: true } },
    { text: 'Our leaf cost is −U with α = 1.5 (coverage c·t), β = 1 (tᵀ I t), γ = 0.3 (tilt penalty Σt)', options: { fontSize: 13, color: C.muted } },
  ], { x: 5.9, y: 1.7, w: 6.8, h: 1.75, fontFace: FONT, valign: 'middle', margin: 0.05 });
  bullets(s, [
    'The operator has spatial demand data: where the users are, where the dead zones are',
    'Each sector antenna gets one down-tilt; tilting down cuts interference on neighbours but shrinks coverage',
    'Every interaction region has its own optimum, and a city has thousands of regions',
    'Two ways to fail: one plan for the whole network (too coarse) or one job per region (too many jobs) → the hierarchy on the next slide',
  ], { x: 5.7, y: 3.75, w: 7.2, h: 2.7, fontSize: 14 });
  s.addNotes('Motivation from the group deck: customers, hexagonal cells with three 120-degree sectors, the interaction region R where three sectors overlap, and the demand-weighted utility U. Our real-data cost function is the same form with fixed weights.');
}

// ---------- 3. Pipeline (group) ----------
{
  const s = base('Whole network: k-means groups, one QAOA job per group', 'Architecture');
  s.addImage({ path: img('charts/group_kmeans_grid.png'), x: 0.6, y: 1.55, w: 4.3, h: 3.9 });
  caption(s, 'k-means (k = 5) on the toy network: 48 regions, 5 colours = 5 groups = 5 QAOA jobs.', 0.6, 5.5, 4.4);
  const step = (x, y, n, head, body) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.3, h: 1.15, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.06 });
    s.addText([
      { text: n + '  ' + head, options: { bold: true, color: C.accent2, fontSize: 12, breakLine: true } },
      { text: body, options: { color: C.ink, fontSize: 10.5 } },
    ], { x: x + 0.08, y, w: 2.14, h: 1.15, fontFace: FONT, valign: 'middle', margin: 0.03 });
  };
  const arrow = (x, y, w, h, atBegin) => s.addShape(pptx.ShapeType.line, { x, y, w, h, line: { color: C.accent2, width: 1.5, ...(atBegin ? { beginArrowType: 'triangle' } : { endArrowType: 'triangle' }) } });
  const X = [5.3, 7.95, 10.6];
  step(X[0], 1.6, '1', 'Network data', 'users, demand, dead zones → feature vector x_r per region');
  step(X[1], 1.6, '2', 'k-means, k = 5', 'regions with similar x_r share one group G_1 … G_5');
  step(X[2], 1.6, '3', 'Group utility U_j', 'aggregate demand per group → one cost Hamiltonian H_C per group');
  step(X[2], 3.1, '4', 'QAOA on Classiq', '2 qubits per sector, angles warm-started from Wolfram (our leaf, next slides)');
  step(X[1], 3.1, '5', 'Assign + evaluate', 'argmin plan to every region of the group; compute global U');
  step(X[0], 3.1, '6', 'Refine', 're-cluster the group with the most variation; stop when ΔU ≈ 0');
  arrow(X[0] + 2.3, 2.175, 0.35, 0.001);        // 1 -> 2
  arrow(X[1] + 2.3, 2.175, 0.35, 0.001);        // 2 -> 3
  arrow(X[2] + 1.15, 2.75, 0.001, 0.35);        // 3 -> 4 (down)
  arrow(X[1] + 2.3, 3.675, 0.35, 0.001, true);  // 4 -> 5 (left)
  arrow(X[0] + 2.3, 3.675, 0.35, 0.001, true);  // 5 -> 6 (left)
  arrow(X[0] + 1.15, 2.75, 0.001, 0.35, true);  // 6 -> 1 (up)
  s.addShape(pptx.ShapeType.roundRect, { x: 5.3, y: 4.5, w: 7.6, h: 1.35, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText([
    { text: 'Two stated assumptions', options: { bold: true, color: C.accent2, fontSize: 13, breakLine: true } },
    { text: '1. Regions in one group are similar enough to share a coarse plan — step 6 relaxes this level by level (5 → 25 → 125 groups).', options: { fontSize: 11.5, breakLine: true } },
    { text: '2. Interference between groups is ignored at each level — fixed by re-optimising boundary antennas with neighbours held fixed.', options: { fontSize: 11.5 } },
  ], { x: 5.45, y: 4.55, w: 7.3, h: 1.25, fontFace: FONT, color: C.ink, valign: 'top', margin: 0.05 });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 6.0, w: 12.3, h: 0.55, fill: { color: C.accent }, line: { color: C.accent }, rectRadius: 0.06 });
  s.addText('Quantum work only where resolution is needed: ≤ 25 jobs per level = two batches of 15 parallel Classiq jobs. Classical: k-means + aggregation. Quantum: one warm-started QAOA per group.',
    { x: 0.7, y: 6.0, w: 12.1, h: 0.55, fontFace: FONT, fontSize: 11.5, color: C.ink, valign: 'middle', margin: 0.03 });
  s.addNotes('The whole-network architecture from the group: cluster regions by a classical feature vector, one QAOA job per group, assign the plan to all regions in the group, evaluate global utility, then re-cluster only the group with the most variation. Our 12-qubit real-data run is the leaf solver in step 4. Two assumptions are stated explicitly.');
}

// ---------- 4. Leaf problem ----------
{
  const s = base('One leaf of the tree: 6 real Tel Aviv antennas, one down-tilt each', 'Leaf problem');
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

// ---------- 5. Encoding ----------
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

// ---------- 6. Circuit ----------
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

// ---------- 7. Wolfram ----------
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

// ---------- 8. Quantum gain + Classiq ----------
{
  const s = base('What the quantum sampler buys us, and Classiq reproduces it', 'Result');
  s.addImage({ path: img('charts/quantum_gain.png'), x: 0.6, y: 1.55, w: 6.0, h: 3.38 });
  s.addImage({ path: img('charts/wolfram_vs_classiq.png'), x: 6.9, y: 1.55, w: 6.0, h: 2.45 });
  bullets(s, [
    'Best sampled bitstring in every Classiq run = the classical optimum (0,3,0,0,0,0)',
    'p = 2: ⟨C⟩ = −0.466 sampled vs −0.383 exact; 716 distinct plans in 4096 shots',
  ], { x: 6.9, y: 4.1, w: 6.0, h: 0.9, fontSize: 12.5 });
  stat(s, 0.6, 5.1, 2.95, '2.4% → 67%', 'P(cost < 0): random → p = 2', C.accent2);
  stat(s, 3.7, 5.1, 2.95, '12270 → 342', 'shots for 95% chance of the optimum', C.accent2);
  stat(s, 6.8, 5.1, 2.95, '2.020 vs 1.999', '⟨C⟩ p = 1: Classiq 4096 shots vs exact', C.warn);
  stat(s, 9.9, 5.1, 2.95, '0.529 vs 0.530', 'P(cost < 0) p = 1: Classiq vs exact', C.warn);
  s.addNotes('Headline: a random plan beats the baseline 2.4 percent of the time; after one QAOA layer 53 percent; after two, 67 percent. Shots to see the exact optimum drop from over 12 000 to about 340. The Classiq simulator reproduces the exact Wolfram numbers within shot noise, and the most frequent low-cost sample is exactly the optimum.');
}

// ---------- 9. Video slide ----------
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

// ---------- 10. Optimisation lesson ----------
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

// ---------- 11. Lean ----------
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

// ---------- 12. Why 2 qubits per sector (group slide 5 reframed) ----------
{
  const s = base('Why 2 qubits per sector, not a 5-qubit pack of 27 configurations', 'Design choice');
  s.addImage({ path: img('charts/group_qaoa5_convergence.png'), x: 0.6, y: 1.55, w: 5.6, h: 3.42 });
  caption(s, 'Group run, 5-qubit encoding (27 of 32 states valid): ⟨H_C⟩ converges in all 10 groups, but the sampled optimum is no more likely than uniform.', 0.6, 5.0, 5.6);
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 5.5, w: 5.6, h: 0.95, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
  s.addText('The hierarchy is encoding-agnostic: keep k-means + refinement, swap the leaf solver. The group\'s own next step ("6-qubit encoding, constrained mixer") is this binary encoding — already run on Classiq and proven in Lean.',
    { x: 0.7, y: 5.5, w: 5.4, h: 0.95, fontFace: FONT, fontSize: 11.5, color: C.ink, valign: 'middle', margin: 0.03 });
  stat(s, 6.5, 1.6, 3.1, '0.5 – 1.2×', 'P(optimum) / uniform, 5-qubit pack, p = 1, 3, 6', C.red);
  stat(s, 9.8, 1.6, 3.1, '27×', 'P(optimum) / uniform, 2 qubits per sector, p = 1', C.accent2);
  stat(s, 6.5, 3.15, 3.1, '15.6% → 3.0%', 'invalid states, 5-qubit pack, uniform → p = 3', C.warn);
  stat(s, 9.8, 3.15, 3.1, '0%', 'invalid states, binary: every bitstring is a plan', C.accent2);
  bullets(s, [
    'Dense pack: 5 penalised states out of 32, so the QAOA layers go into learning the penalty, not the utility',
    'Circuit cost is not the issue: depth 56 on 5 qubits vs 59 on 12 qubits, RZ + CX in both',
    'Binary per sector keeps H_C 2-local; P(cost < 0) climbs 53% → 67% from p = 1 to 2',
    'And it scales: 10 tilt levels = 4 qubits per sector, 24 qubits for 6 sectors, gate count grows quadratically',
  ], { x: 6.5, y: 4.7, w: 6.4, h: 1.9, fontSize: 12 });
  s.addNotes('Both encodings were tried by the team. The 5-qubit pack of 27 configurations leaves 5 invalid states; QAOA learns to avoid them but gives no amplification of the optimum (0.5 to 1.2 times uniform). Two qubits per sector has no invalid states, a 2-local Hamiltonian, 27 times amplification at p = 1, and extends to 10 levels with 4 qubits per sector.');
}

// ---------- 13. Why quantum at 1000 qubits ----------
{
  const s = base('Why quantum: what changes at 1000 qubits (500 antennas)', 'Scale');
  stat(s, 0.6, 1.6, 3.95, '2¹⁰⁰⁰ ≈ 10³⁰¹', 'plans for 500 antennas × 4 tilts (today: 4096)', C.accent2);
  stat(s, 4.7, 1.6, 3.95, '≈ 45 qubits', 'ceiling of exact statevector simulation: 50 q = 18 PB > Frontier 9 PB', C.warn);
  stat(s, 8.8, 1.6, 4.1, '≈ 13 000 CX', 'one QAOA layer at 1000 q: 2-local, local coupling, depth ~10²', C.accent2);
  const panel = (x, head, items, color) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y: 3.1, w: 6.05, h: 2.95, fill: { color: C.panel }, line: { color: C.panel }, rectRadius: 0.08 });
    s.addText(head, { x: x + 0.15, y: 3.15, w: 5.8, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color, margin: 0 });
    bullets(s, items, { x: x + 0.1, y: 3.5, w: 5.9, h: 2.5, fontSize: 11 });
  };
  panel(0.6, 'Best non-quantum tools on this size', [
    'Brute force (our exact check today): 10³⁰¹ plans at 10¹⁸ / s (exascale) = 10²⁸³ s; the universe is 4×10¹⁷ s old',
    'Exact simulation of the quantum algorithm (Wolfram / Classiq simulator): memory 2ⁿ × 16 B, 45 q = 0.5 PB, 50 q = 18 PB. Nobody can simulate QAOA past ≈ 48 qubits',
    'Exact QUBO solvers (branch & bound, Gurobi): sparse 1000-variable instances run hours to days and may never certify the optimum',
    'Heuristics (simulated annealing, tabu, D-Wave 4 400-qubit annealer): minutes, good plan, no guarantee. This is the real competitor (1.833 vs 1.838 on the toy benchmark)',
  ], C.red);
  panel(6.85, 'A real 1000-qubit gate-based quantum computer', [
    'Physical qubits exist (Sep 2026): IBM Condor 1 121, Atom Computing 1 200, Infleqtion 1 600; best 2-qubit fidelity 99.92% (Quantinuum Helios, 98 q)',
    '13 000 CX at 99.9% = ≈ 13 errors per shot, so the run must be error-corrected: 1000 logical qubits = 2 000 (2:1 colour code) to 100 000 (surface code) physical. Record today: 96 logical (QuEra). Roadmaps: 2028–2030',
    'Runtime once available: depth ~10² per layer, 1 shot ≈ 0.1 ms (superconducting) to 10 ms (ions); 10⁴ shots × 20 iterations = seconds to minutes; Wolfram warm start cuts the iterations',
    'Same Qmod program: Classiq synthesises for the target, simulator today, hardware backend tomorrow. No code change but the backend',
  ], C.accent2);
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 6.15, w: 10.6, h: 0.75, fill: { color: C.accent }, line: { color: C.accent }, rectRadius: 0.06 });
  s.addText('Classical tools give a good plan and stop there. At 12 qubits we measured 27× amplification and P(cost<0) 2.4% → 53% → 67% with p; whether that persists at 1000 qubits cannot be checked classically. The only instrument that can run the algorithm at this size is the quantum computer itself.',
    { x: 0.7, y: 6.15, w: 10.4, h: 0.75, fontFace: FONT, fontSize: 11, color: C.ink, valign: 'middle', margin: 0.03 });
  s.addNotes('Scale slide. 1000 qubits is 500 antennas at 4 tilt levels or 250 at 10 levels. Brute force and exact simulation of the quantum algorithm are impossible past about 45 to 48 qubits; exact QUBO solvers stall; heuristics such as annealing are the real classical competitor and give good but unproven plans. Physical 1000-qubit machines exist today but gate errors mean the 13 000-CX layer needs error correction, so 1000 logical qubits is a 2028 to 2030 machine. Once available, a run is seconds to minutes, and the Qmod program is unchanged apart from the backend.');
}

// ---------- 14. Benchmark (group) + close ----------
{
  const s = base('Benchmark: 84% of the ceiling with 4.8× fewer quantum jobs', 'Benchmark');
  s.addImage({ path: img('charts/group_benchmark_bars.png'), x: 0.6, y: 1.55, w: 6.0, h: 2.97 });
  s.addImage({ path: img('charts/group_benchmark_depth.png'), x: 6.9, y: 1.55, w: 6.0, h: 3.45 });
  caption(s, 'Hierarchy + QAOA equals exact-27 and annealing on every group (10 / 10 optimal).', 0.6, 4.55, 6.0);
  caption(s, 'Refinement 5 → 21 groups; cycle 3 (13 groups) already reaches 1.75 = 95% of the ceiling.', 6.9, 5.02, 6.0);
  stat(s, 0.6, 5.4, 2.6, '1.379', 'one config for all · 1 job', C.muted);
  stat(s, 3.35, 5.4, 2.6, '1.547', 'hierarchy + QAOA · 10 jobs', C.accent2);
  stat(s, 6.1, 5.4, 2.6, '1.838', 'per-region ceiling · 48 jobs', C.warn);
  s.addText([
    { text: 'Video: ', options: { color: C.muted } },
    { text: 'youtu.be/OSEtTWnRQhc', options: { color: C.accent2, hyperlink: { url: 'https://youtu.be/OSEtTWnRQhc' } } },
    { text: '\nCode: ', options: { color: C.muted } },
    { text: 'github.com/zuwasi/quantum-headache-antenna-tilt', options: { color: C.accent2, hyperlink: { url: 'https://github.com/zuwasi/quantum-headache-antenna-tilt' } } },
    { text: '\nTeam Quantum Headache — thank you. Questions?', options: { color: C.ink, bold: true } },
  ], { x: 8.95, y: 5.3, w: 3.95, h: 1.3, fontFace: FONT, fontSize: 11.5, valign: 'middle', margin: 0.03 });
  s.addNotes('Close with the group benchmark: one shared plan scores 1.379, per-region exact search 1.838 with 48 jobs, the hierarchy with QAOA 1.547 with 10 jobs; cycle 3 reaches 95 percent of the ceiling. Everything is reproducible from the GitHub repo; the demo video is on YouTube.');
}

const out = path.join(G, 'presentation', process.argv[2] || 'QuantumHeadache_AntennaTilt.pptx');
pptx.writeFile({ fileName: out }).then((f) => console.log('written', f));
