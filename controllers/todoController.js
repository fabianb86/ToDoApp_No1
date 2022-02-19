//14. Require body parser
var bodyParser = require("body-parser");
//17. Require mongoose
var mongoose = require("mongoose");

// 18. Connect to database
mongoose.connect(
  "mongodb+srv://<username>:<password><clusterName>.2zud3.mongodb.net/<databaseName>?retryWrites=true&w=majority",
);

// 19. Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

// 20. Create a model
var Todo = mongoose.model("Todo", todoSchema);
// 21. Test the model
// var itemOne = new Todo({item: 'Buy Flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved')
// });

//12. Dummy data
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

//15. To complement the Middleware for post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//05. Exporting the module
module.exports = function (app) {
  //08. Prepare get request
  app.get("/todo", function (req, res) {
    // 22. Get data from mongoDB and pass it to the view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      //09-12. Render
      res.render("todo", { todos: data });
    });
  });

  //08-15. Prepare post request
  app.post("/todo", urlencodedParser, function (req, res) {
    // 23. Get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
    //15. Add data
    // data.push();
    // res.json(data);
  });

  //08-16. Prepare delete request
  app.delete("/todo/:item", function (req, res) {
    // 24. Delete the requested item from MongoDB
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data,
    ) {
      if (err) throw err;
      res.json(data);
    });

    // 16. Delete an item
    // data = data.filter(function(todo){
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json(data);
  });
};
