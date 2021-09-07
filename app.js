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

var data = [{
  firstName: 'John',
  lastName: 'Bailey',
  purchasePrice: 1000,
  paymentsMade: 100
}, {
  firstName: 'Leonard',
  lastName: 'Clark',
  purchasePrice: 1000,
  paymentsMade: 150
}, {
  firstName: 'Phil',
  lastName: 'Knox',
  purchasePrice: 1000,
  paymentsMade: 200
}, {
  firstName: 'Sonia',
  lastName: 'Glover',
  purchasePrice: 1000,
  paymentsMade: 250
}, {
  firstName: 'Adam',
  lastName: 'Mackay',
  purchasePrice: 1000,
  paymentsMade: 350
}, {
  firstName: 'Lisa',
  lastName: 'Ogden',
  purchasePrice: 1000,
  paymentsMade: 400
}, {
  firstName: 'Elizabeth',
  lastName: 'Murray',
  purchasePrice: 1000,
  paymentsMade: 500
}, {
  firstName: 'Caroline',
  lastName: 'Jackson',
  purchasePrice: 1000,
  paymentsMade: 350
}, {
  firstName: 'Kylie',
  lastName: 'James',
  purchasePrice: 1000,
  paymentsMade: 900
}, {
  firstName: 'Harry',
  lastName: 'Peake',
  purchasePrice: 1000,
  paymentsMade: 1000
}]

// Dump all the data into Excel
data.forEach((e, index) => {
  // row 1 is the header.
  const rowIndex = index + 2

  // By using destructuring we can easily dump all of the data into the row without doing much
  // We can add formulas pretty easily by providing the formula property.
  worksheet.addRow({
    ...e,
    amountRemaining: {
      formula: `=C${rowIndex}-D${rowIndex}`
    },
    percentRemaining: {
      formula: `=E${rowIndex}/C${rowIndex}`
    }
  })
})


// force the columns to be at least as long as their header row.
// Have to take this approach because ExcelJS doesn't have an autofit property.
worksheet.columns.forEach(column => {
  column.width = column.header.length < 12 ? 12 : column.header.length
})

// Make the header bold.
// Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
worksheet.getRow(1).font = {bold: true}


//new worksheet
let worksheet2 = workbook.addWorksheet('Test');
var row = worksheet2.getRow(5);
row.getCell(1).value = 5;
var row2 = worksheet2.getRow(5);
row2.getCell(2).value = 'columnB';



//***************db Connect*************************************************
const { Pool } = require('pg')
const pool = new Pool({
  user: 'royschuyler',
  host: 'localhost',
  database: 'main',
  password: 'Hollie12',
  port: 5432
})

pool.query('SELECT artist_name from main limit 10', (err, res) => {
  console.log(err, res)
  pool.end()
})  



//workbook.xlsx.writeFile('Debtors5.xlsx')




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})