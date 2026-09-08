"""Static charts + convergence animation frames for the Antenna Tilt QAOA project.

Inputs : verification/results/wolfram_realdataset_algorithms.json
         group/classiq/results/qaoa_tilt_p*_classiq_simulator*.json
Outputs: group/charts/*.png, group/video/conv_frames/c###.png
Run    : C:\\Python312\\python.exe group\\video\\make_charts.py   (workdir C:\\Projects\\Hackton)
"""
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(r"C:\Projects\Hackton")
RES = ROOT / "group" / "classiq" / "results"
OUT = ROOT / "group" / "charts"
OUT.mkdir(exist_ok=True)
FR = ROOT / "group" / "video" / "conv_frames"
FR.mkdir(exist_ok=True)

wolf = json.loads((ROOT / "verification/results/wolfram_realdataset_algorithms.json").read_text())
p1 = json.loads((RES / "qaoa_tilt_p1_classiq_simulator.json").read_text())
p2 = json.loads((RES / "qaoa_tilt_p2_classiq_simulator.json").read_text())
conv = json.loads((RES / "qaoa_tilt_p1_classiq_simulator_converge2.json").read_text())
plateau = json.loads((RES / "qaoa_tilt_p1_classiq_simulator_converge.json").read_text())

plt.rcParams.update({"font.size": 12, "figure.dpi": 150})
BLUE, ORANGE, GREEN, RED = "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"


def g(d, *keys, default=None):
    for k in keys:
        if isinstance(d, dict) and k in d:
            d = d[k]
        else:
            return default
    return d


# ---------- 1. Wolfram vs Classiq comparison ----------
labels = ["p=1  <C>", "p=1  P(cost<0)", "p=2  <C>", "p=2  P(cost<0)"]
w_vals = [1.9985, 0.53, -0.3825, 0.67]
c_vals = [p1["trace"][0]["expected_cost"], p1["trace"][0]["p_cost_negative"],
          p2["trace"][0]["expected_cost"], p2["trace"][0]["p_cost_negative"]]
fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
for ax, idx, title in ((axes[0], [0, 2], "Expected cost  ⟨C⟩  (lower is better)"),
                       (axes[1], [1, 3], "P(sampled cost < 0)")):
    x = range(len(idx))
    ax.bar([i - 0.18 for i in x], [w_vals[i] for i in idx], 0.36, label="Wolfram exact statevector", color=BLUE)
    ax.bar([i + 0.18 for i in x], [c_vals[i] for i in idx], 0.36, label="Classiq simulator (4096 shots)", color=ORANGE)
    ax.set_xticks(list(x)); ax.set_xticklabels(["p = 1", "p = 2"])
    ax.set_title(title); ax.axhline(0, color="k", lw=0.6)
    for i, j in enumerate(idx):
        va = "bottom" if w_vals[j] >= 0 else "top"
        ax.text(i - 0.18, w_vals[j], f"{w_vals[j]:.3f}", ha="center", va=va, fontsize=9)
        va = "bottom" if c_vals[j] >= 0 else "top"
        ax.text(i + 0.18, c_vals[j], f"{c_vals[j]:.3f}", ha="center", va=va, fontsize=9)
axes[0].set_ylim(-1.2, 2.8)
axes[0].legend(fontsize=9, loc="upper right")
fig.suptitle("QAOA Antenna Tilt — 6 antennas, 12 qubits: Wolfram and Classiq agree", fontweight="bold")
fig.tight_layout()
fig.savefig(OUT / "wolfram_vs_classiq.png"); plt.close(fig)

# ---------- 2. Improvement over random ----------
fig, ax = plt.subplots(figsize=(8, 4.5))
names = ["Uniform random\n(12 qubits)", "QAOA p=1", "QAOA p=2"]
pneg = [0.024, 0.53, 0.67]
shots95 = [12270, 453, 342]  # 95%-confidence shots to sample the optimum, from the Wolfram notebook
ax.bar(names, pneg, color=[RED, BLUE, GREEN])
for i, v in enumerate(pneg):
    ax.text(i, v + 0.01, f"{v*100:.1f}%\n{shots95[i]} shots for\n95% chance of optimum", ha="center", fontsize=10)
