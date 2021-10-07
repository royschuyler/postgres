function logicSheetName(period) {
  var monthNamesArr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  var sheetMonthArr = [ "01", "02", "03", "04", "05", "06", 
         "07", "08", "09", "10", "11", "12" ];

  var year = period.substring(2,4)
  var month = period.substring(5,7)
  var monthName = monthNamesArr[Number(month) - 1];
  var sheetName = sheetMonthArr[Number(month) - 1] + year;
    let obj = {
    year: year,
    month: month,
    dateName: monthName,
    date: monthName + '-' + year,
    sheetName: sheetName
  }
  return obj
}

function getLastDate (periods) {
  var lastDate = periods[periods.length - 2];
  return lastDate;
}


module.exports = { getLastDate, logicSheetName }