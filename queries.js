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
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Adam Hood','Ariel Posen','Ashley Ray','Aubrie Sellers','Austin Sisk','BEEBE','Ben Danaher','Ben Sollee','Beth Nielsen Chapman','Blue Water Highway Band') group by artist_name`)
}
//3
function GetArtistAndPeriodQuery3(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Bob Schneider','Boo Ray','Caleb Caudle','Chandler Stephens','Charles Hill, Jr.','Charlie Marie','Childhood','Cody Jinks','Courtney Hartman','DADDY (Will Kimbrough & Tommy Womack)') group by artist_name`)
}
//4
function GetArtistAndPeriodQuery4(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Darrell Scott','Dave Hause','Della Mae','Dillon Carmichael','Dylan Hartigan','Eleanor Buckland','Forest Fire Gospel Choir','Foxtrot and The Get Down','Fretland','Garrison Starr') group by artist_name`)
}
//5
function GetArtistAndPeriodQuery5(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Gasoline Lollipops','Genuine Joy','Great Peacock','Humming House','Israel Nash','Jaclyn Kenyon','Jamie Isaac','Jen Cloher','Jerry Joseph','Jesse Daniel') group by artist_name`)
}
//6
function GetArtistAndPeriodQuery6(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jesse Labelle','Jordan Rager','Josh Rennie-Hynes','Joshua Davis','Julia Cole','Justin Wade Tam','Katie Schecter','Kings Of Spade','Kirby Brown','Korby Lenker') group by artist_name`)
}
//7
// function GetArtistAndPeriodQuery7(pool) {
//   return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kyle Nix','LUX','Leftover Salmon','Leon III','Lisa Morales','Liz Beebe','Maggie Rose','Mark Erelli','Melodic Caring rockSTARS') group by artist_name`)
// }
function GetArtistAndPeriodQuery7(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Snarlin Yarns') group by artist_name`)
}
//8
function GetArtistAndPeriodQuery8(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Michael Martin Murphey','Mitchell Tenpenny','My Sister, My Brother','Of Sea And Stone','Phil Madeira','Private Drive','Prophets and Outlaws','Roger Clyne & The Peacemakers','Sarah Siskind','Scott Hirsch') group by artist_name`)
}
//9
function GetArtistAndPeriodQuery9(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Suzanne Santo','The Bacon Brothers','The Great Dying','The Joy Formidable','The Lonely Biscuits','The Mammals','The McCrary Sisters') group by artist_name`)
}
//10
function GetArtistAndPeriodQuery10(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Shootouts','The Way Down Wanderers','Tristan Bushman','Two Bird Stone','Vandoliers','Will Kimbrough','Williamson Brothers') group by artist_name`)
}
// function GetArtistAndPeriodQuery11(pool) {
//   return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Scott Mulvahill','Sean McConnell','Skip Ewing','Stephanie Urbina Jones','Steve Moakler','The Snarlin'' Yarns') group by artist_name`)
// }
function GetArtistAndPeriodQuery11(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Bob Schneider') group by artist_name`)
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
  GetArtistAndPeriodQuery11
}

