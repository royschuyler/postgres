const express = require('express')
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
let workbook = new Excel.Workbook();

let worksheet = workbook.addWorksheet('0321 SH');

  //********* Channel Report ****************************
//HEADERS
worksheet.getCell('A1').value = 'CHANNEL REPORT';
worksheet.getCell('A2').value = 'TRANSACTION TYPE';
worksheet.getCell('A3').value = 'Subscription Audio Streams';
worksheet.getCell('A4').value = 'Download Tracks';
worksheet.getCell('A5').value = 'Ad-Supported Audio Streams';
worksheet.getCell('A6').value = 'Non-interactive Radio';
worksheet.getCell('A7').value = 'Cloud Match Units';
worksheet.getCell('A8').value = 'Total';
worksheet.getCell('B2').value = 'QUANTITY';
worksheet.getCell('C2').value = 'REVENUE';

//Quantities ************************
  pool.query("SELECT SUM(quantity) from main where period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  //console.log(res,err)
  //console.log(res.rows[0].sum)
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('B8').value = sum;

  pool.query("SELECT SUM(quantity) from main where trans_type_description = 'Subscription Audio Streams' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('B3').value = sum;

  pool.query("SELECT SUM(quantity) from main where trans_type_description = 'Download Tracks' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('B4').value = sum;

  pool.query("SELECT SUM(quantity) from main where trans_type_description = 'Ad-Supported Audio Streams' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }  worksheet.getCell('B5').value = sum;

  pool.query("SELECT SUM(quantity) from main where trans_type_description = 'Non-interactive Radio' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('B6').value = sum;

  pool.query("SELECT SUM(quantity) from main where trans_type_description = 'Cloud Match Units' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('B7').value = sum;

// Revenue ************************************
  pool.query("SELECT SUM(label_share_net_receipts) from main where period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('C8').value = '$' + sum.toFixed(2);
  worksheet.getCell('C8').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where trans_type_description = 'Subscription Audio Streams' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('C3').value = '$' + sum.toFixed(2);
  worksheet.getCell('C3').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where trans_type_description = 'Download Tracks' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('C4').value = '$' + sum.toFixed(2);
  worksheet.getCell('C4').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where trans_type_description = 'Ad-Supported Audio Streams' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }  worksheet.getCell('C5').value = '$' + sum.toFixed(2);
  worksheet.getCell('C5').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where trans_type_description = 'Non-interactive Radio' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('C6').value = '$' + sum.toFixed(2);
  worksheet.getCell('C6').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where trans_type_description = 'Cloud Match Units' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('C7').value = '$' + sum.toFixed(2);
  worksheet.getCell('C7').alignment = { vertical: 'middle', horizontal: 'right' };

//********* End Channel Report *************************
//********* Begin Source Report ************************
//   pool.query("SELECT distinct(retailer) from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' and label_share_net_receipts > .000000001", (err, res) => {
//   //console.log(res,err)
//   let resp = res.rows;
//   console.log(resp[0].retailer)
// for(i=0;i<resp.length;i++){
//   let test
// }

//Source Report HEADERS
worksheet.getCell('E1').value = 'SOURCE REPORT';
worksheet.getCell('E2').value = 'SOURCE';
worksheet.getCell('E3').value = 'Spotify';
worksheet.getCell('E4').value = 'iTunes/Apple';
worksheet.getCell('E5').value = 'Amazon Unlimited';
worksheet.getCell('E6').value = 'YouTube Subscription';
worksheet.getCell('E7').value = 'Amazon Music';
worksheet.getCell('E8').value = 'Deezer';
worksheet.getCell('E9').value = 'YouTube';
worksheet.getCell('E10').value = 'Pandora';
worksheet.getCell('E11').value = 'Line';
worksheet.getCell('E12').value = 'Napster';
worksheet.getCell('E13').value = 'Boomplay';
worksheet.getCell('E14').value = 'NetEase';
worksheet.getCell('E15').value = 'Total';
worksheet.getCell('F2').value = 'REVENUE';


  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Spotify' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F3').value = '$' + sum.toFixed(2);
  worksheet.getCell('F3').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'iTunes/Apple' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F4').value = '$' + sum.toFixed(2);
  worksheet.getCell('F4').alignment = { vertical: 'middle', horizontal: 'right' };


  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Amazon Unlimited' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F5').value = '$' + sum.toFixed(2);
  worksheet.getCell('F5').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'YouTube Subscription' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F6').value = '$' + sum.toFixed(2);
  worksheet.getCell('F6').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Amazon Music' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F7').value = '$' + sum.toFixed(2);
  worksheet.getCell('F7').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Deezer' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F8').value = '$' + sum.toFixed(2);
  worksheet.getCell('F8').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'YouTube' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F9').value = '$' + sum.toFixed(2);
  worksheet.getCell('F9').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Pandora' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F10').value = '$' + sum.toFixed(2);
  worksheet.getCell('F10').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Line' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F11').value = '$' + sum.toFixed(2);
  worksheet.getCell('F11').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Napster' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F12').value = '$' + sum.toFixed(2);
  worksheet.getCell('F12').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'Boomplay' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F13').value = '$' + sum.toFixed(2);
  worksheet.getCell('F13').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where retailer = 'NetEase' and period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F14').value = '$' + sum.toFixed(2);
  worksheet.getCell('F14').alignment = { vertical: 'middle', horizontal: 'right' };

  pool.query("SELECT SUM(label_share_net_receipts) from main where period = '2021M3' and artist_name =" + "'" + artist + "'", (err, res) => {
  let sum = res.rows[0].sum;
  if(!sum){
    sum = 0
  }
  worksheet.getCell('F15').value = '$' + sum.toFixed(2);
  worksheet.getCell('F15').alignment = { vertical: 'middle', horizontal: 'right' };











//********* End Source Report ************************

//********* Start data dump *********************************

  pool.query("SELECT * from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' order by retailer, orchard_upc, product_name,track_name limit 10", (err, res) => {
  
  worksheet.getRow(18).values = [
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
  let data = res.rows;

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
    column.width = worksheet.getRow(18).values.length
  })

  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(18).font = {bold: true}
  //************** END data dump *********************************


/*
  //****************04**************************************
  pool.query("SELECT * from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M4' order by retailer, orchard_upc, product_name,track_name limit 10", (err, res) => {
  //console.log(res,err)
  
  
  let worksheet = workbook.addWorksheet('0421 SH');
//********* Channel Report ****************************

worksheet.getCell('A1').value = 'CHANNEL REPORT'




//*********End Channel Report *************************
  worksheet.getRow(18).values = [
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
  let data = res.rows;

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
    column.width = worksheet.getRow(18).values.length
  })

  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(18).font = {bold: true}



*/



  workbook.xlsx.writeFile(artist + '.xlsx')
})  
})  
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
}

//let artistsArr = ['Josh Rennie-Hynes','Leftover Salmon','Phil Madeira','Mitchell Tenpenny']
let artistsArr = ['Josh Rennie-Hynes']

for(i=0;i<artistsArr.length;i++){
  wrap(artistsArr[i])
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})