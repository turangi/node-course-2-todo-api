// local imports
let express = require('express');
let bodyParser = require('body-parser');

// library imports kept a line-space from local imports
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const app = express();

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// Challenge: Lecture 78:  Create an API route for fetching an individual todo
//
// How to fetch a variable that is passed in from a URL:
// GET /todos/1234324 - this part of the URL needs to be dynamic
// use a URL parameter, with colon followed by a name
/* *** How I did it ***

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  // // Check for valid id using isValid
  // if(!ObjectID.isValid(id)) {
  //   res.status(404).send('Id not valid.');
  // };


  // Next, query the database by using findById
  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send('Todo was not found');
    }
    res.send(todo);
  }).catch((e) => res.status(400).send('Not a valid URL'));
});

**** End of how I did it ***/


/*** How the instructor did it ***/
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();  //note: I needed to add a return prefix
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo}); // Note: This is equivalent to res.send({todo: todo}), gratis ES6
  }).catch((e) => {
    res.status(400).send();  // note:  I didn't use braces here... :^(
  });
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
