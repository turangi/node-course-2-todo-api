const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Mongo provides three ways to remove records:
// first:
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// second: - removes AND returns the object, which provides an opportunity for undo
// Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '5935c7f3714065dbfb1d6fff'}).then((todo) => {

});

// // third: - as above but uses id for targeting a specific document
Todo.findByIdAndRemove('5935c7f3714065dbfb1d6fff').then((todo) => {
  console.log(todo);
});
