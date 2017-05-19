// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate(see:
  // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate)
  // findOneAndUpdate(filter, update, options, callback)

  //
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('591f3068b97fde9ca7841e97')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false  ////note: this option by default is true!!
  // }).then((result) => {
  //   console.log(result);
  // });

// Challenges:
// (1) Update the sole record in the Users collection so that it has a different name.
// (2) Increment the age by 1 using the inc method

// (1) Change the name to be 'Andrew' and (2) Increment the value of "age" by 1
db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('591e2baea7dc9d60ac4ad521')
}, {
  $set: {
    name: 'Andrew'
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

  // db.close();
});