ax.set_xlim(-0.75, 2.6)
ax.set_ylim(0, 0.85); ax.set_ylabel("P(sampled configuration has negative cost)")
ax.set_title("Quantum gain: P(cost<0) 2.4% → 53% → 67%", fontweight="bold")
fig.tight_layout(); fig.savefig(OUT / "quantum_gain.png"); plt.close(fig)

# ---------- 3. Convergence trace + plateau ----------
def trace(d):
    ec = [r["expected_cost"] for r in d["trace"]]
    return list(range(0, len(ec))), ec  # index 0 = evaluation at the start angles

xi, yi = trace(conv)
xp, yp = trace(plateau)
fig, ax = plt.subplots(figsize=(9, 4.8))
if xp:
    ax.plot(xp, yp, "s--", color=RED, label="start (γ,β)=(0.20,0.50): stuck on plateau ≈35.5")
ax.plot(xi, yi, "o-", color=BLUE, label="start (γ,β)=(0.02,0.60): COBYLA on Classiq simulator")
ax.axhline(1.9985, color=GREEN, ls=":", label="Wolfram warm start (0.0654,1.1293): ⟨C⟩=2.00")
ax.axhline(-2.844, color="k", ls="-.", lw=0.8, label="classical optimum −2.844")
ax.set_xlabel("COBYLA iteration (each = one 4096-shot Classiq job)")
ax.set_ylabel("sampled ⟨C⟩")
ax.set_title("Parameter optimisation on Classiq: warm start beats blind search", fontweight="bold")
ax.legend(fontsize=9); fig.tight_layout()
fig.savefig(OUT / "classiq_convergence.png"); plt.close(fig)

# animation frames of the convergence
for k in range(1, len(xi) + 1):
    fig, ax = plt.subplots(figsize=(9, 4.8))
    ax.plot(xi[:k], yi[:k], "o-", color=BLUE)
    ax.axhline(1.9985, color=GREEN, ls=":", label="Wolfram warm start ⟨C⟩=2.00")
    ax.axhline(-2.844, color="k", ls="-.", lw=0.8, label="classical optimum −2.844")
    ax.set_xlim(-0.5, len(xi) - 0.5); ax.set_ylim(-4, max(yi) + 2)
    ax.set_xlabel("COBYLA iteration on Classiq simulator"); ax.set_ylabel("sampled ⟨C⟩")
    ax.set_title(f"Classiq QAOA p=1 — iteration {k}: ⟨C⟩ = {yi[k-1]:.2f}", fontweight="bold")
    ax.legend(fontsize=9, loc="upper right"); fig.tight_layout()
    fig.savefig(FR / f"c{k:03d}.png"); plt.close(fig)

# ---------- 4. Circuit stats ----------
fig, ax = plt.subplots(figsize=(8, 4.2))
stats = {"p=1": p1["circuit"]["count_ops"], "p=2": p2["circuit"]["count_ops"]}
gates = ["cx", "rz", "h", "rx"]
for i, (lab, gc) in enumerate(stats.items()):
    ax.bar([j + (i - 0.5) * 0.36 for j in range(4)], [gc.get(k, 0) for k in gates], 0.36, label=lab)
ax.set_xticks(range(4)); ax.set_xticklabels(["CX", "RZ", "H", "RX"])
ax.set_ylabel("gate count (transpiled)")
ax.set_title("Transpiled circuit: 12 qubits, depth 59 (p=1) / 114 (p=2)\n73-term, 2-local cost Hamiltonian → only CX + RZ", fontweight="bold")
ax.legend(); fig.tight_layout(); fig.savefig(OUT / "circuit_stats.png"); plt.close(fig)

print("charts:", sorted(p.name for p in OUT.glob("*.png")))
print("conv frames:", len(list(FR.glob("c*.png"))))
