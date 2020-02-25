const app = require('../../src/app');

describe('\'huobiTotal\' service', () => {
  it('registered the service', () => {
    const service = app.service('huobi-total');
    expect(service).toBeTruthy();
  });
});
