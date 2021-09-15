const express = require('express')
const Excel = require('exceljs')
const app = express()
const port = 3000

const { ChannelReportQuery, SourceReportQuery, TrackReportQuery, DataDumpQuery } = require('./queries')
const { worksheetValues, worksheetColumns  } = require('./constants')

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

async function wrap(artist) {
  let workbook = new Excel.Workbook()
  let worksheet = workbook.addWorksheet('0321 SH')

  //********* Channel Report ****************************
  try {
    let res = await ChannelReportQuery(pool, artist)
    let resp = res.rows
  
    // HEADERS
    worksheet.getCell('A1').value = 'CHANNEL REPORT'
    worksheet.getCell('A2').value = 'TRANSACTION TYPE'
    worksheet.getCell('B2').value = 'QUANTITY'
    worksheet.getCell('C2').value = 'REVENUE'
    for (i = 0; i < resp.length; i++) {
      //arr.push(resp[i].retailer)
      worksheet.getCell('A' + (i +3)).value = resp[i].trans_type_description
      worksheet.getCell('B' + (i +3)).value = resp[i].quantity
      worksheet.getCell('C' + (i +3)).value = '$' + resp[i].revenue.toFixed(2)
    }  
  } catch (error) {
    console.log(error)
  }
  //********************************** END Channel Report *********************************************
  
  //********* Begin Source Report ************************
  let sourceSpace
  try {
    let res = await SourceReportQuery(pool, artist)
    let resp = res.rows
    sourceSpace = resp.length
  
    // HEADERS
    worksheet.getCell('E1').value = 'Source Report'
    worksheet.getCell('E2').value = 'SOURCE'
    worksheet.getCell('F2').value = 'REVENUE'
    for(i = 0; i < resp.length; i++){
      worksheet.getCell('E' + (i +3)).value = resp[i].retailer
      worksheet.getCell('F' + (i +3)).value = '$' + resp[i].revenue
    }
  
  } catch (error) {
    console.log(error)
  }
  //********* End Source Report ************************
  //********* Start Track Report ************************
  //let sourceSpace
  try {
    let res = await TrackReportQuery(pool, artist)
    let resp = res.rows
    //sourceSpace = resp.length
  
    // HEADERS
    worksheet.getCell('H1').value = 'Track Report'
    worksheet.getCell('H2').value = 'TRACK'
    worksheet.getCell('I2').value = 'VERSION'
    worksheet.getCell('J2').value = 'ARTIST'
    worksheet.getCell('K2').value = 'PRODUCT'
    worksheet.getCell('L2').value = 'REVENUE'
    for(i = 0; i < resp.length; i++){
      worksheet.getCell('H' + (i +3)).value = resp[i].row.split(',')[0]
      worksheet.getCell('J' + (i +3)).value = artist
      worksheet.getCell('L' + (i +3)).value = resp[i].revenue
    }
  
  } catch (error) {
    console.log(error)
  }






   //********* End Track Report ************************

  //********* Start data dump *********************************
  try {
    let res = await DataDumpQuery(pool, artist)
    worksheet.getRow(sourceSpace + 9).values = worksheetValues
    worksheet.columns = worksheetColumns
    let data = res.rows

    // Dump all the data into Excel
    data.forEach((e) => {
      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can add formulas pretty easily by providing the formula property.
      worksheet.addRow({ ...e })
    })


    // force the columns to be at least as long as their header row.
    // Have to take this approach because ExcelJS doesn't have an autofit property.
    worksheet.columns.forEach(column => {
      column.width = worksheet.getRow(sourceSpace + 9).values.length
    })

    // Make the header bold.
    // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
    worksheet.getRow(sourceSpace + 9).font = {bold: true}
  } catch (error) {
    console.log(error)
  }
  //************** END data dump *********************************

  workbook.xlsx.writeFile(artist + '.xlsx')
}

async function run(){
  // let artistsArr = ['Josh Rennie-Hynes','Leftover Salmon','Phil Madeira','Mitchell Tenpenny']
  let artistsArr = ['Dave Hause']
  artistsArr.forEach(async (artist) => {
    await wrap(artist)
  })
}
run();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})