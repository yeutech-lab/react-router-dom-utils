import matchParamsPath from '../matchParamsPath';

describe('matchParamsPath', () => {
  it('should match', () => {
    expect(matchParamsPath('/users/1', '/users/:id')).toBe(true);
    expect(matchParamsPath('/users/1/settings', '/users/:id/settings')).toBe(true);
    expect(matchParamsPath('/users/1/settings/2', '/users/:id/settings/:settingsId')).toBe(true);
    expect(matchParamsPath('/users/1/settings/2/ok', '/users/:id/settings/:settingsId/:w1th-d4sh')).toBe(true);
  });
  it('should fail', () => {
    expect(matchParamsPath('/users', '/users/:id')).toBe(false);
    expect(matchParamsPath('/users/settings', '/users/:id/settings')).toBe(false);
    expect(matchParamsPath('/users/1/settings', '/users/:id/settings/:settingsId')).toBe(false);
    expect(matchParamsPath('/users/1/settings/ok', '/users/:id/settings/:settingsId/:w1th-d4sh')).toBe(false);
  });
});
