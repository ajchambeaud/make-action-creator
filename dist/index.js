'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactReduxSpinner = require('react-redux-spinner');

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

  return action;
};

exports.default = makeActionCreator;
module.exports = exports['default'];
