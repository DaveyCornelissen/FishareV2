import { DatabaseConfiguration } from './database.configuration';

describe('DatabaseConfiguration', () => {
  it('should be defined', () => {
    expect(new DatabaseConfiguration()).toBeDefined();
  });
});
