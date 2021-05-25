const db = require('../db');
const Todo = db.Todo;
const Done = db.Done;

module.exports = async function (req, res) {
  try {
    const result = [
      {
        title: 'Todo',
        tasks: await Todo.distinct('author'),
      },
      {
        title: 'Done',
        tasks: await Done.distinct('author'),
      },
    ];

    const filterTodoObject = Object.values(result[0]);
    const todoAuthors = Object.values(filterTodoObject[1]);

    const filterDoneObject = Object.values(result[1]);
    const doneAuthors = Object.values(filterDoneObject[1]);

    const mergeAuthors = todoAuthors.concat(doneAuthors);

    const uniqueAuthorsList = mergeAuthors.filter((item, index) => {
      return mergeAuthors.indexOf(item) == index;
    });

    res.status(200).json(uniqueAuthorsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
