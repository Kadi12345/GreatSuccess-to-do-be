const { jsPDF } = require('jspdf')
require('jspdf-autotable')

module.exports = async function (result, res) {
  const doc = new jsPDF('p', 'mm');

  let startX = 15
  let startY = 20

  const header = [
    { header: 'Title', dataKey: 'title' },
    { header: 'Priority', dataKey: 'priority' },
  ]

  if (result.todoTasks.length > 0) {
    doc.text("Todo", startX, startY);
    startY += 5

    const table = doc.autoTable(header, result.todoTasks, {
      startY,
      didDrawPage (HookData) {
        return HookData.table
      }
    })

    startY = table.lastAutoTable.finalY + 16
  }

  if (result.doneTasks.length > 0) {
    startY += 5

    doc.autoTable(header, result.doneTasks, {
      startY
    })
  }

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
