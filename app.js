var express = require('express');
var app = express();
const port = 3000;
 
app.use(express.static('app'));
app.use(express.static('fonts'));
app.use(express.static('img'));

var livereload = require('livereload');
var server = livereload.createServer({ exts: [ 'html', 'js', 'md' ] });
server.watch(__dirname + "/app");

app.listen(port, () => console.log(`Presentasjon kjører på http://localhost:${port}`));
