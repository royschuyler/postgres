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
const { worksheetValues, worksheetColumns } = require("./constants");
const { createSheetName } = require("./functions");

async function wrap(artist, period, workbook, pool) {

  //************************************************************************
  //********************************** SH **********************************
  //************************************************************************
  let mainSpace
  let worksheet = workbook.addWorksheet(createSheetName(period).sheetName + 'SH');

  //************************************************************************
  //*****************************Channel Report ****************************
  //************************************************************************
  let channelSpace;
  try {
    let res = await ChannelReportQuery(pool, artist, period);
    let resp = res.rows;
    channelSpace = resp.length;
    // HEADERS
    worksheet.getCell("A1").value = "CHANNEL REPORT";
    worksheet.getCell("A2").value = "TRANSACTION TYPE";
    worksheet.getCell("B2").value = "QUANTITY";
    worksheet.getCell("C2").value = "REVENUE";
    for (i = 0; i < resp.length; i++) {
      worksheet.getCell("A" + (i + 3)).value = resp[i].trans_type_description;
      worksheet.getCell("B" + (i + 3)).value = resp[i].quantity;
      worksheet.getCell("C" + (i + 3)).value = "$" + resp[i].revenue.toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }

  //********** Physical Returns ****************************
  try {
    let res = await ChannelReportPhysicalReturnsQuery(pool, artist, period);
    let resp = res.rows;
    // HEADERS
    worksheet.getCell("A" + (parseInt(channelSpace) + 3)).value =
      "Physical Returns";
    if(resp[0]){
      worksheet.getCell("B" + (parseInt(channelSpace) + 3)).value =
      resp[0].quantity;
    } else {
      worksheet.getCell("B" + (parseInt(channelSpace) + 3)).value =
      0;
    }
    if(resp[0]){
      worksheet.getCell("C" + (parseInt(channelSpace) + 3)).value =
      "($" + resp[0].physical_returns.toFixed(2) + ")";
    } else {
      worksheet.getCell("C" + (parseInt(channelSpace) + 3)).value =
      0.00
    }

  } catch (error) {
    console.log(error);
  }
  //************* Channel Report Total **************************
  try {
    let res = await ChannelReportTotalQuery(pool, artist, period);
    let resp = res.rows;
    // HEADERS
    worksheet.getCell("A" + (parseInt(channelSpace) + 4)).value = "Total";
    worksheet.getCell("C" + (parseInt(channelSpace) + 4)).value =
      "$" + resp[0].total.toFixed(2);
  } catch (error) {
    console.log(error);
  }
  //***************************************************************************************************
  //********************************** END Channel Report *********************************************
  //***************************************************************************************************

  //***************************************************************************************************
  //********************************** Begin Source Report ********************************************
  //***************************************************************************************************
  let sourceSpace;
  try {
    let res = await SourceReportQuery(pool, artist, period);
    let resp = res.rows;
    sourceSpace = resp.length;

    // HEADERS
    worksheet.getCell("E1").value = "Source Report";
    worksheet.getCell("E2").value = "SOURCE";
    worksheet.getCell("F2").value = "REVENUE";
    for (i = 0; i < resp.length; i++) {
      worksheet.getCell("E" + (i + 3)).value = resp[i].retailer;
      worksheet.getCell("F" + (i + 3)).value = "$" + resp[i].revenue.toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }
  //************ Source Total **************************
  try {
    let res = await SourceReportTotalQuery(pool, artist, period);
    let resp = res.rows;
    // HEADERS
    worksheet.getCell("E" + (parseInt(sourceSpace) + 3)).value = "Total";
    worksheet.getCell("F" + (parseInt(sourceSpace) + 3)).value =
      "$" + resp[0].total.toFixed(2);
  } catch (error) {
    console.log(error);
  }
  //***************************************************************************************************
  //******************************** End Source Report ************************************************
  //***************************************************************************************************
  
  //***************************************************************************************************
  //******************************** Start Track Report ***********************************************
  //***************************************************************************************************
  let trackSpace;
  try {
    let res = await TrackReportQuery(pool, artist, period);
    let resp = res.rows;
    trackSpace = res.rowCount * 2;

    // HEADERS
    worksheet.getCell("H1").value = "Track Report";
    worksheet.getCell("H2").value = "TRACK";
    worksheet.getCell("I2").value = "VERSION";
    worksheet.getCell("J2").value = "ARTIST";
    worksheet.getCell("K2").value = "PRODUCT";
    worksheet.getCell("L2").value = "REVENUE";
    for (i = 0; i < resp.length; i++) {
      worksheet.mergeCells("H" + (i + 3 + i) + ":" + "H" + (i + 4 + i));
      worksheet.mergeCells("J" + (i + 3 + i) + ":" + "J" + (i + 4 + i));
      worksheet.mergeCells("L" + (i + 3 + i) + ":" + "L" + (i + 4 + i));

      worksheet.getCell("H" + (i + 3 + i)).value = resp[i].track_name;
      worksheet.getCell("J" + (i + 3 + i)).value = artist;
      worksheet.getCell("L" + (i + 3 + i)).value =
        "$" + resp[i].revenue.toFixed(2);

      worksheet.getCell("K" + (i + 3 + i)).value = resp[i].product_name;
      worksheet.getCell("K" + (i + 4 + i)).value =
        "UPC: " + resp[i].orchard_upc;
    }
  } catch (error) {
    console.log(error);
  }

  //****************** Track Total ******************************
  try {
    let res = await TrackReportTotalQuery(pool, artist, period);
    let resp = res.rows;
    // HEADERS
    worksheet.getCell("H" + (parseInt(trackSpace) + 3)).value = "Total";
    worksheet.getCell("L" + (parseInt(trackSpace) + 3)).value =
      "$" + resp[0].total.toFixed(2);
  } catch (error) {
    console.log(error);
  }

  //***************************************************************************************************
  //********************************* End Track Report ************************************************
  //***************************************************************************************************

  //***************************************************************************************************
  //********************************* Start Product Report ********************************************
  //***************************************************************************************************
  let productSpace;
  try {
    let res = await ProductReportQuery(pool, artist, period);
    let resp = res.rows;
    productSpace = res.rowCount * 2;
    // HEADERS
    worksheet.getCell("N1").value = "Product Report";
    worksheet.getCell("N2").value = "PRODUCT";
    worksheet.getCell("O2").value = "ARTIST";
    worksheet.getCell("P2").value = "PROJECT CODE";
    worksheet.getCell("Q2").value = "PRODUCT CODE";
    worksheet.getCell("R2").value = "REVENUE";
    for (i = 0; i < resp.length; i++) {
      worksheet.mergeCells("O" + (i + 3 + i) + ":" + "O" + (i + 4 + i));
      worksheet.mergeCells("P" + (i + 3 + i) + ":" + "P" + (i + 4 + i));
      worksheet.mergeCells("Q" + (i + 3 + i) + ":" + "Q" + (i + 4 + i));
      worksheet.mergeCells("R" + (i + 3 + i) + ":" + "R" + (i + 4 + i));

      worksheet.getCell("N" + (i + 3 + i)).value = resp[i].product_name;
      worksheet.getCell("N" + (i + 4 + i)).value =
        "UPC: " + resp[i].orchard_upc;

      worksheet.getCell("O" + (i + 3 + i)).value = artist;
      worksheet.getCell("P" + (i + 3 + i)).value = resp[i].project_code;
      worksheet.getCell("Q" + (i + 3 + i)).value = resp[i].product_code;
      worksheet.getCell("R" + (i + 3 + i)).value =
        "$" + resp[i].revenue.toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }

  //**********************Product Report Total ***************************
  try {
    let res = await ProductReportTotalQuery(pool, artist, period);
    let resp = res.rows;
    // HEADERS
    worksheet.getCell("N" + (parseInt(productSpace) + 3)).value = "Total";
    worksheet.getCell("R" + (parseInt(productSpace) + 3)).value =
      "$" + resp[0].total.toFixed(2);
  } catch (error) {
    console.log(error);
  }

  //***************************************************************************************************
  //****************************** End Product Report *************************************************
  //***************************************************************************************************

  //***************************************************************************************************
  //****************************** Start data dump ****************************************************
  //***************************************************************************************************
  mainSpace = Math.max(channelSpace, sourceSpace, trackSpace, productSpace)
  try {
    let res = await DataDumpQuery(pool, artist, period);
    worksheet.getRow(mainSpace + 9).values = worksheetValues;
    worksheet.columns = worksheetColumns;
    let data = res.rows;

    // Dump all the data into Excel
    data.forEach((e) => {
      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can add formulas pretty easily by providing the formula property.
      worksheet.addRow({ ...e });
    });

    // force the columns to be at least as long as their header row.
    // Have to take this approach because ExcelJS doesn't have an autofit property.
    // worksheet.columns.forEach(column => {
    //   column.width = worksheet.getRow(mainSpace + 9).values.length
    // })

    // Make the header bold.
    // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
    worksheet.getRow(mainSpace + 9).font = { bold: true };
  } catch (error) {
    console.log(error);
  }
  //***************************************************************************************************
  //********************************* END data dump ***************************************************
  //***************************************************************************************************

  //***************************************************************************************************
  //********************************** END SH *********************************************************
  //***************************************************************************************************

  //***************************************************************************************************
  //********************************** BEGIN CB *******************************************************
  //***************************************************************************************************

  let worksheet_cb = workbook.addWorksheet(createSheetName(period).sheetName + 'CB');
  //************************* CB DATA DUMP **********************************************************
  let cb_length
  try {
    let res = await ChargeBackDataQuery(pool, artist, period);
    let data = res.rows;
    cb_length = data.length;

    //CB HEADERS
    worksheet_cb.getCell("A1").value = "EXPENSE";
    worksheet_cb.getCell("B1").value = "EXPENSE TYPE";
    worksheet_cb.getCell("C1").value = "PRODUCT";
    worksheet_cb.getCell("D1").value = "UPC";
    worksheet_cb.getCell("E1").value = "TOTAL";

    for(i=0;i<data.length;i++){
      worksheet_cb.getCell("A" + (i + 2)).value = data[i].expense;
      worksheet_cb.getCell("B" + (i + 2)).value = data[i].expense_type;
      worksheet_cb.getCell("C" + (i + 2)).value = data[i].release;
      worksheet_cb.getCell("D" + (i + 2)).value = data[i].upc;
      if(data[i]){
        worksheet_cb.getCell("E" + (i + 2)).value = Number(data[i].total.toFixed(2));
      } else {
        worksheet_cb.getCell("E" + (i + 2)).value = 0.00;
      }
      worksheet_cb.getCell("E" + (i + 2)).font = {
        color: {argb: 'ffff0000'},
        bold: true
      };
    }

  } catch (error) {
    console.log(error);
  }

  //******************************* CB TOTAL ***************************************************
  let cbTotal
  try {
    let res = await ChargeBackTotalQuery(pool, artist, period);
    let resp = res.rows;
    //console.log(resp)
    worksheet_cb.getCell("A" + (cb_length + 3)).value = "Total";
    if(resp[0].sum){
          worksheet_cb.getCell("B" + (cb_length + 3)).value = Number(resp[0].sum.toFixed(2));
          cbTotal = Number(resp[0].sum.toFixed(2))
        } else {
          worksheet_cb.getCell("B" + (cb_length + 3)).value = 0.00;
          cbTotal = 0.00
        }

    worksheet_cb.getCell("B" + (cb_length + 3)).font = {
        color: {argb: 'ffff0000'},
        bold: true
      };
  } catch (error) {
    console.log(error);
  }

  //***************************************************************************************************
  //********************************** END CB *********************************************************
  //***************************************************************************************************


  //***************************************************************************************************
  //********************************** Begin ST *******************************************************
  //***************************************************************************************************
  let worksheet_st = workbook.addWorksheet(createSheetName(period).sheetName + 'ST');
  //HEADERS
  worksheet_st.getCell("B1").value = createSheetName(period).date;
  worksheet_st.getCell("A1").value = artist;
  worksheet_st.getCell("A2").value = "Digital";
  worksheet_st.getCell("A3").value = "Physical Sales";
  worksheet_st.getCell("A5").value = "Non-interactive Radio";
  worksheet_st.getCell("A6").value = "Physical Returns";
  worksheet_st.getCell("A8").value = "Net Billings";
  worksheet_st.getCell("A10").value = "DEDUCTIONS AND FEES";
  worksheet_st.getCell("A11").value = "Distribution Fee";
  worksheet_st.getCell("A12").value = "Reserve For Future Returns";
  worksheet_st.getCell("A13").value = "Returns Handling";
  worksheet_st.getCell("A14").value = "Digital Sales Dist. Fee";
  worksheet_st.getCell("A15").value = "Marketing Fees";
  worksheet_st.getCell("A16").value = "Chargebacks";
  worksheet_st.getCell("A17").value = "Open Accruals";
  worksheet_st.getCell("A18").value = "Total Deductions And Fees";
  worksheet_st.getCell("A19").value = "Perf Rights";
  worksheet_st.getCell("A21").value = "Net Proceeds Due 120 Days";


  // Digital Total
  let digitalTotal
  try {
    let res = await DigitalTotalQuery(pool, artist, period);
    let resp = res.rows;
    digitalTotal = Number(resp[0].digital.toFixed(2))
    worksheet_st.getCell("C2").value = digitalTotal;
  } catch (error) {
    console.log(error);
  }

  // log Total
  let physicalTotal
  let nonInteractiveRadio
  let physicalReturns

  try {
    let res = await LogTotalQuery(pool, artist, period);
    let resp = res.rows;

    if(resp[2]){
      physicalTotal = Number(resp[2].total.toFixed(2))
    } else {
      physicalTotal = 0.00;
    }
    if(resp[0]){
      nonInteractiveRadio = Number(resp[0].total.toFixed(2))
    } else {
      nonInteractiveRadio = 0.00
    }
    if(resp[1]){
      physicalReturns = Number(resp[1].total.toFixed(2))
    } else {
      physicalReturns = 0.00
    }
    

    worksheet_st.getCell("C5").value = nonInteractiveRadio; // Non-interactive Radio
    worksheet_st.getCell("C6").value = physicalReturns; // physical returns
    worksheet_st.getCell("C3").value = physicalTotal; // physical total
  } catch (error) {
    console.log(error);
  }

//****************** st report non-query tabulations *****************************
  const distributionFee = .28;
  const reserveForFutureReturns = .25;
  const returnsHandling = .02;
  const digitalSalesFee = .26;

  worksheet_st.getCell("B11").value = distributionFee;
  worksheet_st.getCell("B12").value = reserveForFutureReturns;
  worksheet_st.getCell("B13").value = returnsHandling;
  worksheet_st.getCell("B14").value = digitalSalesFee;

  var netBillings = parseFloat(digitalTotal + nonInteractiveRadio + physicalTotal + physicalReturns).toFixed(2)
  var distributionFeeTotal = parseFloat((physicalTotal + physicalReturns) * distributionFee).toFixed(2)
  var reserveForFutureReturnsTotal = parseFloat(physicalTotal * reserveForFutureReturns).toFixed(2)
  var returnsHandlingTotal = parseFloat(physicalTotal * returnsHandling).toFixed(2)
  var digitalSalesFeeTotal = parseFloat((digitalTotal + nonInteractiveRadio) * digitalSalesFee).toFixed(2)

  //make excel do the formulas
  worksheet_st.getCell("C8").value =  { formula : "(C2+C5)+(C3+C6)", result : distributionFeeTotal}
  worksheet_st.getCell("C11").value = { formula : "(C3-C6)*B11", result : netBillings}
  worksheet_st.getCell("C12").value = { formula : "C3*B12", result : reserveForFutureReturnsTotal}
  worksheet_st.getCell("C13").value = { formula : "=C6*B13", result : returnsHandlingTotal}
  worksheet_st.getCell("C14").value = { formula : "=(C2+C5)*B14", result : digitalSalesFeeTotal}
  worksheet_st.getCell("C15").value = 0.00;
  worksheet_st.getCell("C16").value = cbTotal * -1;
  worksheet_st.getCell("C17").value = 0.00;
  var stTotal = Number(distributionFeeTotal)+Number(reserveForFutureReturnsTotal)+Number(returnsHandlingTotal)+
  Number(digitalSalesFeeTotal)+Number((cbTotal * -1));
  worksheet_st.getCell("C18").value = { formula : "=SUM(C11:C17)", result : stTotal}
  var perfRights = 0.00;
  worksheet_st.getCell("C19").value = perfRights;
  var netProceeds = Number(Number(netBillings)-Number(stTotal)+Number(perfRights));
  worksheet_st.getCell("C21").value = { formula : "=C8-C18+C19", result : netProceeds}

  //***************************************************************************************************
  //********************************** END ST *********************************************************
  //***************************************************************************************************
}

module.exports = { wrap }