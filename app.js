//01. Set express as an app
var express = require('express');
//06. Require the module controller
var todoController = require('./controllers/todoController');


var app = express();

//02. Set template engine
app.set('view engine', 'ejs');

//03.Static files
app.use(express.static('./public'));

//07. Fire controllers
todoController(app);

//04. Listen to port
app.listen(3000);
console.log('You are listening to port 3000');

