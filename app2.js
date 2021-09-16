const express = require('express')
const Excel = require('exceljs')
const app = express()
const port = 3000

const { ChannelReportQuery, ChannelReportPhysicalReturnsQuery, SourceReportQuery, SourceReportTotalQuery, TrackReportQuery, TrackReportTotalQuery, DataDumpQuery, ProductReportQuery } = require('./queries')
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
  let channelSpace
  try {
    let res = await ChannelReportQuery(pool, artist)
    let resp = res.rows
    channelSpace = resp.length
    // HEADERS
    worksheet.getCell('A1').value = 'CHANNEL REPORT'
    worksheet.getCell('A2').value = 'TRANSACTION TYPE'
    worksheet.getCell('B2').value = 'QUANTITY'
    worksheet.getCell('C2').value = 'REVENUE'
    for (i = 0; i < resp.length; i++) {
      worksheet.getCell('A' + (i +3)).value = resp[i].trans_type_description
      worksheet.getCell('B' + (i +3)).value = resp[i].quantity
      worksheet.getCell('C' + (i +3)).value = '$' + resp[i].revenue.toFixed(2)
    }  
  } catch (error) {
    console.log(error)
  }

  //********** Physical Returns ****************************
    try {
    let res = await ChannelReportPhysicalReturnsQuery(pool, artist)
    let resp = res.rows
    console.log(resp)
    console.log(channelSpace)
    // HEADERS
    worksheet.getCell('A' + (parseInt(channelSpace) + 3)).value = 'Physical Returns'
    worksheet.getCell('B' + (parseInt(channelSpace) + 3)).value = resp[0].quantity
    worksheet.getCell('C' + (parseInt(channelSpace) + 3)).value = '($' + resp[0].physical_returns.toFixed(2) + ')'
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
      worksheet.getCell('F' + (i +3)).value = '$' + resp[i].revenue.toFixed(2)
    }
  
  } catch (error) {
    console.log(error)
  }
  //************ Source Total ****************
  try {
    let res = await SourceReportTotalQuery(pool, artist)
    let resp = res.rows
    console.log(resp)
    console.log(sourceSpace)
    // HEADERS
    worksheet.getCell('E' + (parseInt(sourceSpace) + 3)).value = 'Total'
    worksheet.getCell('F' + (parseInt(sourceSpace) + 3)).value = '$' + resp[0].total.toFixed(2)
  console.log(resp[0].total.toFixed(2))
  } catch (error) {
    console.log(error)
  }

  //********* End Source Report ************************
  //********* Start Track Report ************************
  let trackSpace
  try {
    let res = await TrackReportQuery(pool, artist)
    let resp = res.rows
    trackSpace = res.rowCount * 2
  
    // HEADERS
    worksheet.getCell('H1').value = 'Track Report'
    worksheet.getCell('H2').value = 'TRACK'
    worksheet.getCell('I2').value = 'VERSION'
    worksheet.getCell('J2').value = 'ARTIST'
    worksheet.getCell('K2').value = 'PRODUCT'
    worksheet.getCell('L2').value = 'REVENUE'
    for(i = 0; i < resp.length; i++){

      worksheet.mergeCells('H' + (i + 3 + i) + ':' + 'H' + (i + 4 + i))
      worksheet.mergeCells('J' + (i + 3 + i) + ':' + 'J' + (i + 4 + i))
      worksheet.mergeCells('L' + (i + 3 + i) + ':' + 'L' + (i + 4 + i))

      worksheet.getCell('H' + (i + 3 + i)).value = resp[i].track_name
      worksheet.getCell('J' + (i + 3 + i)).value = artist
      worksheet.getCell('L' + (i + 3 + i)).value = '$' + resp[i].revenue.toFixed(2)

      worksheet.getCell('K' + (i + 3 + i)).value = resp[i].product_name
      worksheet.getCell('K' + (i + 4 + i)).value = 'UPC: ' + resp[i].orchard_upc

    }
  
  } catch (error) {
    console.log(error)
  }

   //****************** Track Total ******************************
  try {
    let res = await TrackReportTotalQuery(pool, artist)
    let resp = res.rows
    console.log(resp)
    console.log(trackSpace)
    // HEADERS
    worksheet.getCell('H' + (parseInt(trackSpace) + 3)).value = 'Total'
    worksheet.getCell('L' + (parseInt(trackSpace) + 3)).value = '$' + resp[0].total.toFixed(2)
  console.log(resp[0].total.toFixed(2))
  } catch (error) {
    console.log(error)
  }







   //********* End Track Report ************************
   //********* Start Product Report ************************
  try {
    let res = await ProductReportQuery(pool, artist)
    let resp = res.rows
    //console.log(res)
    // HEADERS
    worksheet.getCell('N1').value = 'Product Report'
    worksheet.getCell('N2').value = 'PRODUCT'
    worksheet.getCell('O2').value = 'ARTIST'
    worksheet.getCell('P2').value = 'PROJECT CODE'
    worksheet.getCell('Q2').value = 'PRODUCT CODE'
    worksheet.getCell('R2').value = 'REVENUE'
    for(i = 0; i < resp.length; i++){
      worksheet.mergeCells('O' + (i + 3 + i) + ':' + 'O' + (i + 4 + i))
      worksheet.mergeCells('P' + (i + 3 + i) + ':' + 'P' + (i + 4 + i))
      worksheet.mergeCells('Q' + (i + 3 + i) + ':' + 'Q' + (i + 4 + i))
      worksheet.mergeCells('R' + (i + 3 + i) + ':' + 'R' + (i + 4 + i))

      worksheet.getCell('N' + (i + 3 + i)).value = resp[i].product_name
      worksheet.getCell('N' + (i + 4 + i)).value = 'UPC: ' + resp[i].orchard_upc

      worksheet.getCell('O' + (i + 3 + i)).value = artist
      worksheet.getCell('P' + (i + 3 + i)).value = resp[i].project_code
      worksheet.getCell('Q' + (i + 3 + i)).value = resp[i].product_code
      worksheet.getCell('R' + (i + 3 + i)).value = '$' + resp[i].revenue.toFixed(2)

    }
  
  } catch (error) {
    console.log(error)
  }











   //********* End Product Report ************************


  //********* Start data dump *********************************
  try {
    let res = await DataDumpQuery(pool, artist)
    worksheet.getRow(trackSpace + 9).values = worksheetValues
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
    // worksheet.columns.forEach(column => {
    //   column.width = worksheet.getRow(trackSpace + 9).values.length
    // })

    // Make the header bold.
    // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
    worksheet.getRow(trackSpace + 9).font = {bold: true}
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