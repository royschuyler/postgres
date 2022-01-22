//*************************** SH sheet queries ******************************************************
function ChannelReportQuery(pool, artist, period) {
  return pool.query(`SELECT distinct(trans_type_description), SUM(quantity) as quantity, SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period_order = '${period}' and quantity > 0 group by trans_type_description order by revenue desc`)
}

function ChannelReportPhysicalReturnsQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as physical_returns, quantity from main where trans_type_description = 'Physical Returns' and artist_name = '${artist}' and period_order = '${period}' group by quantity`)
}

function ChannelReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}'`)
}

function SourceReportQuery(pool, artist, period) {
  return pool.query(`SELECT distinct(retailer), SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period_order = '${period}' and label_share_net_receipts > 0.00000001 group by retailer order by revenue desc`)
}

function SourceReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}'`)
}

function TrackReportQuery(pool, artist, period) {
  return pool.query(`select distinct (track_name),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc from main where period_order = '${period}' and artist_name = '${artist}' group by track_name,orchard_upc,product_name order by revenue desc`)
}

function TrackReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}'`)
}

function ProductReportQuery(pool, artist, period) {
  return pool.query(`select distinct (product_name, orchard_upc),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc, project_code, product_code from main where period_order = '${period}' and artist_name = '${artist}' group by product_name, orchard_upc,project_code, product_code order by revenue desc`)
}

function ProductReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}'`)
}

function DataDumpQuery(pool, artist, period) {
  return pool.query(`SELECT * from main where artist_name = '${artist}' and period_order = '${period}' order by retailer, orchard_upc, product_name,track_name`)
}

//*********************************** ST sheet queries *********************************************
function DigitalTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as digital from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description not in ('Physical Sales','Physical Returns','Non-interactive Radio')`)
}

function PhysicalTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as physical from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description = 'Physical Sales'`)
}

function LogTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as total, trans_type_description from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description in ('Physical Sales','Physical Returns','Non-interactive Radio') group by trans_type_description`)
}

function LogTotalQueryPhysicalSales(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description = 'Physical Sales'`)
}

function LogTotalQueryPhysicalReturns(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description = 'Physical Returns'`)
}

function LogTotalQueryNonRadio(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period_order = '${period}' and trans_type_description = 'Non-interactive Radio'`)
}

//*********************************** CB sheet queries *********************************************
function ChargeBackDataQuery(pool, artist, period) {
  return pool.query(`select expense,expense_type,release,upc,total from chargebacks where artist_name = '${artist}' and period_order = '${period}' and upc is not null group by expense_type,expense,release,upc,total order by total`)
}

function ChargeBackTotalQuery(pool, artist, period) {
  return pool.query(`select sum(total) from chargebacks where artist_name = '${artist}' and period_order = '${period}' and upc is not null`)
}


//********************************** Get Artist and Period Queries ********************************
/*
function GetArtistAndPeriodQuery(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Lindi Ortega') and period_order in ('202109') group by artist_name`)
}
*/
//1 ALL
function GetArtistAndPeriodQuery(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main group by artist_name`)
}
//1 ALL
function GetArtistAndPeriodQuery1(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main group by artist_name`)
}


