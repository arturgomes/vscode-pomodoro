const vscode = require('vscode');

class PomodoroTimer {
    constructor(context) {
        this.context = context;
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.isRunning = false;
        this.isWorkPhase = true;
        this.timeLeft = 0;
        this.timer = null;
        this.workDuration = 25;
        this.breakDuration = 5;

        // Initialize the status bar item
        this.statusBar.command = 'pomodoro.start';
        this.updateStatusBar();
        this.statusBar.show();

        // Load configuration
        this.loadConfig();
    }

    loadConfig() {
        const config = vscode.workspace.getConfiguration('pomodoro');
        const preset = config.get('preset');

        if (preset === 'custom') {
            this.workDuration = config.get('workDuration');
            this.breakDuration = config.get('breakDuration');
        } else {
            const [work, break_] = preset.split('/').map(Number);
            this.workDuration = work;
            this.breakDuration = break_;
        }

        this.resetTimer();
    }

    updateStatusBar() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const phase = this.isWorkPhase ? 'Work' : 'Break';
        const icon = '⏰';

        this.statusBar.text = `${icon} ${timeString} (${phase})`;
        this.statusBar.backgroundColor = this.isWorkPhase ? new vscode.ThemeColor('statusBar.background') : new vscode.ThemeColor('terminal.ansiGreen');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => this.tick(), 1000);
            this.statusBar.command = 'pomodoro.pause';
            vscode.window.showInformationMessage(`Pomodoro ${this.isWorkPhase ? 'work' : 'break'} session started!`);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
            this.statusBar.command = 'pomodoro.start';
            vscode.window.showInformationMessage('Pomodoro timer paused');
        }
    }

    reset() {
        this.pause();
        this.isWorkPhase = true;
        this.resetTimer();
        vscode.window.showInformationMessage('Pomodoro timer reset');
    }

    resetTimer() {
        this.timeLeft = this.isWorkPhase ? this.workDuration * 60 : this.breakDuration * 60;
        this.updateStatusBar();
    }

    tick() {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
            this.isWorkPhase = !this.isWorkPhase;
            this.resetTimer();
            
            const message = this.isWorkPhase ? 
                'Break time is over! Time to work!' : 
                'Work session completed! Take a break!';
            
            vscode.window.showInformationMessage(message);
        }
        this.updateStatusBar();
    }

    dispose() {
        this.pause();
        this.statusBar.dispose();
    }
}

function activate(context) {
    const pomodoro = new PomodoroTimer(context);

    let startCommand = vscode.commands.registerCommand('pomodoro.start', () => {
        pomodoro.start();
    });

    let pauseCommand = vscode.commands.registerCommand('pomodoro.pause', () => {
        pomodoro.pause();
    });

    let resetCommand = vscode.commands.registerCommand('pomodoro.reset', () => {
        pomodoro.reset();
    });

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('pomodoro')) {
                pomodoro.loadConfig();
            }
        })
    );

    context.subscriptions.push(pomodoro);
    context.subscriptions.push(startCommand);
    context.subscriptions.push(pauseCommand);
    context.subscriptions.push(resetCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};