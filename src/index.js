const makeActionCreator = typePrefix => payload => ({
  type: typePrefix.toUpperCase(),
  payload
});

export default makeActionCreator;
