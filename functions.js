function createSheetName(period) {
  let sheetName;
  switch (period) {
    case "2021M1":
      sheetName = "0121 SH";
      break;
    case "2021M2":
      sheetName = "0221 SH";
      break;
    case "2021M3":
      sheetName = "0321 SH";
      break;
    case "2021M4":
      sheetName = "0421 SH";
      break;
    case "2021M5":
      sheetName = "0521 SH";
      break;
    case "2021M6":
      sheetName = "0621 SH";
      break;
    case "2021M7":
      sheetName = "0721 SH";
      break;
    case "2021M8":
      sheetName = "0821 SH";
      break;
    case "2021M9":
      sheetName = "0921 SH";
      break;
    case "2021M10":
      sheetName = "1021 SH";
      break;
    case "2021M11":
      sheetName = "1121SH";
      break;
    case "2021M12":
      sheetName = "1221 SH";
      break;
  }
  return sheetName;
}

module.exports = { createSheetName }