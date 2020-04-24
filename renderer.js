import { Chess_Model } from './model/Chess_Model.js'
import { Chess_Controller } from './controller/Chess_Controller.js'
import { Chess_View } from './view/Chess_View.js'

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let model = new Chess_Model()
let controller = new Chess_Controller( model )
let view = new Chess_View( controller )
view.run()