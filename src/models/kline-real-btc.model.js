// klineRealBtc-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const klineRealBtc = new Schema({
    id: { type: Number, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    low: { type: Number, required: true },
    high: { type: Number, required: true },
    amount: { type: Number, required: true },
    vol: { type: Number, required: true },
    count: { type: Number, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('klineRealBtc');
  } catch (e) {
    return mongooseClient.model('klineRealBtc', klineRealBtc);
  }
};
