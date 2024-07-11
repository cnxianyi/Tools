# Check and add type to use Windows API
if (-not ([System.Management.Automation.PSTypeName]'User32').Type) {
    Add-Type @"
    using System;
    using System.Runtime.InteropServices;
    public class User32 {
        [DllImport("user32.dll")]
        public static extern IntPtr GetForegroundWindow();
        [DllImport("user32.dll", SetLastError = true)]
        public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);
        [DllImport("user32.dll", SetLastError = true)]
        public static extern int GetWindowTextLength(IntPtr hWnd);
        [DllImport("user32.dll")]
        public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
    }
    public struct RECT
    {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }
"@
}

# Get the handle of the foreground window
$hWnd = [User32]::GetForegroundWindow()

# Get window title
$length = [User32]::GetWindowTextLength($hWnd)
$sb = New-Object -TypeName System.Text.StringBuilder -ArgumentList $length
[User32]::GetWindowText($hWnd, $sb, $sb.Capacity + 1) | Out-Null
$windowTitle = $sb.ToString()

# Initialize process ID variable
$processId = 0

# Get process ID
$null = [User32]::GetWindowThreadProcessId($hWnd, [ref]$processId)

# Get current timestamp
$currentTimestamp = Get-Date -Format "HH:mm:ss"

# Get process information
if ($processId -ne 0) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

    if ($process) {
        # Output result as JSON
        $output = @{
            WindowTitle = $windowTitle
            ProcessName = $process.Name
            Timestamp = $currentTimestamp
        }
        $output | ConvertTo-Json -Depth 3 -Compress

        # Define the URL of your Koa server endpoint
        #
    } else {
        Write-Output "Unable to retrieve process information"
    }
} else {
    Write-Output "Unable to retrieve process ID of the foreground window"
}
