function createSheetName(period) {
	let obj = {
		sheetName: '',
		date: ''
	}
  //let sheetName;

  switch (period) {
    case "2021M1":
      obj.sheetName = "0121";
      obj.date = 'Jan-21';
      break;
    case "2021M2":
      obj.sheetName = "0221";
      obj.date = 'Feb-21';
      break;
    case "2021M3":
      obj.sheetName = "0321";
      obj.date = 'Mar-21';
      break;
    case "2021M4":
      obj.sheetName = "0421";
      obj.date = 'Apr-21';
      break;
    case "2021M5":
      obj.sheetName = "0521";
      obj.date = 'May-21';
      break;
    case "2021M6":
      obj.sheetName = "0621";
      obj.date = 'Jun-21';
      break;
    case "2021M7":
      obj.sheetName = "0721";
      obj.date = 'Jul-21';
      break;
    case "2021M8":
      obj.sheetName = "0821";
      obj.date = 'Aug-21';
      break;
    case "2021M9":
      obj.sheetName = "0921";
      obj.date = 'Sep-21';
      break;
    case "2021M10":
     obj.sheetName = "1021";
     obj.date = 'Oct-21';
      break;
    case "2021M11":
      obj.sheetName = "1121";
      obj.date = 'Nov-21';
      break;
    case "2021M12":
      obj.sheetName = "1221";
      obj.date = 'Dec-21';
      break;
  }
  return obj;
}


module.exports = { createSheetName }