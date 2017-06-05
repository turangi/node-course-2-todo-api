const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {

      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
    });
  });

  // When we pass in a valid ID that does match a doc, the doc comes back (#3 below)
  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)  // initiate supertest request
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
// The above case was #3 from the list below.  Now, create both 1 and 2.
// Instructor provides starting point(s) (note:  We are still inside the
// describe() block):
  it('should return a 404 if todo not found', (done) => {
    // make a request using a real object id, using the toHexString method
    // that means it will be a valid id, but won't be found in the collection,
    // thus returning a 404.
    // the id-with-no-todo doesn't exist yet, so let's make one:
    // first, create that object id as follows:
    let hexId = new ObjectID().toHexString();

    // make the request...
    request(app)
      .get(`/todos/${hexId}`) // get request, passing in template string with hexId
      .expect(404)
      .end(done);
  });


  // check for invalid id, which will return a 404 error
  it('should return 404 for non-object ids', (done) => {
    // /todos/123 --> this is a valid URL, but not a valid objectID
    request(app)
      .get('/todos/123abc') // URL with invalid objectID
      .expect(404)
      .end(done);
  })
}); // end describe block



// Lecture 79 Notes:
/*  In this lecture, we'll be creating three test cases for the route that
    fetches an individual Todo item.
    The three tests verify that:
  1)  When we pass in an invalid ObjectID, we get a 404 response.

  2)  When we pass in a valid ObjectID, but it doesn't match a doc, we get a 404
      response.

  3)  When we do pass in a valid ObjectID that does match a doc, that the
      document actually comes back in the response body.
*/
