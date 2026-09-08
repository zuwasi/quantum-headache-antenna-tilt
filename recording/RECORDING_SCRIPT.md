# Recording script — Quantum Headache, Antenna Tilt (5:00)

Screen 2560×1600. Everything below is already open / one command away. Record each shot as a separate take; stitch later or just play them from the deck.

## Before you press record (checklist)

- [ ] Close Slack/Teams/mail, turn on Focus Assist (Win+N → Do not disturb).
- [ ] Display scaling: set Windows text size to 125–150 % so terminal + Classiq IDE text is readable at 1920 wide.
- [ ] Terminal: Windows Terminal, PowerShell, font size 16+, dark theme. Run once **before** recording so the Classiq token is fresh:
      `powershell -ExecutionPolicy Bypass -File C:\Projects\Hackton\group\recording\demo_run.ps1`
      (ignore an "Expired token" line at the top — it auto-refreshes; a transient 502 may appear, the run still completes).
- [ ] Browser tab A: Classiq IDE circuit (opened by the demo run, latest link in `group\README.md`).
- [ ] Browser tab B: https://platform.classiq.io (logged in) — jobs page for the histogram.
- [ ] Deck open in PowerPoint slideshow (F5): `C:\Projects\Hackton\group\presentation\QuantumHeadache_AntennaTilt.pptx`.
- [ ] Explorer window on `C:\Projects\Hackton\group\video` for the two MP4s.
- [ ] Mic check: `powershell -ExecutionPolicy Bypass -File C:\Projects\Hackton\group\recording\record_screen.ps1 -Name mictest`, say a sentence, press `q`, play `mictest.mp4`.

Recorder options: `record_screen.ps1` (ffmpeg, desktop + mic, press `q` to stop) or Xbox Game Bar (Win+Alt+R records the **active window only** — good for the browser or terminal, not for switching apps).

## Silent take — hold times (total ≈ 5:15)

Mic off, no narration; headlines are burned in afterwards from `headlines.json`.

| Slide | Content | Hold | Cumulative |
|---|---|---|---|
| 1 | Title | 12 s | 0:12 |
| 2 | Problem + map | 30 s | 0:42 |
| 3 | Encoding, 12 qubits, 73 terms | 30 s | 1:12 |
| 4 | Circuit stats → Alt-Tab to terminal, Enter on the demo command; watch synthesis → link → browser opens with the circuit; zoom out, expand one `phase` block; Alt-Tab back to terminal to show the result lines; back to PowerPoint | 45 s | 1:57 |
| 5 | Wolfram landscape | 30 s | 2:27 |
| 6 | Quantum gain 2.4 % → 53 % → 67 % | 25 s | 2:52 |
| 7 | Wolfram vs Classiq → Alt-Tab to Chrome jobs tab, open the latest execution, show the histogram; back | 35 s | 3:27 |
| 8 | Distribution video: click play on arrival, clip runs 5 s, hold 5 s more | 15 s | 3:42 |
| 9 | COBYLA video: click play on arrival, clip runs 11 s, hold 8 s on the last frame | 30 s | 4:12 |
| 10 | Lean theorems | 20 s | 4:32 |
| 11 | 10 levels → 24 qubits | 12 s | 4:44 |
| 12 | k-means tree | 20 s | 5:04 |
| 13 | Summary table | 11 s | 5:15 |

Rules of thumb: a little long is fine, short is not (headlines need room). No need to hit the seconds exactly — the headline times are fitted to the actual cuts afterwards. Export to `C:\Projects\Hackton\group\recording\raw_take.mp4` (MP4, 1080p or 1440p, no Camtasia captions/effects).
## Shot list (narrated version — timings superseded by the silent table above)

