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
    console.log(columnLetter)
    console.log(periods[i])
    console.log(createSheetName(periods[i]).date)
    worksheet_payout.getCell(columnLetter + "1").value = createSheetName(periods[i]).date;
    worksheet_payout.getCell(columnLetter + "1").font = { bold: true }; 

    worksheet_payout.getCell(columnLetter + "2").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C3", result : undefined}
    worksheet_payout.getCell(columnLetter + "3").value = { formula : "='" + createSheetName(periods[i]).sheetName + " ST'!C6", result : undefined}
    worksheet_payout.getCell(columnLetter + "4").value = { formula : "=R2-R3", result : undefined}

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

  //   //cb begin
  //   let cb_length
  //   try {
  //     let res = await ChargeBackDataQuery(pool, artist_name, periods[i]);
  //     let data = res.rows;
  //     cb_length = data.length;
  //     //console.log(data)
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   //******************************* CB TOTAL ***************************************************
  //   let cbTotal
  //   try {
  //     let res = await ChargeBackTotalQuery(pool, artist_name, periods[i]);
  //     let resp = res.rows;
  //     //console.log(resp)
  //     if(resp[0].sum){
  //           //worksheet_cb.getCell("B" + (cb_length + 3)).value = Number(resp[0].sum.toFixed(2));
  //           cbTotal = Number(resp[0].sum.toFixed(2))
  //         } else {
  //           //worksheet_cb.getCell("B" + (cb_length + 3)).value = 0.00;
  //           cbTotal = 0.00
  //         }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //cb end

  //   //st begin
  //   // Digital Total
  //   let digitalTotal
  //   try {
  //     let res = await DigitalTotalQuery(pool, artist_name, periods[i]);
  //     let resp = res.rows;
  //     digitalTotal = Number(resp[0].digital.toFixed(2))
  //     //worksheet_st.getCell("C2").value = digitalTotal;
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // log Total
  //   let physicalTotal
  //   let nonInteractiveRadio
  //   let physicalReturns

  //   try {
  //     let res = await LogTotalQuery(pool, artist_name, periods[i]);
  //     let resp = res.rows;

  //     if(resp[2]){
  //       physicalTotal = Number(resp[2].total.toFixed(2))
  //     } else {
  //       physicalTotal = 0.00;
  //     }
  //     if(resp[0]){
  //       nonInteractiveRadio = Number(resp[0].total.toFixed(2))
  //     } else {
  //       nonInteractiveRadio = 0.00
  //     }
  //     if(resp[1]){
  //       physicalReturns = Number(resp[1].total.toFixed(2))
  //     } else {
  //       physicalReturns = 0.00
  //     }
      

  //     // worksheet_st.getCell("C5").value = nonInteractiveRadio; // Non-interactive Radio
  //     // worksheet_st.getCell("C6").value = physicalReturns; // physical returns
  //     // worksheet_st.getCell("C3").value = physicalTotal; // physical total
  //   } catch (error) {
  //     console.log(error);
  //   }

  // //****************** st report non-query tabulations *****************************
  //   const distributionFee = .28;
  //   const reserveForFutureReturns = .25;
  //   const returnsHandling = .02;
  //   const digitalSalesFee = .26;

  //   // worksheet_st.getCell("B11").value = distributionFee;
  //   // worksheet_st.getCell("B12").value = reserveForFutureReturns;
  //   // worksheet_st.getCell("B13").value = returnsHandling;
  //   // worksheet_st.getCell("B14").value = digitalSalesFee;

  //   var netBillings = parseFloat(digitalTotal + nonInteractiveRadio + physicalTotal + physicalReturns).toFixed(2)
  //   var distributionFeeTotal = parseFloat((physicalTotal + physicalReturns) * distributionFee).toFixed(2)
  //   var reserveForFutureReturnsTotal = parseFloat(physicalTotal * reserveForFutureReturns).toFixed(2)
  //   var returnsHandlingTotal = parseFloat(physicalTotal * returnsHandling).toFixed(2)
  //   var digitalSalesFeeTotal = parseFloat((digitalTotal + nonInteractiveRadio) * digitalSalesFee).toFixed(2)

  //   //make excel do the formulas
  //   // worksheet_st.getCell("C8").value =  { formula : "(C2+C5)+(C3+C6)", result : distributionFeeTotal}
  //   // worksheet_st.getCell("C11").value = { formula : "(C3-C6)*B11", result : netBillings}
  //   // worksheet_st.getCell("C12").value = { formula : "C3*B12", result : reserveForFutureReturnsTotal}
  //   // worksheet_st.getCell("C13").value = { formula : "=C6*B13", result : returnsHandlingTotal}
  //   // worksheet_st.getCell("C14").value = { formula : "=(C2+C5)*B14", result : digitalSalesFeeTotal}
  //   // worksheet_st.getCell("C15").value = 0.00;
  //   // worksheet_st.getCell("C16").value = cbTotal * -1;
  //   // worksheet_st.getCell("C17").value = 0.00;
  //   var stTotal = Number(distributionFeeTotal)+Number(reserveForFutureReturnsTotal)+Number(returnsHandlingTotal)+
  //   Number(digitalSalesFeeTotal)+Number((cbTotal * -1));
  //   //worksheet_st.getCell("C18").value = { formula : "=SUM(C11:C17)", result : stTotal}
  //   var perfRights = 0.00;
  //   //worksheet_st.getCell("C19").value = perfRights;
  //   var netProceeds = Number(Number(netBillings)-Number(stTotal)+Number(perfRights));
    //worksheet_st.getCell("C21").value = { formula : "=C8-C18+C19", result : netProceeds}
    //stend

    //BEGIN PAYOUT FROM QUERIES AND LOOP
    //dynamic headers
    // var columnLetter = ((i+1) + 9).toString(36).toUpperCase();
    // console.log(columnLetter)
    // console.log(periods[i])
    // console.log(createSheetName(periods[i]).date)
    // worksheet_payout.getCell(columnLetter + "1").value = createSheetName(periods[i]).date;
    // worksheet_payout.getCell(columnLetter + "1").font = { bold: true }; 

    //worksheet_payout.getCell(columnLetter + i + 2).value = physicalTotal;







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

