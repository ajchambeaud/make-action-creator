'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactReduxSpinner = require('react-redux-spinner');

var DEFAULT_STATE_KEY = 'async';
var DEFAULT_STATUS_VALUE = 'init';
var DEFAULT_ERROR_VALUE = null;

var makeActionCreator = function makeActionCreator(typePrefix) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var status = ['START', 'SUCCESS', 'FAILURE'];

  typePrefix = typePrefix.toUpperCase();

  var action = function action(payload) {
    var additionalFields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return Object.assign({}, {
      type: typePrefix,
      payload: payload
    }, additionalFields);
  };

  action.type = typePrefix;

  status.forEach(function (type) {
    action[type.toLowerCase()] = function (payload) {
      var additionalFields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var subAction = {};
      subAction.type = typePrefix + '_' + type;
      subAction.payload = payload;

      if (options.rrSpinner) {
        subAction[_reactReduxSpinner.pendingTask] = type === 'START' ? _reactReduxSpinner.begin : _reactReduxSpinner.end;
      }

      return Object.assign({}, subAction, additionalFields);
    };
    action[type] = typePrefix + '_' + type;
  });

  action.getError = getErrorSelector(action.type, options.stateKey);
  action.getStatus = getStatusSelector(action.type, options.stateKey);
  action.clearStatus = { type: 'CLEAR_STATUS', actionType: action.type };

  return action;
};

function getStatusSelector(actionType) {
  var stateKey = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_STATE_KEY : arguments[1];

  return function (state) {
    return state[stateKey][actionType] ? state[stateKey][actionType].status : DEFAULT_STATUS_VALUE;
  };
}

function getErrorSelector(actionType) {
  var stateKey = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_STATE_KEY : arguments[1];

  return function (state) {
    return state[stateKey][actionType] ? state[stateKey][actionType].error : DEFAULT_ERROR_VALUE;
  };
}

exports.default = makeActionCreator;
module.exports = exports['default'];