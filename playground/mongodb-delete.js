// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

// // deleteMany
// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });
// // deleteOne
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });

// // findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
// });

// Challenge:
/*
  Use deleteMany to delete all the documents with the name 'Andrew'.
  Also, remove one of the other existing documents by findOneAndDelete, targeting
  the document to be deleted using id.
*/

// // First part - deleteMany() with Andrew as the name.
// db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
//   console.log(JSON.stringify(result, undefined, 2));
// });
// // Second part - findOneAndDelete() using the document id as the filter
// db.collection('Users').findOneAndDelete({
//      _id: new ObjectID('591f39dcb97fde9ca78420dd')
//    }).then((result) => {
//      console.log(result);
//    });
// // A more simplistic method for deleting, using just a key-value pair for id
// // this time.
// db.collection('Users').findOneAndDelete({_id: 123}).then((result) => {
//   console.log(result);
// });


  // db.close();
});
