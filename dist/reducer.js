'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This reducer adds or updates state keys for action types with
 * async suffixes and does nothing for other action types.
 * Then, make-action-creator selectors may access specific actions
 * statuses and error messages easily.
 */
var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (isAsync(action.type)) {
    var _breakAction = breakAction(action.type),
        base = _breakAction.base,
        sub = _breakAction.sub;

    return _extends({}, state, _defineProperty({}, base, {
      status: sub === 'START' ? 'pending' : sub === 'SUCCESS' ? 'success' : 'failure',
      error: sub === 'FAILURE' ? getErrorMessage(action.payload) : null,
      response: sub === 'SUCCESS' ? action.payload : null
    }));
  }
  if (action.type === 'CLEAR_STATUS') {
    return _extends({}, state, _defineProperty({}, action.actionType, undefined));
  }
  return state;
};

// Returs true if action type has an async suffix.
function isAsync(type) {
  return ['START', 'SUCCESS', 'FAILURE'].indexOf(type.slice(type.lastIndexOf('_') + 1)) >= 0;
}

// Returns action type base (without suffix) and sub-action type suffix.
function breakAction(type) {
  return {
    base: type.slice(0, type.lastIndexOf('_')),
    sub: type.slice(type.lastIndexOf('_') + 1)
  };
}

// Find the error message.
function getErrorMessage(payload) {

  if (!payload) {
    return null;
  }

  if (typeof payload === 'string') {
    return payload;
  }

  if (typeof payload.error === 'string') {
    return payload.error;
  }

  if (typeof payload.message === 'string') {
    return payload.message;
  }

  if (payload.error && payload.error.message) {
    return payload.error.message;
  }

  return null;
}