import authReducer, { loginSuccess, logout } from './authReducer';

describe('auth reducer', () => {
  const initialState = {
    token: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const token = 'sample-token';
    const actual = authReducer(initialState, loginSuccess({ token }));
    expect(actual.token).toEqual(token);
  });

  it('should handle logout', () => {
    const state = { token: 'sample-token' };
    const actual = authReducer(state, logout());
    expect(actual.token).toBeNull();
  });
});
