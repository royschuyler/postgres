function ChannelReportQuery(pool, artist) {
  return pool.query("SELECT distinct(trans_type_description), SUM(quantity) as quantity, SUM(label_share_net_receipts) as revenue from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' and quantity > 0 group by trans_type_description")
}

function SourceReportQuery(pool, artist) {
  return pool.query("SELECT distinct(retailer), SUM(label_share_net_receipts) as revenue from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' and label_share_net_receipts > 0.00000001 group by retailer")
}

function DataDumpQuery(pool, artist) {
  return pool.query("SELECT * from main where artist_name =" + "'" + artist + "'"+ " and period = '2021M3' order by retailer, orchard_upc, product_name,track_name limit 10")
}

module.exports = {
  ChannelReportQuery,
  SourceReportQuery,
  DataDumpQuery
}