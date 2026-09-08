# Records the full desktop (2560x1600, scaled to 1920 wide) + microphone to an MP4 with ffmpeg.
# Usage:  powershell -ExecutionPolicy Bypass -File C:\Projects\Hackton\group\recording\record_screen.ps1 [-Name take1] [-NoMic]
# Stop:   press  q  in this window.
param(
    [string]$Name = ("take_" + (Get-Date -Format "HHmmss")),
    [switch]$NoMic
)
$out = "C:\Projects\Hackton\group\recording\$Name.mp4"
$mic = 'audio=Microphone Array (Realtek(R) Audio)'

$args = @('-y', '-hide_banner', '-loglevel', 'warning', '-stats',
          '-f', 'gdigrab', '-framerate', '30', '-draw_mouse', '1', '-i', 'desktop')
if (-not $NoMic) { $args += @('-f', 'dshow', '-i', $mic) }
$args += @('-vf', 'scale=1920:-2', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p')
if (-not $NoMic) { $args += @('-c:a', 'aac', '-b:a', '128k') }
$args += $out

Write-Host "Recording to $out  (press q here to stop)" -ForegroundColor Cyan
& ffmpeg @args
Write-Host "saved: $out" -ForegroundColor Green
