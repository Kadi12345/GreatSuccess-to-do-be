
var xl = require('excel4node');

module.exports = async function (result, res) {
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Sheet 1');

  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: 'integer', 
    //numberFormat: '##0',
    // numberFormat: '$#,##0.00; ($#,##0.00); -',
border: {
  left: {
    style: 'thick', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
    color: '#000000' 
},
right: {
  style: 'thick', 
  color: '#000000'
},
top: {
  style: 'thick', 
  color: '#000000'
},
bottom: {
    style: 'thick', 
    color: '#000000'
},
}
  });
  const headerStyle = wb.createStyle({
    font: {
      bold: true,  
    }
  });

  let row = 1
  ws.column(2).setWidth(30);

 ws.cell(1, 1).string('')
  ws.cell(1, 2).string('Todo').style(style).style(headerStyle);
  ws.cell(1, 3).string('Status').style(style).style(headerStyle);
  ws.cell(1, 4).string('Priority').style(style).style(headerStyle);
 
  
  
  for await (const item of result.todoTasks) {
    row++
    ws.cell(row, 1).number(row-1).style(style).style(headerStyle);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Todo').style(style);
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  }
    ws.cell(row, 4).string(item.priority.capitalize()).style(style);
  }

  for await (const item of result.doneTasks) {
    row++
    ws.cell(row, 1).number(row-1).style(style).style(headerStyle);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Done').style(style);
    ws.cell(row, 4).string(item.priority.toLowerCase()).style(style);
  }
 
  row++
  if (result.todoTasks.length > 0) {
  row++
    ws.cell(row, 1).string('Todo total:').style(headerStyle);
    ws.cell(row, 2).formula('SUMIF(C:C, "Todo", A:A)').style( {font: {
      bold: true,
    },
    alignment: {
      horizontal: 'left',
    },
    prefix: 'left'
  });
  }
  if (result.doneTasks.length > 0) {
      row++
  ws.cell(row, 1).string('Done total:').style(headerStyle);
  ws.cell(row, 2).formula('SUMIF(C:C, "Done", A:A)').style( {font: {
    bold: true,
  },
  alignment: {
    horizontal: 'left',
  },
  prefix: 'left'
});

}
  wb.write('Excel.xlsx', res);
}