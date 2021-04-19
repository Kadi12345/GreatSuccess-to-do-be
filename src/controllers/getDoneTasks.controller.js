const db = require('../db');
const Done = db.Done;

module.exports = async function (req, res) {
  try {
    const result = [
      {
        title: 'Done',
        tasks: await Done.find({}).sort({ priorityNumber: 1 }).lean().exec(),
      },
    ];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
