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
            cellWidth: 60,
              },
              priority: {
                cellWidth: 60,
                    },
              date: {
                 cellWidth: 60,
                    }
            },
      startY,
     
      willDrawCell (HookData) {
        if (HookData.cell.section === 'body') {
          if (HookData.column.dataKey === 'date') {
            HookData.cell.text = today
          }
        }
        if (HookData.cell.section === 'body') {
          if (HookData.column.dataKey === 'priority') {
          function capitalizeFirstLetter(str) {
            return (str && typeof str === 'string') ? (str.charAt(0).toUpperCase() + str.slice(1)) : "";
        } 
            HookData.cell.text = capitalizeFirstLetter('priority') //todo: kuidas siia saada reaalne priority väärtus, sõna "priority" asemele, funktsioon toimib.
          }
      }},
      
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
            cellWidth: 60,
              },
              priority: {
                cellWidth: 60,
                    },
              date: {
                 cellWidth: 60,
                    }
            },
      startY,
      willDrawCell (HookData) {
        if (HookData.cell.section === 'body') {
          if (HookData.column.dataKey === 'date') {
            HookData.cell.text = today
          }
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


//import 'jspdf-autotable' //kui paned id, saad ka frondis muuta
//const doc = new jsPDF(); // siia sisse määran ühikud ja muud setupid, tekste ja asju saab muuta ka vahepeal. näiteks ("p", "mm"), aga võib olla default
// doc.text("Done", startX, startY); // kaugused lehe äärest, vasakult ja ülevalt, asendan numbrid startY ja startX 
//doc.text("Todo", 10, 10); // kui nii teen, 2 sama, siis läheb üksteise peale, 
//startY += 12 //kui tahan madalamale, saan teha teisele reale 
//Lisaks kuupäev juurde, Priority ilusasti esimene suur algustäht ja ülejäänud väikesed
// kolmas tabel- mitu todo-d on todos ja mitu dones, kaks columni näiteks ja sinna alla number 1 tk ja 4 tk näiteks
//muuta tabelite välimust, et ei oleks selline sinine
//ühesõnaga
//et kui mul on pdf, siis kas see vormistamine nt priorityl käib nii, et enne tabeli loomist peab ära panema resuldile jub akülge, et ta vormistaks suure tähega ?
//tabeli sees vist enam ju ei saa?
//tabeli sees hookidega saab mudida resulti, aga lihtsam on enne seda teha.
