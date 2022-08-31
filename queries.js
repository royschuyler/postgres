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
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Adam Hood') group by artist_name`)
}
//3
function GetArtistAndPeriodQuery3(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ariel Posen') group by artist_name`)
}
//4
function GetArtistAndPeriodQuery4(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ashley Ray') group by artist_name`)
}
//5
function GetArtistAndPeriodQuery5(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Aubrie Sellers') group by artist_name`)
}
//6
function GetArtistAndPeriodQuery6(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Austin Sisk') group by artist_name`)
}
//7
function GetArtistAndPeriodQuery7(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('BEEBE') group by artist_name`)
}
//8
function GetArtistAndPeriodQuery8(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ben Danaher') group by artist_name`)
}
//9
function GetArtistAndPeriodQuery9(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ben Sollee') group by artist_name`)
}
//10
function GetArtistAndPeriodQuery10(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Beth Nielsen Chapman') group by artist_name`)
}
//11
function GetArtistAndPeriodQuery11(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Blue Water Highway Band') group by artist_name`)
}
//12
function GetArtistAndPeriodQuery12(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Bob Schneider') group by artist_name`)
}
//13
function GetArtistAndPeriodQuery13(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Boo Ray') group by artist_name`)
}
//14
function GetArtistAndPeriodQuery14(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Caleb Caudle') group by artist_name`)
}
//15
function GetArtistAndPeriodQuery15(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Chandler Stephens') group by artist_name`)
}
//16
function GetArtistAndPeriodQuery16(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Charles Hill, Jr.') group by artist_name`)
}
//17
function GetArtistAndPeriodQuery17(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Charlie Marie') group by artist_name`)
}
//18
function GetArtistAndPeriodQuery18(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Childhood') group by artist_name`)
}
//19
function GetArtistAndPeriodQuery19(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Cody Jinks') group by artist_name`)
}
//20
function GetArtistAndPeriodQuery20(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Courtney Hartman') group by artist_name`)
}
//21
function GetArtistAndPeriodQuery21(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('DADDY (Will Kimbrough & Tommy Womack)') group by artist_name`)
}
//22
function GetArtistAndPeriodQuery22(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Darrell Scott') group by artist_name`)
}
//23
function GetArtistAndPeriodQuery23(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Dave Hause') group by artist_name`)
}
//24
function GetArtistAndPeriodQuery24(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('David Quinn') group by artist_name`)
}
//25
function GetArtistAndPeriodQuery25(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Della Mae') group by artist_name`)
}
//16
function GetArtistAndPeriodQuery26(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Dillon Carmichael') group by artist_name`)
}
//27
function GetArtistAndPeriodQuery27(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Dylan Hartigan') group by artist_name`)
}
//28
function GetArtistAndPeriodQuery28(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Eleanor Buckland') group by artist_name`)
}
//29
function GetArtistAndPeriodQuery29(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Forest Fire Gospel Choir') group by artist_name`)
}
//30
function GetArtistAndPeriodQuery30(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Foxtrot and The Get Down') group by artist_name`)
}
//31
function GetArtistAndPeriodQuery31(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Fretland') group by artist_name`)
}
//32
function GetArtistAndPeriodQuery32(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Garrison Starr') group by artist_name`)}
//33
function GetArtistAndPeriodQuery33(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Gasoline Lollipops') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery34(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Genuine Joy') group by artist_name`)
}
//35
function GetArtistAndPeriodQuery35(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Great Peacock') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery36(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Humming House') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery37(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Israel Nash') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery38(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jaclyn Kenyon') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery39(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jamie Isaac') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery40(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jen Cloher') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery41(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jerry Joseph') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery42(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jesse Daniel') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery43(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jesse Labelle') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery44(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Jordan Rager') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery45(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Josh Rennie-Hynes') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery46(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Joshua Davis') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery47(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Julia Cole') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery48(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Justin Wade Tam') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery49(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kaitlin Butts') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery50(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Katie Schecter') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery51(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Ken Yates') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery52(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kings Of Spade') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery53(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kirby Brown') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery54(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Korby Lenker') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery55(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Kyle Nix') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery56(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('LEVI WARE') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery57(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('LUX') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery58(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Landon Lloyd Miller') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery59(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Leftover Salmon') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery60(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Leon III') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery61(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Lindi Ortega') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery62(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Lisa Morales') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery63(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Liz Beebe') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery64(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Maggie Rose') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery65(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Mark Erelli') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery66(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Mark Fredson') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery67(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Melodic Caring rockSTARS') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery68(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Michael Martin Murphey') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery69(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Michael McArthur') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery70(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Mitchell Tenpenny') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery71(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('My Sister, My Brother') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery72(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Of Sea And Stone') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery73(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Osiris') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery74(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Phil Madeira') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery75(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Private Drive') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery76(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Prophets and Outlaws') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery77(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Rich Jacques') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery78(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('River Whyless') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery79(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Roger Clyne & The Peacemakers') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery80(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Sarah Siskind') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery81(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Scott Hirsch') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery82(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Scott Mulvahill') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery83(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Sean McConnell') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery84(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Skip Ewing') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery85(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Stephanie Urbina Jones') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery86(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Steve Moakler') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery87(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Suzanne Santo') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery88(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Bacon Brothers') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery89(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Court and Spark') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery90(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Great Dying') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery91(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Joy Formidable') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery92(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Lonely Biscuits') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery93(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Mammals') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery94(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The McCrary Sisters') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery95(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Shootouts') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery96(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Snarlin Yarns') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery97(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Way Down Wanderers') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery98(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Wilder Blue') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery99(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Tristan Bushman') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery100(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Two Bird Stone') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery101(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Vandoliers') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery102(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Wallis Bird') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery103(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Alela Diane') group by artist_name`)
}
//34
function GetArtistAndPeriodQuery104(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Michael McArthur') group by artist_name`)
}
function GetArtistAndPeriodQuery105(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Joe Pug') group by artist_name`)
}

