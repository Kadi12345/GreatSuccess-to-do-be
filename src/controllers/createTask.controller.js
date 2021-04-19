const db = require('./../db');
const Todo = db.Todo;

module.exports = async function (req, res) {
  if (req.body.priority === 'HIGH') {
    req.body.priorityNumber = 1;
  } else if (req.body.priority === 'MEDIUM') {
    req.body.priorityNumber = 2;
  } else {
    req.body.priorityNumber = 3;
  }
  try {
    await Todo.create(req.body);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
