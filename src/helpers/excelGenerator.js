const db = require('../db')
const Todo = db.Todo
const Done = db.Done
var xl = require('excel4node');

module.exports = async function (result, res) {
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Sheet 1');

  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
      
    },
    numberFormat: '##0',
    // numberFormat: '$#,##0.00; ($#,##0.00); -',
  });

  ws.column(2).setWidth(30);

  ws.cell(1, 1).string('').style(style);
  ws.cell(1, 2).string('Todo').style(style);
  ws.cell(1, 3).string('Status').style(style);
  ws.cell(1, 4).string('Priority').style(style);
  //ws.cell(2, 1).number(1).style(style);

  let row = 1

  for await (const item of result.todoTasks) {
    row++

    ws.cell(row, 1).number(2).style(style);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Todo').style(style);
    ws.cell(row, 4).string(item.priority.toLowerCase()).style(style);


  }

  for await (const item of result.doneTasks) {
    row++

    ws.cell(row, 1).number(2).style(style);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Done').style(style);
    ws.cell(row, 4).string(item.priority.toLowerCase()).style(style);

  }

//if(result.todoTasks = selected){}
row++
  row++
    ws.cell(row, 2).string('Todo total').style(style);
    ws.cell(row, 3).formula('SUMIF(C2:C4, "Todo", A1:A4)').style(style);


      row++
  ws.cell(row, 2).string('Done total').style(style);
  ws.cell(row, 3).formula('SUMIF(C2:C4, "Done", A1:A4)').style(style);

  




  wb.write('Excel.xlsx', res);
}