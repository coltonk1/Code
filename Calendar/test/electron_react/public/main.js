// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const { exec } = require('child_process');

ipc = ipcMain

defaultWidth = 16*75;
defaultHeight = 9*75;

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: defaultWidth,
    height: defaultHeight,
    minWidth: 16*75,
    minHeight: 9*50,
    frame: false,
    title: "Midnight",
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModules: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'example@outlook.com',
    pass: 'password'
  }
});

function send_text(text){
console.log(text)
var mailOptions = {
  from: 'Calendar <example@outlook.com>',
  to: '1234567890@vtext.com',
  subject: '',
  text: text
};

  transporter.sendMail(mailOptions, function(error, info){
    window = BrowserWindow.getFocusedWindow()
    if (error) {
      console.log(error);
      window.webContents.send('get_t', true)
    } else {
      console.log('Email sent: ' + info.response);
      window.webContents.send('get_t', false)
      exec('shutdown /s /t 61', function (error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      });
    }
  });
}

ipc.on('send_text', function(e, args){
  console.log("sent text: " + args)
  send_text(args)
})

const fs = require("fs")

ipc.on("set_data", function(e, json_){
  fs.writeFile(__dirname + "../../../tmp/reminders.txt", json_, function(err){
    if(err){
      return console.log(err)
    }
    console.log("File saved.")
  })
})

ipc.on('get_data', ()=>{
  fs.readFile(__dirname + "../../../tmp/reminders.txt", "utf8", function(err, data){
    console.log(data)
    send_da(data)
  })
})

function send_da(data){
  window = BrowserWindow.getFocusedWindow()
  window.webContents.send('get_data', data)
}



ipc.on('close', function(){
  window = BrowserWindow.getFocusedWindow()
  app.quit()
})

ipc.on('minimize', function(e){
  window = BrowserWindow.getFocusedWindow()
  window.minimize()
})

ipc.on('maximize', function(e){
  window = BrowserWindow.getFocusedWindow()
  if(!window.isMaximized())
    window.maximize()
  else
    window.unmaximize()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
