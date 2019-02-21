import isPathParamsPath from '../isPathParamsPath';

describe('isPathParamsPath', () => {
  it('should match', () => {
    expect(isPathParamsPath('/users/1', '/users/:id')).toBe(true);
    expect(isPathParamsPath('/users/1/settings', '/users/:id/settings')).toBe(true);
    expect(isPathParamsPath('/users/1/settings/2', '/users/:id/settings/:settingsId')).toBe(true);
    expect(isPathParamsPath('/users/1/settings/2/ok', '/users/:id/settings/:settingsId/:w1th-d4sh')).toBe(true);
  });
  it('should fail', () => {
    expect(isPathParamsPath('/users', '/users/:id')).toBe(false);
    expect(isPathParamsPath('/users/settings', '/users/:id/settings')).toBe(false);
    expect(isPathParamsPath('/users/1/settings', '/users/:id/settings/:settingsId')).toBe(false);
    expect(isPathParamsPath('/users/1/settings/ok', '/users/:id/settings/:settingsId/:w1th-d4sh')).toBe(false);
  });
});
