const makeActionCreator = typePrefix => {
  const status = ['START', 'SUCCESS', 'FAILURE'];

  typePrefix = typePrefix.toUpperCase();

  const action = payload => ({
    type: typePrefix,
    payload
  });

  action.type = typePrefix;

  status.forEach(type => {
    action[type.toLowerCase()] = payload => ({
      type: `${typePrefix}_${type}`,
      payload
    });
    action[type] = `${typePrefix}_${type}`;
  });

  return action;
};

export default makeActionCreator;
