function ChannelReportQuery(pool, artist) {
  return pool.query(`SELECT distinct(trans_type_description), SUM(quantity) as quantity, SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period = '2021M3' and quantity > 0 group by trans_type_description`)
}

function SourceReportQuery(pool, artist) {
  return pool.query(`SELECT distinct(retailer), SUM(label_share_net_receipts) as revenue from main where artist_name = '${artist}' and period = '2021M3' and label_share_net_receipts > 0.00000001 group by retailer order by revenue desc`)
}

function SourceReportTotalQuery(pool, artist) {
  return pool.query(`select SUM(label_share_net_receipts) as total from main where artist_name = '${artist}' and period = '2021M3'`)
}

function TrackReportQuery(pool, artist) {
  return pool.query(`select distinct (track_name),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc from main where activity_period = '2021M3' and artist_name = 'Dave Hause' group by track_name,orchard_upc,product_name order by revenue desc`)
}

function ProductReportQuery(pool, artist) {
  return pool.query(`select distinct (product_name, orchard_upc),SUM(label_share_net_receipts) as revenue, product_name, orchard_upc, project_code, product_code from main where period = '2021M3' and artist_name = 'Dave Hause' group by product_name, orchard_upc,project_code, product_code order by revenue desc`)
}

function DataDumpQuery(pool, artist) {
  return pool.query(`SELECT * from main where artist_name = '${artist}' and period = '2021M3' order by retailer, orchard_upc, product_name,track_name limit 10`)
}



module.exports = {
  ChannelReportQuery,
  SourceReportQuery,
  SourceReportTotalQuery,
  TrackReportQuery,
  ProductReportQuery,
  DataDumpQuery
}