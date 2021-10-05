const Excel = require("exceljs");
const {wrap} = require('./wrap')

const {
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
    await wrap(artist_name, period, workbook, pool)
    console.log('Creating: ' + artist_name + ' ' + period + ' sheets.')
  }
}

async function payout(artist_name, periods, workbook){
  let worksheet_payout = workbook.addWorksheet('PAYOUT');
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

}

async function makeBook({artist_name, periods}){
  if(!artist_name || !periods) return
  const workbook = new Excel.Workbook();
  await run(artist_name, periods, workbook);
  payout(artist_name, periods, workbook);
  console.log('Completed: ' + artist_name + ' file.')
  workbook.xlsx.writeFile(artist_name + ".xlsx");
}

async function writeAll(){
  const artistArr = await getArtisAndPeriods()
  for (let item of artistArr) {
    await makeBook(item)
  }
}

writeAll()

