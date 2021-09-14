const express = require('express')
var async = require("async");
const Excel = require('exceljs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//***************db Connect*************************************************

const { Pool } = require('pg')
const pool = new Pool({
  user: 'royschuyler',
  host: 'localhost',
  database: 'main',
  password: 'Hollie12',
  port: 5432
})

function wrap(artist){
var workbook = new Excel.Workbook();

var worksheet = workbook.addWorksheet('0321 SH');

  //********* Channel Report ****************************


pool.query("SELECT distinct(trans_type_description), SUM(quantity) as quantity, SUM(label_share_net_receipts) as revenue from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' and quantity > 0 group by trans_type_description", (err, res) => {
//console.log(res,err)
var resp = res.rows;
var space = resp.length

//HEADERS
worksheet.getCell('A1').value = 'CHANNEL REPORT';
worksheet.getCell('A2').value = 'TRANSACTION TYPE';
for(i=0;i<resp.length;i++){
  //arr.push(resp[i].retailer)
  worksheet.getCell('A' + (i +3)).value = resp[i].trans_type_description;
  worksheet.getCell('B' + (i +3)).value = resp[i].quantity;
  worksheet.getCell('C' + (i +3)).value = '$' + resp[i].revenue.toFixed(2);
}


//********************************** END Channel Report *********************************************
//********* Begin Source Report ************************
pool.query("SELECT distinct(retailer), SUM(label_share_net_receipts) as revenue from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' and label_share_net_receipts > 0.00000001 group by retailer", (err, res) => {
//console.log(res,err)
var resp = res.rows;
var sourceSpace = resp.length

//HEADERS

worksheet.getCell('E1').value = 'Source Report';
worksheet.getCell('E2').value = 'SOURCE TYPE';
worksheet.getCell('F2').value = 'REVENUE';
for(i=0;i<resp.length;i++){
  //arr.push(resp[i].retailer)
  worksheet.getCell('E' + (i +3)).value = resp[i].retailer;
  worksheet.getCell('F' + (i +3)).value = '$' + resp[i].revenue;
}


//********* End Source Report ************************

//********* Start data dump *********************************

  pool.query("SELECT * from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' order by retailer, orchard_upc, product_name,track_name limit 10", (err, res) => {
  //console.log(res,err)
  
  worksheet.getRow(sourceSpace + 9).values = [
  'period',
  'activity_period',
  'retailer',
  'territory', 
  'orchard_upc', 
  'manufacture_upc',
  'project_code', 
  'product_code',
  'sub_account',
  'imprint_label',
  'artist_name',
  'product_name',
  'track_name',
  'track_artist',
  'isrc',
  'volume',
  'track_integer',
  'trans_type',
  'trans_type_description', 
  'unit_price', 
  'discount',
  'actual_price',
  'quantity',
  'total',
  'adjusted_total',
  'split_rate',
  'label_share_net_receipts',
  'ringtone_publishing',
  'cloud_publishing',
  'publishing',
  'mech_admin_fee',
  'preferred_currency',
  ];

  worksheet.columns = [
    {key: 'period'},
    {key: 'activity_period'},
    {key: 'retailer'},
    {key: 'territory'},
    {key: 'orchard_upc'},
    {key: 'manufacture_upc'},
    {key: 'project_code'},
    {key: 'product_code'},
    {key: 'sub_account'},
    {key: 'imprint_label'},
    {key: 'artist_name'},
    {key: 'product_name'},
    {key: 'track_name'},
    {key: 'track_artist'},
    {key: 'isrc'},
    {key: 'volume'},
    {key: 'track_integer'},
    {key: 'trans_type'},
    {key: 'trans_type_description'},
    {key: 'unit_price'},
    {key: 'discount'},
    {key: 'actual_price'},
    {key: 'quantity'},
    {key: 'total'},
    {key: 'adjusted_total'},
    {key: 'split_rate'},
    {key: 'label_share_net_receipts'},
    {key: 'ringtone_publishing'},
    {key: 'cloud_publishing'},
    {key: 'publishing'},
    {key: 'mech_admin_fee'},
    {key: 'preferred_currency'}
  ]
  var data = res.rows;

  // Dump all the data into Excel
  data.forEach((e, index) => {
    // row 1 is the header.
    const rowIndex = index + 2

    // By using destructuring we can easily dump all of the data into the row without doing much
    // We can add formulas pretty easily by providing the formula property.
    worksheet.addRow({
      ...e,
    })
  })


  // force the columns to be at least as long as their header row.
  // Have to take this approach because ExcelJS doesn't have an autofit property.
  worksheet.columns.forEach(column => {
    column.width = worksheet.getRow(sourceSpace + 9).values.length
  })

  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(sourceSpace + 9).font = {bold: true}
  //************** END data dump *********************************





  workbook.xlsx.writeFile(artist + '.xlsx')
})  
})
})   
}

//var artistsArr = ['Josh Rennie-Hynes','Leftover Salmon','Phil Madeira','Mitchell Tenpenny']
var artistsArr = ['Dave Hause']

for(i=0;i<artistsArr.length;i++){
  wrap(artistsArr[i])
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})