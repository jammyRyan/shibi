// Initializes the `klineBTC` service on path `/kline-btc`
const { KlineBtc } = require('./kline-btc.class');
const createModel = require('../../models/kline-btc.model');
const hooks = require('./kline-btc.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/kline-btc', new KlineBtc(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kline-btc');

  service.hooks(hooks);
};
