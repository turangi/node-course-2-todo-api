// local imports
let express = require('express');
let bodyParser = require('body-parser');

// library imports kept a line-space from local imports
let {mongoose} = require('./db//mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// Inside a REST api,there are the basic CRUD operations
// To create a resourse, use the POST http method to send that resource
// as a body.  This means that when we want make a new Todo, we'll send a
// JSON object over the server.  This object
// will have a text property. The server will GET the text property, create
// the new model, and send the complete model with the ID, the completed
// property and the completedAt back to the client.

// set up an express route, using the two arguments URL and callback with
// request and response objects
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
