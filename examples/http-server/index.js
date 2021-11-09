const http = require("http");
const https = require("https");
const fs = require("fs");
const config = require('./config.json')

const Palladium = require("../../lib/server");
const Server = http.Server()

const proxy = new Palladium({
  prefix: config.prefix,
  encode: "plain",
  ssl: true,
  debug: true,
})

proxy.clientScript().ws(Server)

Server.on('request', (req, res) => {if(req.url.startsWith(proxy.prefix)){return proxy.request(req, res)}else{return res.end(fs.readFileSync(__dirname+'/index.html'))}}).listen((process.env['PORT'] || config.port ||  8080), () => {console.log((proxy.ssl ? 'https' : 'http')+'://localhost:'+(process.env['PORT'] || config.port ||  8080))});