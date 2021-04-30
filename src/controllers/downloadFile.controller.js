const db = require('../db')
const Todo = db.Todo
const Done = db.Done

const excelGenerator = require('./../helpers/excelGenerator')
const pdfGenerator = require('./../helpers/pdfGenerator')

module.exports = async function (req, res) {
  try {
    const result = {
      todoTasks: req.body.todo ? await Todo.find({}).lean().exec() : [],
      doneTasks: req.body.done ? await Done.find({}).lean().exec() : []
    }

    if (req.body.fileType === 'XLSX') {
      excelGenerator(result, res)
    }

    if (req.body.fileType === 'PDF') {
      pdfGenerator(result, res)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


//Priority suure algustähega
//Tododele järjekorranumbrid
//1 rida vahele ja kirjutada Todo total ja Done total üksteise alla, järjekorranumbrite summa (näiteks kui doned on 1+2+3) exceli valemina
// kui prindin välja ainult todosid, siis tahan ainult todo totalit ja vastupidi, kui koos siis mõlemad
