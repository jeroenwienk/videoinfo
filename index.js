const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;
let mainWindow = null;

app.on('ready', () => {
  console.log('App is ready');
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('fileSubmit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    if (err) {
      console.log(err)
    } else {
      mainWindow.webContents.send('fileMetadata', metadata.format.duration);
    }
  });
});