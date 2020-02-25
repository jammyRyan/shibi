const app = require('../../src/app');

describe('\'huobiDetail\' service', () => {
  it('registered the service', () => {
    const service = app.service('huobi-detail');
    expect(service).toBeTruthy();
  });
});
