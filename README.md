# VSCode Pomodoro Timer

A customizable Pomodoro timer extension for Visual Studio Code that helps you manage your work/break cycles effectively.

## Features

- 🎯 Integrated status bar timer with visual indicators
- ⚡ Quick access controls (start, pause, reset)
- 🎨 Visual feedback with color changes (default during work, green during break)
- ⚙️ Customizable durations for both work and break periods
- 📋 Predefined time presets (25/5, 50/10)
- 🔔 Notifications when phases change

![Status Bar Timer](timer.png)

## Installation

1. Launch VS Code
2. Press `Ctrl+P` / `Cmd+P` to open the Quick Open dialog
3. Type `ext install vscode-pomodoro`
4. Click Install

## Usage

### Starting the Timer
- Click the timer in the status bar
- Use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "Pomodoro: Start Timer"

### Controls
- **Start/Pause**: Click the timer in the status bar or use the command palette
- **Reset**: Use the command palette and search for "Pomodoro: Reset Timer"

### Timer Phases
- **Work Phase**: Default status bar color
- **Break Phase**: Green status bar color

## Configuration

You can customize the extension through VS Code's settings (`Ctrl+,` / `Cmd+,`):

```json
{
  // Choose preset configurations
  "pomodoro.preset": "25/5",  // Options: "25/5", "50/10", "custom"

  // Custom durations (in minutes)
  "pomodoro.workDuration": 25,
  "pomodoro.breakDuration": 5
}
```

## Keyboard Shortcuts

You can add custom keyboard shortcuts in VS Code's Keyboard Shortcuts editor:

```json
{
  "key": "ctrl+alt+s",  // or your preferred shortcut
  "command": "pomodoro.start",
  "when": "editorTextFocus"
}
```

## Development

Want to contribute? Great! Here's how to set up the development environment:

1. Clone the repository:
```bash
git clone https://github.com/arturgomes/vscode-pomodoro.git
```

2. Install dependencies:
```bash
cd vscode-pomodoro
npm install
```

3. Open in VS Code:
```bash
code .
```

4. Press `F5` to start debugging

## License

[MIT](LICENSE)

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Release Notes

### 1.0.0

Initial release of VSCode Pomodoro Timer:
- Basic timer functionality
- Status bar integration
- Configurable durations
- Preset configurations

## Contact

Your Name - [@arturoli](https://linkedin.com/in/arturoli)

Project Link: [https://github.com/arturgomes/vscode-pomodoro](https://github.com/arturgomes/vscode-pomodoro)