let mongoose = require('mongoose');

// Configure mongoose, connecting to database and defining promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// module.exports = {
//   mongoose: mongoose
// };

// a reduction using ES6 descturcturing to refactor the above expression
module.exports = {mongoose};
