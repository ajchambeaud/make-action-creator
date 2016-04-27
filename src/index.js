import { begin, end, pendingTask } from 'react-redux-spinner';

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

  return action;
};

export default makeActionCreator;
