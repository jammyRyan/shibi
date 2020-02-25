const app = require('../../src/app');

describe('\'klineRealBtc\' service', () => {
  it('registered the service', () => {
    const service = app.service('kline-real-btc');
    expect(service).toBeTruthy();
  });
});
