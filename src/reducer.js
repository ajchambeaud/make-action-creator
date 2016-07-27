/**
 * This reducer adds or updates state keys for action types with
 * async suffixes and does nothing for other action types.
 * Then, make-action-creator selectors may access specific actions
 * statuses and error messages easily.
 */
export const reducer = (state = {}, action) => {
  if (isAsync(action.type)) {
    const { base, sub } = breakAction(action.type);
    return {
      ...state,
      [base]: {
        status: sub === 'START' ? 'pending' : (sub === 'SUCCESS' ? 'success' : 'failure'),
        error: sub === 'FAILURE' ? action.payload.error : null
      }
    };
  }
  if (action.type === 'CLEAR_STATUS') {
    return {
      ...state,
      [action.actionType]: undefined
    };
  }
  return state;
};

// Returs true if action type has an async suffix.
function isAsync (type) {
  return ['START', 'SUCCESS', 'FAILURE'].indexOf(type.slice(type.lastIndexOf('_') + 1)) >= 0;
}

// Returns action type base (without suffix) and sub-action type suffix.
function breakAction (type) {
  return {
    base: type.slice(0, type.lastIndexOf('_')),
    sub: type.slice(type.lastIndexOf('_') + 1)
  };
}
