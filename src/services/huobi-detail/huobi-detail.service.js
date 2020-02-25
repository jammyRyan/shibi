// Initializes the `huobiDetail` service on path `/huobi-detail`
const { HuobiDetail } = require('./huobi-detail.class');
const createModel = require('../../models/huobi-detail.model');
const hooks = require('./huobi-detail.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/huobi-detail', new HuobiDetail(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('huobi-detail');

  service.hooks(hooks);
};
