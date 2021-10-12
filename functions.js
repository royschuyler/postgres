function getLastDate (periods) {
  var lastDate = periods[periods.length - 1];
  return lastDate;
}
//201911
//201901
function logicSheetName(period) {
  // var columnLetter = ["A","B","C","D","E","F","G","H","I","J","K",
  // "L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA",
  // "AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN",
  // "AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA",
  // "BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN",
  // "BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ"]

  var monthNamesArr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  var sheetMonthArr = [ "01", "02", "03", "04", "05", "06", 
         "07", "08", "09", "10", "11", "12" ];

  var year = period.substring(2,4)
  var month = period.substring(4,7)
  var monthName = monthNamesArr[Number(month) - 1];
  var sheetName = sheetMonthArr[Number(month) - 1] + year;
    let obj = {
    year: year,
    month: month,
    dateName: monthName,
    date: monthName + '-' + year,
    sheetName: sheetName
  }
    //getNext 12 months
    month = Number(month);
    year = Number(year);

    var res = [];
    for (var i = 0; i < 13; ++i) {
        res.push(monthNamesArr[month] + '-' + year);
        if (++month === 12) {
            month = 0;
            ++year;
        }
    }
  
  obj.nextMonths = res;
  return obj
}


module.exports = { getLastDate, logicSheetName }