| # | Time | Screen | What you do / say | Slide |
|---|------|--------|-------------------|-------|
| 1 | 0:00–0:20 | Deck slide 1 | "We optimise the down-tilt of 6 real Tel Aviv antennas with a 12-qubit QAOA, run it on Classiq, and verify every number with Wolfram and Lean 4." | 1 |
| 2 | 0:20–1:00 | Slide 2 (map) | Point at the two 3-sector sites; baseline all-0 vs optimum A1→3. "4096 plans — small on purpose so we can check the quantum answer exactly." | 2 |
| 3 | 1:00–1:40 | Slide 3 | tilt = q₀ + 2q₁; 73 Pauli terms, 2-local → only RZ + CX. "Binary encoding is why this fits the Classiq student tier." | 3 |
| 4 | 1:40–2:10 | **Terminal** → run `demo_run.ps1` | Live: synthesis (≈7 s), `circuit: depth 59, cx 92, rz 72`, IDE link prints, browser opens. Then Alt-Tab to **Classiq IDE**: zoom out to show the 12 wires, expand one `phase` block to show RZ/CX ladder, hover the RX mixer. | 4 |
| 5 | 2:10–2:50 | Slide 5 (landscape) | "Wolfram scans the whole (γ,β) plane exactly; optimum (0.0654, 1.1293), everything else is a plateau near 35. These angles are our warm start." | 5 |
| 6 | 2:50–3:20 | Slide 6 | "Random plan beats baseline 2.4 % of the time; one QAOA layer 53 %, two layers 67 %. Shots to hit the optimum with 95 % confidence: 12 270 → 342." | 6 |
| 7 | 3:20–3:50 | **Terminal** (result lines) + **Classiq jobs page** | Show `sampled at warm start: <C> = 2.0x, P(cost<0) = 0.53, best sampled [0,3,0,0,0,0]`. On https://platform.classiq.io/jobs open the top job: header (Simulator, 4096 shots), the spread histogram (tallest bar = all-zero baseline, 152 shots), the table with decoded tilts — 716 distinct plans; the optimum [0,3,0,0,0,0] gets ~30 shots vs 1 expected from uniform random. "Same numbers as Wolfram within shot noise." | 7 |
| 8 | 3:50–4:10 | Slide 8 → play `qaoa_distribution.mp4` | Let the clip run (5 s): scatter tightens, P(cost<0) bar climbs to 0.67. | 8 |
| 9 | 4:10–4:30 | Slide 9 (+ optional `classiq_convergence.mp4`) | "Blind COBYLA from a random start sits on the plateau; warm start from Wolfram wins immediately." | 9 |
| 10 | 4:30–4:40 | Slide 10 | Read two theorems: `costS_lower_bound` (4096 cases, native_decide) and `costS_unique`. "0 sorry." | 10 |
| 11 | 4:40–4:47 | Slide 11 | "10 levels → 4 qubits/antenna → 24 qubits; Hamiltonian stays 2-local." | 11 |
| 11b | 4:47–4:55 | Slide 12 (tree) | "Whole network: k-means into 5 groups, one QAOA job per group optimising its antennas jointly, refine where utility still improves. Our 12-qubit run is one leaf. Two assumptions: shared plan inside a group, no cross-group interference per level." | 12 |
| 12 | 4:55–5:00 | Slide 13 | "Everything is in the group folder, reproducible with python, wolframscript and lake. Thank you." | 12 |

## Screenshots to grab (Win+Shift+S → save into `group\recording\shots\`)

1. Classiq IDE — full circuit, 12 wires (shot 4).
2. Classiq IDE — expanded `phase` block showing RZ/CX (shot 4).
3. Classiq Jobs page: histogram + results table with decoded tilts (shot 7).
4. Terminal after `demo_run.ps1` — the `circuit:` and `sampled at warm start` lines (shot 7).
5. Lean: `C:\Projects\Hackton\lean` → `lake build` output "Build completed successfully" (optional B-roll for slide 10).

## Optional live variants

- 20-iteration optimisation on Classiq (≈2.5 min, use only if time allows or as B-roll): `demo_run.ps1 -Optimize 20`
- p=2 circuit (depth 114): `demo_run.ps1 -Layers 2`

## After recording

- Takes land in `C:\Projects\Hackton\group\recording\*.mp4`. Trim with: `ffmpeg -ss 00:00:03 -to 00:00:45 -i take_x.mp4 -c copy take_x_cut.mp4`
- Concatenate: list files in `concat.txt` as `file 'take_1.mp4'` lines, then `ffmpeg -f concat -safe 0 -i concat.txt -c copy demo_final.mp4`
- Canva: Create → Import file → the PPTX; drop `demo_final.mp4` onto slide 8 (Canva does not keep the embedded video from the PPTX).
