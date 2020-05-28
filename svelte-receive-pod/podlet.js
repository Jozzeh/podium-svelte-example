const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");

const app = express();

// Basic definition of the podlet
const podlet = new Podlet({
  name: "svelteReceivePod", // required
  version: "0.1.0", // required
  pathname: "/", // required
  manifest: "/manifest.json", // optional, defaults to '/manifest.json'
  development: true, // optional, defaults to false
});

let svelteassets = fs.readdirSync('public/build');

// All css and js files in the build folder should be added to the podlet definition.
svelteassets.forEach((element, index) => {
  if(element.indexOf('.css') !== -1 && element.indexOf('.css.map') === -1){
    podlet.css({ value: "http://localhost:7101/build/" + element });
  }else if(element.indexOf('.js') !== -1 && element.indexOf('.js.map') === -1) {
    podlet.js({ value: "http://localhost:7101/build/" + element, defer: true });
  }
});

// apply middleware
app.use(podlet.middleware());

// static files
app.use("/build", express.static("public/build/"));

// add HTML to send. This is the div ID in public/index.html
app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<div id="svelte-receive"></div>');
});

// generate the podlet manifest
app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

//start the app at port 7100
app.listen(7101);
