import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', function() {
  it('should return the inital state', function() {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store the token on loading', function() {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {type:actionTypes.AUTH_SUCCESS, idToken: 'some', userId: 'some id'})).toEqual({
      token: 'some',
      userId: 'some id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  });
});