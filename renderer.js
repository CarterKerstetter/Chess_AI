console.log('1')
import {Game_UI} from './Game_UI.js'
//const {Game_UI} = require('./Game_UI.js')
console.log('2')
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var UI_Manager = new Game_UI();
UI_Manager.setupBoard()