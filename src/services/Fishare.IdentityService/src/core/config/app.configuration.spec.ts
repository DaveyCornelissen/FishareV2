import { Configuration } from './app.configuration';

describe('Configuration', () => {
  it('should be defined', () => {
    expect(new Configuration()).toBeDefined();
  });
});
