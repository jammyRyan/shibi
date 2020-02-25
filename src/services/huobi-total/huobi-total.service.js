// Initializes the `huobiTotal` service on path `/huobi-total`
const { HuobiTotal } = require('./huobi-total.class');
const createModel = require('../../models/huobi-total.model');
const hooks = require('./huobi-total.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/huobi-total', new HuobiTotal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('huobi-total');

  service.hooks(hooks);
};
