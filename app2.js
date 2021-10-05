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
  workbook.addWorksheet('PAYOUT')
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

