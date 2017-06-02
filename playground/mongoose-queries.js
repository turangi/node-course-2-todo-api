const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '593074e4a096ad0e6b33d81199';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// Lecture #77 Challenge (refer to above):
// Query the users collection (grab a user id via RoboMongo)

// User.findById
// case where the query works but there is no user
// case where the user *was* found -print user to screen
// handle any errors that might have occurred.  Print error to screen.

let id = '592e4a91ca81f9799e028f27';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
};


// User *was* found, using find() and an ID string - this is rudimentary
// User.find({
//   _id: id
// }).then((user) => {
//   console.log('User', user);
// }).catch((e) => console.log(e));

// using findById:
User.findById(id).then((user) => {
  if(!user){
    return console.log('User not found'); // use return to halt further function execution
  }
  // else, query was successful...
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

// User was not found:
