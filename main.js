const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 1280, height: 800 });
  win.setResizable(false)
  // load the dist folder from Angular
  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/index.html`),
  //     protocol: "http://127.0.0.1:8080",
  //     slashes: true
  //   })
  // );

  // Specify entry point
  win.loadURL('http://localhost:4200');

  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
    app.quit();
  // }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});