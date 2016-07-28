import { begin, end, pendingTask } from 'react-redux-spinner';

const STATE_KEY = 'async';
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

  action.getError = getErrorSelector(action.type);
  action.getStatus = getStatusSelector(action.type);
  action.clearStatus = { type: 'CLEAR_STATUS', actionType: action.type };

  return action;
};

function getStatusSelector (actionType) {
  return state => state[STATE_KEY][actionType]
    ? state[STATE_KEY][actionType].status
    : DEFAULT_STATUS_VALUE;
}

function getErrorSelector (actionType) {
  return state => state[STATE_KEY][actionType]
    ? state[STATE_KEY][actionType].error
    : DEFAULT_ERROR_VALUE;
}

export default makeActionCreator;
