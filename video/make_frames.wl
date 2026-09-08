(* Frames for the demo video: QAOA p=2 distribution as the angles ramp 0 -> optimum.
   Same statevector engine and conventions as quantum/wolfram_realdataset_algorithms.wl.
   Run: wolframscript -file C:\Projects\Hackton\group\video\make_frames.wl
   Then: ffmpeg (see make_video.ps1) *)

dir = "C:\\Projects\\Hackton\\data\\";
frameDir = "C:\\Projects\\Hackton\\group\\video\\frames\\";
If[!DirectoryQ[frameDir], CreateDirectory[frameDir]];
lambda = 1.5; mu = 0.3;
lin = Import[dir <> "opencellid_il2.csv", "CSV"]; head = First[lin]; rows = Rest[lin];
cvec = N[rows[[All, First@First@Position[head, "coverage_gain"]]]];
int = Import[dir <> "opencellid_il2_interference.csv", "CSV"];
imat = N[If[NumericQ[int[[1, 2]]], int, Rest[int]][[All, 2 ;;]]];
n = Length[cvec]; nQ = 2 n; dim = 2^nQ;
tilts[i_] := Table[BitAnd[BitShiftRight[i, 2 k], 1] + 2 BitAnd[BitShiftRight[i, 2 k + 1], 1], {k, 0, n - 1}];
costVec = N[Table[With[{t = tilts[i]}, t.imat.t - lambda (cvec.t) + mu Total[t]], {i, 0, dim - 1}]];
minCost = Min[costVec]; optIdx = First@First@Position[costVec, minCost];
apply1[g_, vec_, k_] := Module[{t}, t = Transpose[ArrayReshape[vec, {2^(nQ - k - 1), 2, 2^k}], {2, 1, 3}];
   Flatten[Transpose[g . t, {2, 1, 3}]]];
hInit = ConstantArray[N[1/Sqrt[dim]], dim];
mixer[vec_, b_] := Fold[apply1[{{Cos[b/2], -I Sin[b/2]}, {-I Sin[b/2], Cos[b/2]}}, #1, #2] &, vec, Range[0, nQ - 1]];
phase[vec_, g_] := Exp[I g costVec] vec;

res = Import["C:\\Projects\\Hackton\\verification\\results\\wolfram_realdataset_algorithms.json"];
p2 = "params" /. ("qaoa_p2" /. res);
state[s_] := Fold[mixer[phase[#1, s #2[[1]]], s #2[[2]]] &, hInit, {p2[[1 ;; 2]], p2[[3 ;; 4]]}];

nFrames = 120;
frame[k_] := Module[{s = Min[1, k/(nFrames - 20)], psi, pr, ec, pneg, popt, sc, bars},
  psi = state[s]; pr = Abs[psi]^2;
  ec = costVec . pr; pneg = Total[Pick[pr, Map[# < 0 &, costVec]]]; popt = pr[[optIdx]];
  sc = ListPlot[{Transpose[{costVec, ConstantArray[1/dim, dim]}], Transpose[{costVec, pr}]},
    PlotStyle -> {Directive[Gray, PointSize[0.004]], Directive[Red, PointSize[0.006]]},
    ScalingFunctions -> {None, "Log"}, PlotRange -> {{-5, 175}, {10^-8, 0.3}},
    Frame -> True, FrameLabel -> {"cost of basis state (lower is better)", "sampling probability (log)"},
    PlotLegends -> Placed[{"uniform 1/4096", "QAOA p=2"}, {0.8, 0.85}],
    GridLines -> {{{minCost, Directive[Blue, Dashed, Thick]}}, None},
    (* Epilog coordinates are in the scaled (log) space *)
    Epilog -> {Text[Style["optimum -2.844", Blue, 11], {minCost + 22, Log[0.15]}]},
    ImageSize -> 640, AspectRatio -> 0.75];
  bars = BarChart[{0.024, pneg}, ChartStyle -> {Gray, Red}, ChartLabels -> {"uniform", "QAOA"},
    PlotRange -> {0, 1}, Frame -> True, FrameLabel -> {None, "P(cost < 0)"},
    ChartLabels -> Placed[{"uniform", "QAOA"}, Above], ImageSize -> 260, AspectRatio -> 1.6,
    PlotLabel -> Style[Column[{Row[{"angles at ", ToString[Round[100 s]], "% of optimum"}],
        Row[{"<C> = ", ToString[NumberForm[ec, {5, 3}]]}],
        Row[{"P(opt) = ", ToString[NumberForm[popt, {4, 4}]], "  (", ToString[Round[popt dim, 0.1]], "x uniform)"}]}], 12]];
  Grid[{{Style["QAOA on 6 real antennas, 12 qubits: probability moves to low cost", Bold, 16], SpanFromLeft},
        {sc, bars}}, Alignment -> Center, Background -> White]];

Do[Export[frameDir <> "f" <> IntegerString[k, 10, 3] <> ".png", frame[k], ImageResolution -> 100];
   If[Mod[k, 20] == 0, WriteString["stdout", "frame ", k, "\n"]], {k, 0, nFrames - 1}];
WriteString["stdout", "done: ", nFrames, " frames in ", frameDir, "\n"];
