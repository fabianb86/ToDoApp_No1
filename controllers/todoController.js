//14. Require body parser
var bodyParser = require('body-parser');

//12. Dummy data
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
//15. Middleware for post request
var urlencodedParser = bodyParser.urlencoded({extended : false});

//05. Exporting the module
module.exports = function(app){
  //08. Prepare get request
  app.get('/todo', function(req, res){
    //09-12. Render
    res.render('todo', {todos: data});
  });
  //08-15. Prepare post request
  app.post('/todo', urlencodedParser, function(req, res){
    //15. Add data
    data.push(req.body);
    res.json(data);
  });
  //08-16. Prepare delete request
  app.delete('/todo/:item', function(req, res){
    // 16. Delete an item
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });
}