const Excel = require("exceljs");
const {wrap} = require('./wrap');
const { createSheetName } = require("./functions");

const {
  ChannelReportQuery,
  ChannelReportPhysicalReturnsQuery,
  ChannelReportTotalQuery,
  SourceReportQuery,
  SourceReportTotalQuery,
  TrackReportQuery,
  TrackReportTotalQuery,
  ProductReportQuery,
  ProductReportTotalQuery,
  DataDumpQuery,
  DigitalTotalQuery,
  PhysicalTotalQuery,
  ChargeBackDataQuery,
  ChargeBackTotalQuery,
  LogTotalQuery,
  GetArtistAndPeriodQuery
} = require("./queries");
//***************db Connect*************************************************

const { Pool } = require("pg");
const pool = new Pool({
  user: "royschuyler",
  host: "localhost",
  database: "main",
  password: "Hollie12",
  port: 5432
});

//************************************************************************
//********************************** GET ARTISTS AND PERIOD START ********
//************************************************************************
async function getArtisAndPeriods(){
  try {
    let res = await GetArtistAndPeriodQuery(pool);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function run(artist_name, periods, workbook) {
  console.log('Begining: ' + artist_name + ' file.')
  for (let period of periods) {
    await wrap(artist_name, period, workbook, pool, periods)
    console.log('Creating: ' + artist_name + ' ' + period + ' sheets.')
  }
}

//******************* BEGIN PAYOUT *************************************
async function payout(artist_name, periods, workbook){
  let worksheet_payout = workbook.addWorksheet('PAYOUT');
  //HEADERS
  worksheet_payout.getCell("A1").value = "BILLINGS";
  worksheet_payout.getCell("A1").font = { bold: true };
  worksheet_payout.getCell("A2").value = "Gross Physical Billings";
  worksheet_payout.getCell("A3").value = "Physical Product Returns";
  worksheet_payout.getCell("A4").value = "Net Physical Billings";

  worksheet_payout.getCell("A6").value = "DIGITAL SALES";
  worksheet_payout.getCell("A6").font = { bold: true };
  worksheet_payout.getCell("A7").value = "Non-interactive";
  worksheet_payout.getCell("A8").value = "Total Digital Revenue";
  worksheet_payout.getCell("A8").font = { bold: true };

  worksheet_payout.getCell("A10").value = "DEDUCTIONS AND FEES";
  worksheet_payout.getCell("A11").value = "Distribution Fee";
  worksheet_payout.getCell("A12").value = "Reserve For Future Returns";
  worksheet_payout.getCell("A13").value = "Returns Handling";
  worksheet_payout.getCell("A14").value = "Digital Sales Dist. Fee";
  worksheet_payout.getCell("A15").value = "Marketing Fees";
  worksheet_payout.getCell("A16").value = "Chargebacks";
  worksheet_payout.getCell("A17").value = "Open Accruals";

  worksheet_payout.getCell("A19").value = "Total Deductions And Fees";
  worksheet_payout.getCell("A19").font = { bold: true };

  worksheet_payout.getCell("A21").value = "Performance Rights";
  worksheet_payout.getCell("A22").value = "Net Receipts";
  worksheet_payout.getCell("A22").font = { bold: true };

  worksheet_payout.getCell("A25").value = "Month";
  worksheet_payout.getCell("A25").font = { bold: true };

  worksheet_payout.views = [
    {state: 'frozen', xSplit: 1, ySplit: 0}
  ];

  worksheet_payout.columns = [
    { header: 'BILLINGS', key: 'BILLINGS', width: 32 },
  ];

  worksheet_payout.getCell("B25").value = "Net receipts for month";
  worksheet_payout.getCell("B25").font = { bold: true };

  worksheet_payout.getCell("C25").value = "Reserves held for month";
  worksheet_payout.getCell("C25").font = { bold: true };

  worksheet_payout.getCell("D25").value = "Reserves Released (-360 days)";
  worksheet_payout.getCell("D25").font = { bold: true };

  worksheet_payout.getCell("E25").value = "Current Balance";
  worksheet_payout.getCell("E25").font = { bold: true };

  for(i=0;i<periods.length;i++){
    var columnLetter = ((i+2) + 9).toString(36).toUpperCase();

    worksheet_payout.getCell(columnLetter + "1").value = createSheetName(periods[i]).date;
    worksheet_payout.getCell(columnLetter + "1").font = { bold: true }; 

    worksheet_payout.getCell(columnLetter + "2").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C3", result : undefined}
    worksheet_payout.getCell(columnLetter + "3").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C6", result : undefined}
    worksheet_payout.getCell(columnLetter + "4").value = { formula : "=" + columnLetter +"2-" + columnLetter + "3", result : undefined}

    worksheet_payout.getCell(columnLetter + "6").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C2", result : undefined}
    worksheet_payout.getCell(columnLetter + "7").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C5", result : undefined}
    worksheet_payout.getCell(columnLetter + "8").value = { formula : "=SUM(R6:R7)", result : undefined}

    worksheet_payout.getCell(columnLetter + "11").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C11", result : undefined}
    worksheet_payout.getCell(columnLetter + "12").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C12", result : undefined}
    worksheet_payout.getCell(columnLetter + "13").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C13", result : undefined}
    worksheet_payout.getCell(columnLetter + "14").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C14", result : undefined}
    worksheet_payout.getCell(columnLetter + "15").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C15", result : undefined}
    worksheet_payout.getCell(columnLetter + "16").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C16", result : undefined}
    worksheet_payout.getCell(columnLetter + "17").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C17", result : undefined}

    worksheet_payout.getCell(columnLetter + "19").value = { formula : "=SUM(" + columnLetter + "11:" + columnLetter + "18)", result : undefined}
    worksheet_payout.getCell(columnLetter + "22").value = { formula : "=(" + columnLetter + "4+" + columnLetter + "8+" + columnLetter + "21)-" + columnLetter + "19", result : undefined}

    worksheet_payout.getRow("25").height = 75;

    worksheet_payout.columns = [  
      { width: 25 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }
    ]; 

    worksheet_payout.getCell('B25').alignment = { wrapText: true };
    worksheet_payout.getCell('C25').alignment = { wrapText: true };
    worksheet_payout.getCell('D25').alignment = { wrapText: true };
    worksheet_payout.getCell('E25').alignment = { wrapText: true };
    worksheet_payout.getCell('F25').alignment = { wrapText: true };

    var startingColumn = 27;
    var reserveColumn = startingColumn + 12;
    worksheet_payout.getCell("A" + (startingColumn + i)).value = createSheetName(periods[i]).date;
    worksheet_payout.getCell("B" + (startingColumn + i)).value =  { formula : "=" + columnLetter + "22", result : undefined}
    worksheet_payout.getCell("C" + (startingColumn + i)).value =  { formula : "=" + columnLetter + "12", result : undefined}
    worksheet_payout.getCell("D" + (reserveColumn + i)).value =  { formula : "=C" + (startingColumn + i), result : undefined}
    //worksheet_payout.getCell("E" + (startingColumn + i)).value =  { formula : "=" + columnLetter + "22", result : undefined}
    //worksheet_payout.getCell("E" + (startingColumn + i)).value =  { formula : "=B" + (startingColumn + i) + "+" + "C" + (startingColumn + i), result : undefined}
    worksheet_payout.getCell("E" + (startingColumn + i)).value =  { formula : "=B" + (startingColumn + i) + "+" + "C" + (startingColumn + i) + "+" + "E" + (startingColumn + (i - 1)), result : undefined}

  } //end loop
} //end payout function


//******************* END PAYOUT *************************************


async function makeBook({artist_name, periods}){
  if(!artist_name || !periods) return
  const workbook = new Excel.Workbook();
  await run(artist_name, periods, workbook);
  payout(artist_name, periods, workbook);
  workbook.xlsx.writeFile(artist_name + ".xlsx");
  console.log('Completed: ' + artist_name + ' file.')
}

async function writeAll(){
  const artistArr = await getArtisAndPeriods()
  for (let item of artistArr) {
    await makeBook(item)
  }
}

writeAll()

