const huobiWs = require('./huobi-ws');
const huobitest = require('./huobitest');
const huobiMin = require('./huobi-min');
const count = require('./count');
const huobiRealMin = require('./huobi-real-min');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/syncHuobi',huobiWs(app));
  app.use('/huobitest',huobitest(app));
  app.use('/synchuobimin',huobiMin(app));
  app.use('/count',count(app));
  app.use('/synchuobirealmin',huobiRealMin(app));
};