//2
function GetArtistAndPeriodQuery2(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Adam Hood','Ariel Posen','Ashley Ray') group by artist_name`)
}
//3
function GetArtistAndPeriodQuery3(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Aubrie Sellers','Austin Sisk','BEEBE') group by artist_name`)
}
//4
function GetArtistAndPeriodQuery4(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ben Danaher','Ben Sollee','Beth Nielsen Chapman') group by artist_name`)
}
//5
function GetArtistAndPeriodQuery5(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Blue Water Highway Band','Bob Schneider','Boo Ray') group by artist_name`)
}
//6
function GetArtistAndPeriodQuery6(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Caleb Caudle','Chandler Stephens','Charles Hill, Jr.') group by artist_name`)
}
//7
function GetArtistAndPeriodQuery7(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Charlie Marie','Childhood','Cody Jinks') group by artist_name`)
}
//8
function GetArtistAndPeriodQuery8(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Courtney Hartman','DADDY (Will Kimbrough & Tommy Womack)','Darrell Scott') group by artist_name`)
}
//9
function GetArtistAndPeriodQuery9(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Dave Hause','Della Mae','Dillon Carmichael') group by artist_name`)
}
//10
function GetArtistAndPeriodQuery10(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Dylan Hartigan','Eleanor Buckland','Forest Fire Gospel Choir') group by artist_name`)
}
//11
function GetArtistAndPeriodQuery11(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Foxtrot and The Get Down','Fretland','Garrison Starr') group by artist_name`)
}
//12
function GetArtistAndPeriodQuery12(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Gasoline Lollipops','Genuine Joy','Great Peacock') group by artist_name`)
}
//13
function GetArtistAndPeriodQuery13(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Humming House','Israel Nash','Jaclyn Kenyon') group by artist_name`)
}
//14
function GetArtistAndPeriodQuery14(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jamie Isaac','Jen Cloher','Jerry Joseph') group by artist_name`)
}
//15
function GetArtistAndPeriodQuery15(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jesse Daniel','Jesse Labelle','Jordan Rager') group by artist_name`)
}
//16
function GetArtistAndPeriodQuery16(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Josh Rennie-Hynes','Joshua Davis','Julia Cole') group by artist_name`)
}
//17
function GetArtistAndPeriodQuery17(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Justin Wade Tam','Kaitlin Butts','Katie Schecter') group by artist_name`)
}
//18
function GetArtistAndPeriodQuery18(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kings Of Spade','Kirby Brown','Korby Lenker') group by artist_name`)
}
//19
function GetArtistAndPeriodQuery19(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kyle Nix','LUX','Leftover Salmon') group by artist_name`)
}
//20
function GetArtistAndPeriodQuery20(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Leon III','Lindi Ortega','Lisa Morales') group by artist_name`)
}
//21
function GetArtistAndPeriodQuery21(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Liz Beebe','Maggie Rose','Mark Erelli') group by artist_name`)
}
//22
function GetArtistAndPeriodQuery22(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Mark Fredson','Melodic Caring rockSTARS','Michael Martin Murphey') group by artist_name`)
}
//23
function GetArtistAndPeriodQuery23(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Mitchell Tenpenny','My Sister, My Brother','Of Sea And Stone') group by artist_name`)
}
//24
function GetArtistAndPeriodQuery24(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Phil Madeira','Private Drive','Prophets and Outlaws') group by artist_name`)
}
//25
function GetArtistAndPeriodQuery25(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Roger Clyne & The Peacemakers','Sarah Siskind','Scott Hirsch') group by artist_name`)
}
//16
function GetArtistAndPeriodQuery26(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Scott Mulvahill','Sean McConnell','Skip Ewing') group by artist_name`)
}
//27
function GetArtistAndPeriodQuery27(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Stephanie Urbina Jones','Steve Moakler','Suzanne Santo') group by artist_name`)
}
//28
function GetArtistAndPeriodQuery28(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Bacon Brothers','The Court and Spark','The Great Dying') group by artist_name`)
}
//29
function GetArtistAndPeriodQuery29(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Joy Formidable','The Lonely Biscuits','The Mammals') group by artist_name`)
}
//30
function GetArtistAndPeriodQuery30(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The McCrary Sisters','The Shootouts','The Snarlin Yarns') group by artist_name`)
}
//31
function GetArtistAndPeriodQuery31(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Way Down Wanderers','Tristan Bushman','Two Bird Stone') group by artist_name`)
}
//32
function GetArtistAndPeriodQuery32(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Vandoliers','Will Kimbrough','Williamson Brothers') group by artist_name`)}
//33
function GetArtistAndPeriodQuery33(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Lindi Ortega') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery34(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Lindi Ortega') group by artist_name`)
}




module.exports = {
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
  LogTotalQuery,
  LogTotalQueryPhysicalSales,
  LogTotalQueryPhysicalReturns,
  LogTotalQueryNonRadio,
  ChargeBackDataQuery,
  ChargeBackTotalQuery,
  GetArtistAndPeriodQuery,
  GetArtistAndPeriodQuery1,
  GetArtistAndPeriodQuery2,
  GetArtistAndPeriodQuery3,
  GetArtistAndPeriodQuery4,
  GetArtistAndPeriodQuery5,
  GetArtistAndPeriodQuery6,
  GetArtistAndPeriodQuery7,
  GetArtistAndPeriodQuery8,
  GetArtistAndPeriodQuery9,
  GetArtistAndPeriodQuery10,
  GetArtistAndPeriodQuery11,
  GetArtistAndPeriodQuery12,
  GetArtistAndPeriodQuery13,
  GetArtistAndPeriodQuery14,
  GetArtistAndPeriodQuery15,
  GetArtistAndPeriodQuery16,
  GetArtistAndPeriodQuery17,
  GetArtistAndPeriodQuery18,
  GetArtistAndPeriodQuery19,
  GetArtistAndPeriodQuery20,
  GetArtistAndPeriodQuery21,
  GetArtistAndPeriodQuery22,
  GetArtistAndPeriodQuery23,
  GetArtistAndPeriodQuery24,
  GetArtistAndPeriodQuery25,
  GetArtistAndPeriodQuery26,
  GetArtistAndPeriodQuery27,
  GetArtistAndPeriodQuery28,
  GetArtistAndPeriodQuery29,
  GetArtistAndPeriodQuery30,
  GetArtistAndPeriodQuery31,
  GetArtistAndPeriodQuery32,
  GetArtistAndPeriodQuery33,
  GetArtistAndPeriodQuery34
}

