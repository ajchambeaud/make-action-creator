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
        response: null,
        error: null
      }
    });
  });

  it('should update the status value when SUCCESS action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
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
        response: null,
        error: null
      }
    });
  });

  it('should update the response value when FAILURE action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
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
        response: {
          error: {
            message: 'this failed'
          }
        },
        error: 'this failed'
      }
    });
  });

  it('should update the response value when SUCCESS action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_SUCCESS',
      payload: 'test'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'success',
        response: 'test',
        error: null
      }
    });
  });

  it('should update the status and error values when FAILURE action was dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE',
      response: null,
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
        response: {
          error: {
            message: 'this failed'
          }
        },
        error: 'this failed'
      }
    });
  });

  it('should return null error when FAILURE action is dispatched and no payload is present', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'failure',
        response: null,
        error: null
      }
    });
  });

  it('should find the error message when payload is an object like {message: "error message"}', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE',
      payload: {
        message: 'foo'
      }
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'failure',
        response: {
          message: 'foo'
        },
        error: 'foo'
      }
    });
  });

  it('should find the error message when payload is an object like {error: "error message"}', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE',
      payload: {
        error: 'foo'
      }
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'failure',
        response: {
          error: 'foo'
        },
        error: 'foo'
      }
    });
  });

  it('should find the error message when payload is a string', () => {
    const prevState = {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    };

    const action = {
      type: 'MY_ACTION_FAILURE',
      payload: 'foo'
    };

    const newState = reducer(prevState, action);

    expect(newState).to.deep.equal({
      MY_ACTION: {
        status: 'failure',
        response: 'foo',
        error: 'foo'
      }
    });
  });

  it('should remove the action state key when CLEAR_STATUS action is dispatched', () => {
    const prevState = {
      MY_ACTION: {
        status: 'failure',
        response: null,
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
        response: null,
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
