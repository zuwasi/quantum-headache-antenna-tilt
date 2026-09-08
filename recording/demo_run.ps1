# Live Classiq demo for the recording: synthesises the p=1 QAOA, prints the IDE link, samples 4096 shots (~25 s).
# Usage:  powershell -ExecutionPolicy Bypass -File C:\Projects\Hackton\group\recording\demo_run.ps1 [-Layers 1] [-Optimize 0]
param([int]$Layers = 1, [int]$Optimize = 0)
Set-Location C:\Projects\Hackton
Clear-Host
Write-Host "QUBIT 2026 - Quantum Headache - Antenna Tilt QAOA on Classiq" -ForegroundColor Cyan
Write-Host "6 antennas x 4 tilt levels -> 12 qubits, warm start from Wolfram" -ForegroundColor DarkGray
Write-Host ""
$extra = @()
if ($Optimize -gt 0) { $extra += @('--optimize', "$Optimize") }
& C:\Python312\python.exe group\classiq\qaoa_tilt_classiq.py --layers $Layers --shots 4096 --show --tag demo @extra
