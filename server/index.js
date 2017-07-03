var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var brain = require('brain');
var net = new brain.NeuralNetwork();

mongoose.connect('mongodb://localhost/hridb', {
  db: {
    safe: true
  }
});

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
);

require('./seed');

app.use(bodyParser.json());

require('./routes')(app);

// app.all('*', function(req, res, next) {
//      var origin = req.get('origin');
//      res.header('Access-Control-Allow-Origin', origin);
//      res.header("Access-Control-Allow-Headers", "X-Requested-With");
//      res.header('Access-Control-Allow-Headers', 'Content-Type');
//      next();
// });


app.use('/js', express.static(__dirname + '/../client/js'));
app.use('/css', express.static(__dirname + '/../client/css'));
app.use('/views', express.static(__dirname + '/../client/views'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.route('/*').get(function(req, res){
  res.sendFile('index.html', {root: __dirname + '/../client'});
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port: " + server_port  );
});
