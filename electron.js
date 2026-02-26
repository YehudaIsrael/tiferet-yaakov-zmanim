const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const startUrl = process.env.BUILD
        ? `file://${path.join(app.getAppPath(), 'build/index.html')}`
        : 'http://localhost:3000';

    mainWindow.loadURL(startUrl);

    mainWindow.webContents.on('render-process-gone', (event, details) => {
        console.log(`Renderer process gone (${details.reason}), reloading...`);
        mainWindow.reload();
    });

    mainWindow.on('unresponsive', () => {
        console.log('Window stuck, reloading...');
        mainWindow.reload();
    });

    mainWindow.on('closed', () => {
        app.quit();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
