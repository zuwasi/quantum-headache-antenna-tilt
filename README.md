# Quantum Headache — Antenna Tilt (QUBIT 2026)

QAOA down-tilt optimisation of 6 real Tel Aviv sector antennas (OpenCelliD), 2 qubits per antenna, 12 qubits.
Everything in this folder is reproducible from `C:\Projects\Hackton`.

## Key numbers

| Quantity | Value |
|---|---|
| Instance | 6 antennas × 4 tilt levels = 4096 plans, `data\opencellid_il2.csv` |
| Cost | Cost(t) = tᵀ I t − 1.5·c·t + 0.3·Σt |
| Classical optimum | −2.844 at tilts (0,3,0,0,0,0), unique |
| Hamiltonian | 73 Pauli terms: 1 I + 12 Z + 60 ZZ (2-local) |
| Circuit p=1 / p=2 | depth 59 / 114; 92 / 184 CX; 72 / 144 RZ |
| QAOA p=1 (γ,β)=(0.06538, 1.12925) | Wolfram ⟨C⟩ = 1.9985, P(cost<0) = 0.53, P(opt) = 0.0066 — Classiq 4096 shots: 2.0203 / 0.529 / 0.0076 |
| QAOA p=2 (0.04116, 1.12645, 0.10990, 0.53982) | Wolfram ⟨C⟩ = −0.3825, P(cost<0) = 0.67 — Classiq: −0.4664 / 0.668 |
| Shots for 95 % chance of sampling the optimum | random 12270 → p=1 453 → p=2 342 |
| Lean 4 | optimum value, lower bound, uniqueness, encoding bijection, phase-layer unitarity — 0 sorry |

## Contents

| Path | What |
|---|---|
| `presentation\QuantumHeadache_AntennaTilt.pptx` (+ `.pdf`) | 13-slide, 5-minute deck (slide 12 = hierarchical k-means → QAOA-per-group scaling architecture) with speaker notes and embedded demo video. Import into Canva (Create → Import file) or Google Slides (File → Import slides). `build_deck.js` regenerates it. |
| `video\qaoa_distribution.mp4` | Demo clip: QAOA distribution sharpening as angles ramp 0 → p=2 optimum (120 frames, `make_frames.wl`). |
| `video\classiq_convergence.mp4` | COBYLA trace on the Classiq simulator, iteration by iteration (`make_charts.py`). |
| `charts\*.png` | `wolfram_vs_classiq`, `quantum_gain`, `classiq_convergence`, `circuit_stats`, `map_small.jpg`. |
| `classiq\qaoa_tilt_classiq.py` | Qmod/Classiq SDK program. `python group\classiq\qaoa_tilt_classiq.py --layers 1 --shots 4096 [--optimize 20] [--start g,b] [--show]` from `C:\Projects\Hackton`. |
| `classiq\results\*.json / *.qasm / *.log` | Sampled results, per-iteration traces and transpiled OpenQASM 3 for p=1, p=2 and the two optimisation runs. |
| `gates\pauli_decomposition.py` → `pauli_terms.json/.md`, `qaoa_layer_schedule.qasm` | Walsh–Hadamard Pauli decomposition of the cost table and an explicit QASM 2 QAOA layer (checked with Qiskit statevector). |
| `wolfram\wolfram_realdataset_algorithms.wl / .nb / .pdf / .cdf / .md + img\` | Exact statevector pipeline and notebook (landscape, VQE, Grover slice, 10-level scaling). `wolframscript -file group\wolfram\wolfram_realdataset_algorithms.wl` (~80 s) writes `wolfram_realdataset_algorithms.json`. |
| `lean\TiltQAOA.lean`, `tilt_qaoa_lean_build.log` | Lean 4 + Mathlib certificates; source of truth is `C:\Projects\Hackton\lean\Hackton\TiltQAOA.lean` (`lake build`). |
| `qaoa_antenna_hamiltonian_explanation.md` | Group's Hamiltonian write-up (LaTeX `$…$` delimiters). Still uses the 5-qubit/3-antenna example. |

## Live Classiq circuit (for screen recording)

Last synthesised p=1 program: https://platform.classiq.io/circuit/3J37F1H7hLlnzbCUw4C0YELQDec
Re-open any time with `--show` (prints a new link and opens the IDE).

Recording kit: `recording\RECORDING_SCRIPT.md` (shot list), `recording\demo_run.ps1` (live Classiq demo), `recording\record_screen.ps1` (ffmpeg desktop+mic recorder).

## Demo video

YouTube: https://youtu.be/OSEtTWnRQhc

`recording\demo_final.mp4` — 5:09 silent screen recording of the deck + live Classiq run, with timed headline banners
(`recording\raw_take.mp4` is the untouched take; `headlines.json` + `add_headlines.py raw_take.mp4 demo_final.mp4 --start 6` rebuilds the final).

## License

MIT — see `LICENSE`.
