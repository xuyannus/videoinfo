const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const ffmpeg = require("fluent-ffmpeg");

let mainWin;

app.on("ready", () => {
  mainWin = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
  });
  mainWin.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWin.webContents.send("video:metadata", metadata.format.duration);
  });
});
