const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

let token = jwt.sign(data, '123abc'); // sign takes data and a secret
console.log(token);


let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);


// basic hash function - SHA256

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// // above: salting the hash using the "somesecret" string
//
// // the salting prevents an intrustion attempt like the two lines below:
// // the salt will prevent the change and trigger our error message
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed.  Don\'t trust');
// }
