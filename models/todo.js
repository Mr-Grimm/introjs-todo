var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.']
  },
  dueDate: {
    type: Date,

  },
  description: {
    type: String,
    enum: ['student', 'human', 'cowboy']
  },
  priority: {
    type: Number,
    min: 1,
    max: 5
  }
});

// var Jeffrey = db.model('Jeffrey', TodoSchema);
//
// var badJeffrey = new Jeffrey({
//   name: 'Jeffrey',
//   dueDate: 02/21/2017,
//   description: 'coder',
//   priority: 6
// });



module.exports = mongoose.model('Todo', TodoSchema);
