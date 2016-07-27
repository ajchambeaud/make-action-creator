/* global describe, it */

import { expect } from 'chai';
import { reducer } from '../src/reducer';

describe('the reducer', () => {
  it('should add a new key in state when START action was dispatched', () => {
    const prevState = {};
    const action = {
      type: 'MY_ACTION_START'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'pending',
        error: null
      }
    });
  });

  it('should update the status value when SUCCESS action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_SUCCESS'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'success',
        error: null
      }
    });
  });

  it('should update the status and error values when FAILURE action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE',
      payload: {
        error: {
          message: 'this failed'
        }
      }
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'failure',
        error: 'this failed'
      }
    });
  });

  it('should remove the action state key when CLEAR_STATUS action is dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'failure',
        payload: {
          error: {
            message: 'this failed'
          }
        }
      }
    };

    const action = {
      type: 'CLEAR_STATUS',
      actionType: 'MY_ACTION'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: undefined
    });
  });

  it('should do nothing when other actions are dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'failure',
        payload: {
          error: {
            message: 'this failed'
          }
        }
      }
    };

    const action = {
      type: 'SOME_OTHER_ACTION'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal(prevState);
  });
});
