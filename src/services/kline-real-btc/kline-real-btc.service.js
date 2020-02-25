// Initializes the `klineRealBtc` service on path `/kline-real-btc`
const { KlineRealBtc } = require('./kline-real-btc.class');
const createModel = require('../../models/kline-real-btc.model');
const hooks = require('./kline-real-btc.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/kline-real-btc', new KlineRealBtc(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kline-real-btc');

  service.hooks(hooks);
};
