const express = require('express')
const Excel = require('exceljs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// var get_connection = require('./get_connection');
// var get_artist = require('./get_artist');
// var test = require('./test');
//***************db Connect*************************************************

const { Pool } = require('pg')
const pool = new Pool({
  user: 'royschuyler',
  host: 'localhost',
  database: 'main',
  password: 'Hollie12',
  port: 5432
})


var workbook = new Excel.Workbook();
pool.query("SELECT * from main where artist_name = 'Adam Hood' and period = '2021M3'", (err, res) => {
  console.log(res,err)
  
  
  var worksheet = workbook.addWorksheet('0321 SH');

  worksheet.columns = [
    {header: 'id', key: 'id'},
    {header: 'period', key: 'period'},
    {header: 'activity_period', key: 'activity_period'},
    {header: 'retailer', key: 'retailer'},
    {header: 'territory', key: 'territory'},
    {header: 'orchard_upc', key: 'orchard_upc'},
    {header: 'manufacture_upc', key: 'manufacture_upc'},
    {header: 'project_code', key: 'project_code'},
    {header: 'product_code', key: 'product_code'},
    {header: 'sub_account', key: 'sub_account'},
    {header: 'imprint_label', key: 'imprint_label'},
    {header: 'artist_name', key: 'artist_name'},
    {header: 'product_name', key: 'product_name'},
    {header: 'track_name', key: 'track_name'},
    {header: 'track_artist', key: 'track_artist'},
    {header: 'isrc', key: 'isrc'},
    {header: 'volume', key: 'volume'},
    {header: 'track_integer', key: 'track_integer'},
    {header: 'trans_type', key: 'trans_type'},
    {header: 'trans_type_description', key: 'trans_type_description'},
    {header: 'unit_price', key: 'unit_price'},
    {header: 'discount', key: 'discount'},
    {header: 'actual_price', key: 'actual_price'},
    {header: 'quantity', key: 'quantity'},
    {header: 'total', key: 'total'},
    {header: 'adjusted_total', key: 'adjusted_total'},
    {header: 'split_rate', key: 'split_rate'},
    {header: 'label_share_net_receipts', key: 'label_share_net_receipts'},
    {header: 'ringtone_publishing', key: 'ringtone_publishing'},
    {header: 'cloud_publishing', key: 'cloud_publishing'},
    {header: 'publishing', key: 'publishing'},
    {header: 'mech_admin_fee', key: 'mech_admin_fee'},
    {header: 'preferred_currency', key: 'preferred_currency'},
    {header: 'updated_at', key: 'updated_at'},
    {header: 'created_at', key: 'created_at'}
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
    column.width = column.header.length < 12 ? 12 : column.header.length
  })

  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(1).font = {bold: true}

  //****************04**************************************
  pool.query("SELECT * from main where artist_name = 'Adam Hood' and period = '2021M4'", (err, res) => {
  console.log(res,err)
  
  
  var worksheet = workbook.addWorksheet('0421 SH');

  worksheet.columns = [
    {header: 'id', key: 'id'},
    {header: 'period', key: 'period'},
    {header: 'activity_period', key: 'activity_period'},
    {header: 'retailer', key: 'retailer'},
    {header: 'territory', key: 'territory'},
    {header: 'orchard_upc', key: 'orchard_upc'},
    {header: 'manufacture_upc', key: 'manufacture_upc'},
    {header: 'project_code', key: 'project_code'},
    {header: 'product_code', key: 'product_code'},
    {header: 'sub_account', key: 'sub_account'},
    {header: 'imprint_label', key: 'imprint_label'},
    {header: 'artist_name', key: 'artist_name'},
    {header: 'product_name', key: 'product_name'},
    {header: 'track_name', key: 'track_name'},
    {header: 'track_artist', key: 'track_artist'},
    {header: 'isrc', key: 'isrc'},
    {header: 'volume', key: 'volume'},
    {header: 'track_integer', key: 'track_integer'},
    {header: 'trans_type', key: 'trans_type'},
    {header: 'trans_type_description', key: 'trans_type_description'},
    {header: 'unit_price', key: 'unit_price'},
    {header: 'discount', key: 'discount'},
    {header: 'actual_price', key: 'actual_price'},
    {header: 'quantity', key: 'quantity'},
    {header: 'total', key: 'total'},
    {header: 'adjusted_total', key: 'adjusted_total'},
    {header: 'split_rate', key: 'split_rate'},
    {header: 'label_share_net_receipts', key: 'label_share_net_receipts'},
    {header: 'ringtone_publishing', key: 'ringtone_publishing'},
    {header: 'cloud_publishing', key: 'cloud_publishing'},
    {header: 'publishing', key: 'publishing'},
    {header: 'mech_admin_fee', key: 'mech_admin_fee'},
    {header: 'preferred_currency', key: 'preferred_currency'},
    {header: 'updated_at', key: 'updated_at'},
    {header: 'created_at', key: 'created_at'}
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
    column.width = column.header.length < 12 ? 12 : column.header.length
  })

  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(1).font = {bold: true}







  workbook.xlsx.writeFile('Adam Hood.xlsx')
})  
})  



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})