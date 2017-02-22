var assert = require('chai').assert;
var Todo = require ('../models/todo');
var expect = require ('chai').expect;

describe("Todo", function() {
  it("can create a Todo", function() {
    //Arrange
    var testToDo = new Todo ();
    //Act
    //Assert

    //assert.equal(actual, expected);
    assert.isOk(testToDo);
  });
  it("has error without a name", function(done) {
    //Arrange
    var aTodo = new Todo ();
    aTodo.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it("has error on priority 6", function(done) {
    //Arrange
    var aTodo = new Todo ();
    aTodo.name='Jeffrey';
    aTodo.priority = 6;
    aTodo.validate(function(err) {
      console.log(err);
      expect(err.errors.priority.message).to.equal(
        'Path `priority` (6) is more than maximum allowed value (5).'
      );
      done();
    });
  });

  it("has error on priority 0", function(done) {
    //Arrange
    var aTodo = new Todo ();
    aTodo.name='Jeffrey';
    aTodo.priority = 0;
    aTodo.validate(function(err) {
      expect(err.errors.priority.message).to.equal(
        'Path `priority` (0) is less than minimum allowed value (1).'
      );
      done();
    });
  });

  it("has error on description cowgirl", function(done) {
    //Arrange
    var aTodo = new Todo ();
    aTodo.name='Jeffrey';
    aTodo.priority = 2;
    aTodo.description = 'cowgirl';
    aTodo.validate(function(err) {
      expect(err.errors.description.message).to.equal(
        '`cowgirl` is not a valid enum value for path `description`.'
      );
      done();
    });
  });
});
    //Act
    //Assert
    //assert.equal(actual, expected);
