//*************************** SH sheet queries ******************************************************
function ChannelReportQuery(pool, artist, period) {
  return pool.query(`SELECT distinct(trans_type_description), SUM(quantity) as quantity, SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period = '${period}' and quantity > 0 group by trans_type_description order by revenue desc`)
}

function ChannelReportPhysicalReturnsQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as physical_returns, quantity from main where trans_type_description = 'Physical Returns' and artist_name = '${artist}' and period = '${period}' group by quantity`)
}

function ChannelReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period = '${period}'`)
}

function SourceReportQuery(pool, artist, period) {
  return pool.query(`SELECT distinct(retailer), SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period = '${period}' and label_share_net_receipts > 0.00000001 group by retailer order by revenue desc`)
}

function SourceReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period = '${period}'`)
}

function TrackReportQuery(pool, artist, period) {
  return pool.query(`select distinct (track_name),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc from main where period = '${period}' and artist_name = 'Dave Hause' group by track_name,orchard_upc,product_name order by revenue desc`)
}

function TrackReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period = '${period}'`)
}

function ProductReportQuery(pool, artist, period) {
  return pool.query(`select distinct (product_name, orchard_upc),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc, project_code, product_code from main where period = '${period}' and artist_name = '${artist}' group by product_name, orchard_upc,project_code, product_code order by revenue desc`)
}

function ProductReportTotalQuery(pool, artist, period) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period = '${period}'`)
}

function DataDumpQuery(pool, artist, period) {
  return pool.query(`SELECT * from main where artist_name = '${artist}' and period = '${period}' order by retailer, orchard_upc, product_name,track_name`)
}

//*********************************** ST sheet queries *********************************************
function DigitalTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as digital from main where artist_name = '${artist}' and period = '${period}' and trans_type_description not in ('Physical Sales','Physical Returns','Non-interactive Radio')`)
}

function PhysicalTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as physical from main where artist_name = '${artist}' and period = '${period}' and trans_type_description = 'Physical Sales'`)
}

function LogTotalQuery(pool, artist, period) {
  return pool.query(`SELECT SUM(label_share_net_receipts) as total, trans_type_description from main where artist_name = '${artist}' and period = '${period}' and trans_type_description in ('Physical Sales','Physical Returns','Non-interactive Radio') group by trans_type_description`)
}

//*********************************** CB sheet queries *********************************************
function ChargeBackDataQuery(pool, artist, period) {
  return pool.query(`select expense,expense_type,release,upc,total from chargebacks where artist_name = '${artist}' and period = '${period}' and upc is not null group by expense_type,expense,release,upc,total order by total`)
}

function ChargeBackTotalQuery(pool, artist, period) {
  return pool.query(`select sum(total) from chargebacks where artist_name = '${artist}' and period = '${period}' and upc is not null`)
}


//********************************** Get Artist and Period Queries ********************************
function GetArtistAndPeriodQuery(pool) {
  return pool.query(`select distinct (artist_name), array_agg(distinct(period)) as period from main group by artist_name limit 1`)
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
  ChargeBackDataQuery,
  ChargeBackTotalQuery,
  GetArtistAndPeriodQuery
}