/*
function GetArtistAndPeriodQuery30(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Vandoliers','Wallis Bird','Will Hoge') group by artist_name`)
}
function GetArtistAndPeriodQuery31(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Will Kimbrough','Williamson Brothers') group by artist_name`)
}
function GetArtistAndPeriodQuery32(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Landon Lloyd Miller') group by artist_name`)
}
function GetArtistAndPeriodQuery33(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Osiris') group by artist_name`)
}
function GetArtistAndPeriodQuery34(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('River Whyless') group by artist_name`)
}
function GetArtistAndPeriodQuery29(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('The Wilder Blue') group by artist_name`)
}
function GetArtistAndPeriodQuery28(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period_order)) as periods from main where artist_name in ('Wallis Bird') group by artist_name`)
}
*/


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
  GetArtistAndPeriodQuery34,
  GetArtistAndPeriodQuery35,
  GetArtistAndPeriodQuery36,
  GetArtistAndPeriodQuery37,
  GetArtistAndPeriodQuery38,
  GetArtistAndPeriodQuery39,
  GetArtistAndPeriodQuery40,
  GetArtistAndPeriodQuery41,
  GetArtistAndPeriodQuery42,
  GetArtistAndPeriodQuery43,
  GetArtistAndPeriodQuery44,
  GetArtistAndPeriodQuery45,
  GetArtistAndPeriodQuery46,
  GetArtistAndPeriodQuery47,
  GetArtistAndPeriodQuery48,
  GetArtistAndPeriodQuery49,
  GetArtistAndPeriodQuery50,
  GetArtistAndPeriodQuery51,
  GetArtistAndPeriodQuery52,
  GetArtistAndPeriodQuery53,
  GetArtistAndPeriodQuery54,
  GetArtistAndPeriodQuery55,
  GetArtistAndPeriodQuery56,
  GetArtistAndPeriodQuery57,
  GetArtistAndPeriodQuery58,
  GetArtistAndPeriodQuery59,
  GetArtistAndPeriodQuery60,
  GetArtistAndPeriodQuery61,
  GetArtistAndPeriodQuery62,
  GetArtistAndPeriodQuery63,
  GetArtistAndPeriodQuery64,
  GetArtistAndPeriodQuery65,
  GetArtistAndPeriodQuery66,
  GetArtistAndPeriodQuery67,
  GetArtistAndPeriodQuery68,
  GetArtistAndPeriodQuery69,
  GetArtistAndPeriodQuery70,
  GetArtistAndPeriodQuery71,
  GetArtistAndPeriodQuery72,
  GetArtistAndPeriodQuery73,
  GetArtistAndPeriodQuery74,
  GetArtistAndPeriodQuery75,
  GetArtistAndPeriodQuery76,
  GetArtistAndPeriodQuery77,
  GetArtistAndPeriodQuery78,
  GetArtistAndPeriodQuery79,
  GetArtistAndPeriodQuery80,
  GetArtistAndPeriodQuery81,
  GetArtistAndPeriodQuery82,
  GetArtistAndPeriodQuery83,
  GetArtistAndPeriodQuery84,
  GetArtistAndPeriodQuery85,
  GetArtistAndPeriodQuery86,
  GetArtistAndPeriodQuery87,
  GetArtistAndPeriodQuery88,
  GetArtistAndPeriodQuery89,
  GetArtistAndPeriodQuery90,
  GetArtistAndPeriodQuery91,
  GetArtistAndPeriodQuery92,
  GetArtistAndPeriodQuery93,
  GetArtistAndPeriodQuery94,
  GetArtistAndPeriodQuery95,
  GetArtistAndPeriodQuery96,
  GetArtistAndPeriodQuery97,
  GetArtistAndPeriodQuery98,
  GetArtistAndPeriodQuery99,
  GetArtistAndPeriodQuery100,
  GetArtistAndPeriodQuery101,
  GetArtistAndPeriodQuery102,
  GetArtistAndPeriodQuery103,
  GetArtistAndPeriodQuery104,
  GetArtistAndPeriodQuery105
}

