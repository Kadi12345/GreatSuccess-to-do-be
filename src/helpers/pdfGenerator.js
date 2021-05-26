const { jsPDF } = require('jspdf')
require('jspdf-autotable')

module.exports = async function (result, res) {
  const doc = new jsPDF('p', 'mm');
 
  let startX = 15;
  let startY = 20;

  let today = new Date().toISOString().slice(0, 10);
  let newdate = "Date Printed : "+ today;
  doc.text(130,10,newdate);

  const header = [ 
    { header: 'Title', dataKey: 'title' },
    { header: 'Priority', dataKey: 'priority'},
    { header: 'Date', dataKey: 'date' },
  ];

  jsPDF.autoTableSetDefaults(
    {headStyles: { fillColor: ["#710193"] },
    styles: {
            lineColor: [44, 62, 80],
            lineWidth: 0.5,
           },
    bodyStyles: {
          fontStyle: 'bold',
          textColor: [44, 62, 80],
          },
        });

  if (result.todoTasks.length > 0) {
    doc.text("Todo", startX, startY);
    startY += 5
    const table = doc.autoTable(header, result.todoTasks,  {
columnStyles: {
        title: {
            cellWidth: 120,
              },
              priority: {
                cellWidth: 35,
                    },
            },
      startY,
     
      didParseCell (HookData) {
        if (HookData.cell.section === 'body') {
          if (HookData.column.dataKey === 'date') {
            HookData.cell.text = new Date(HookData.cell.raw).toISOString().slice(0, 10); 
          }
        } 
          if (HookData.column.dataKey === 'priority') {
        HookData.cell.text = [(HookData.cell.raw).charAt(0) + (HookData.cell.raw).toLowerCase().slice(1) ]
      } 
    },
      
    didDrawPage (HookData) {
        return HookData.table
      },  
    }); startY = table.lastAutoTable.finalY + 16}

    
  if (result.doneTasks.length > 0) {
    doc.text("Done", startX, startY); 
    startY += 5
    const table = doc.autoTable(header, result.doneTasks, {
      columnStyles: {
        title: {
            cellWidth: 120,
              },
              priority: {
                cellWidth: 35,
                    },
            },
      startY,
      didParseCell (HookData) {
        if (HookData.cell.section === 'body') {
          if (HookData.column.dataKey === 'date') {
            HookData.cell.text = new Date(HookData.cell.raw).toISOString().slice(0, 10);
          }
        }
      if (HookData.column.dataKey === 'priority') {
          HookData.cell.text = [(HookData.cell.raw).charAt(0) + (HookData.cell.raw).toLowerCase().slice(1) ]
        }
      },
     didDrawPage (HookData) {
       return HookData.table
      },  
    }); startY = table.lastAutoTable.finalY + 16}

 let countTodo= result.todoTasks.length
 let countDone= result.doneTasks.length

 doc.text("Result", startX, startY);
 startY += 5
 doc.autoTable({
  head: [['Total number of Todos', 'Total number of Dones']],
  body: [[countTodo + " ex", countDone + " ex"]],
  startY,
});
  res.setHeader('Content-Disposition', 'filename="' + encodeURIComponent(`TODO.pdf`) + '"')
  res.setHeader('Content-Type', 'application/pdf')
  res.end(doc.output(), 'binary')
}
