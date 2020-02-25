const users = require('./users/users.service.js');
const klineBtc = require('./kline-btc/kline-btc.service.js');
const huobiTotal = require('./huobi-total/huobi-total.service.js');
const huobiDetail = require('./huobi-detail/huobi-detail.service.js');
const klineRealBtc = require('./kline-real-btc/kline-real-btc.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(klineBtc);
  app.configure(huobiTotal);
  app.configure(huobiDetail);
  app.configure(klineRealBtc);
};
