const app = require('../../src/app');

describe('\'klineBTC\' service', () => {
  it('registered the service', () => {
    const service = app.service('kline-btc');
    expect(service).toBeTruthy();
  });
});
