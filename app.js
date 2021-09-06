const express = require('express')
//const excel = require('excel4node');
//const excelbuilder = require('msexcel-builder');
const Excel = require('exceljs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let workbook = new Excel.Workbook();
let worksheet = workbook.addWorksheet('Debtors');

worksheet.columns = [
  {header: 'First Name', key: 'firstName'},
  {header: 'Last Name', key: 'lastName'},
  {header: 'Purchase Price', key: 'purchasePrice'},
  {header: 'Payments Made', key: 'paymentsMade'},
  {header: 'Amount Remaining', key: 'amountRemaining'},
  {header: '% Remaining', key: 'percentRemaining'}
]



workbook.xlsx.writeFile('Debtors.xlsx')




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})