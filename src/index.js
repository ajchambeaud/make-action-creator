import { begin, end, pendingTask } from 'react-redux-spinner';

const DEFAULT_STATE_KEY = 'async';
const DEFAULT_STATUS_VALUE = 'init';
const DEFAULT_ERROR_VALUE = null;

const makeActionCreator = (typePrefix, options = {}) => {
  const status = ['START', 'SUCCESS', 'FAILURE'];

  typePrefix = typePrefix.toUpperCase();

  const action = (payload, additionalFields = {}) => Object.assign({}, {
    type: typePrefix,
    payload
  }, additionalFields);

  action.type = typePrefix;

  status.forEach(type => {
    action[type.toLowerCase()] = (payload, additionalFields = {}) => {
      const subAction = {};
      subAction.type = `${typePrefix}_${type}`;
      subAction.payload = payload;

      if (options.rrSpinner) {
        subAction[pendingTask] = type === 'START' ? begin : end;
      }

      return Object.assign({}, subAction, additionalFields);
    };
    action[type] = `${typePrefix}_${type}`;
  });

  action.getError = getErrorSelector(action.type, options.stateKey);
  action.getStatus = getStatusSelector(action.type, options.stateKey);
  action.clearStatus = { type: 'CLEAR_STATUS', actionType: action.type };

  return action;
};

function getStatusSelector (actionType, stateKey = DEFAULT_STATE_KEY) {
  return state => state[stateKey][actionType]
    ? state[stateKey][actionType].status
    : DEFAULT_STATUS_VALUE;
}

function getErrorSelector (actionType, stateKey = DEFAULT_STATE_KEY) {
  return state => state[stateKey][actionType]
    ? state[stateKey][actionType].error
    : DEFAULT_ERROR_VALUE;
}

export default makeActionCreator;
