// huobiDetail-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const huobiDetail = new Schema({
    totalId: { type: String, required: true },
    start:{ type: Number },
    end:{ type: Number },
    type:{ type: String },
    count:{ type: Number },
    avg:{ type: Number },
    open:{ type: Number },
    close:{ type: Number },
    range:{ type: Number}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('huobiDetail');
  } catch (e) {
    return mongooseClient.model('huobiDetail', huobiDetail);
  }
};
