# make-action-creator
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![Build Status](https://travis-ci.org/ajchambeaud/make-action-creator.svg?style=flat-square&branch=master)](https://travis-ci.org/ajchambeaud/make-action-creator)
[![npm version](https://img.shields.io/npm/v/make-action-creator.svg?style=flat-square)](https://www.npmjs.com/package/make-action-creator)

## Context

### Actions

Actions are one of the most important part of a react/redux application. Also they're the most simple ones: plain objects acting like messages (signals) telling what's going on in your application.  

```
{
  type: 'MY_ACTION',
  payload: 'foo'
}
```

### Actions Creators

So the action object is very simple, just need a unique identifier (the `type` field). By convencion, the type should be an uppercase string. You want to be sure that you dont misspell the action type when dispatch an action, and because of that, the redux documentation encourage you to make a function to return always the same action type: the action creator function.

```
const myAction = payload => ({
  type: 'MY_ACTION',
  payload
})

myAction('foo');
```

### Action Type Constant

Now you have the action creator, but you need the action type in the reducer to generate the new state. So you'll need a constant to be sure you are using the same action type in the action creator an the reducer function.

```
function myReducer(state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      return 'My new state'
    default:
      return state
  }
}
```
### Action Creator Creators

This sounds like an Andre Staltz What The Flux joke (https://www.npmjs.com/package/wtflux) but actually make sense. In real world applications you have a lot of related actions in async operations (e.g. data fetch). You'll end up with a lot of costants imports (FETCH_CLIENTS , FETCH_CLIENTS_START, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE, etc), and of course, the corresponding action creators. This module is an Action Creator Creator (lol) that tries to keep the related actions and constants together in a single object.

### My redux application goals

There are many diferents ways to do a redux application. Regardless this module is just about the actions stuff, I use it in a redux application context with this assumptions:

- Actions are simple signals
- Reducer functions must express the state transformation, not the actionCreator.
- Action creator must be as pure as the reducer.
- Side efects in redux sagas.

## Usage

### Simple actions

In your actions file

```
import makeActionCreator from 'make-action-creator';

export const showModalForm = makeActionCreator('show_modal_form');
```

In your componant file

```
import showModalForm from './actions';

dispatch(showModalForm(data));

/*
{
	type: 'SHOW_MODAL_FORM',
	payload: data
}
*/
```

In your reducer file

```
import showModalForm from './actions';

function myReducer(state = initialState, action) {
  switch (action.type) {
    case showModalForm.type:
      return 'My new state'
    default:
      return state
  }
}
```

### Async flow

In your actions file

```
import makeActionCreator from 'make-action-creator';

export const deleteUser = makeActionCreator('delete_user');
```

In your componant file

```
import deleteUser from './actions';

dispatch(deleteUser(userId));

/*
{
	type: 'DELETE_USER',
	payload: userId
}
*/
```

In your sagas file :)

```
import deleteUser from './actions';

function * deleteUserWorker (action) {
  yield put(deleteUser.start(action.payload)); // dispatch 'DELETE_USER_START'

  const { user, error } = yield call(userApi.delete, action.payload);

  if (error) {
    return yield put(deleteUser.failure(error)); // dispatch 'DELETE_USER_FAILURE'
  }

  yield put(deleteUser.success(user)); // dispatch 'DELETE_USER_SUCCESS'
}

export function * deleteUserWatcher () {
  yield takeEvery(deleteUser.type, deleteUserWorker); // whatch 'DELETE_USER'
}
```

In your reducer file

```
import deleteUser from './actions';

function myReducer(state = initialState, action) {
  switch (action.type) {
    case deleteUser.START:
      return 'Deleting user...';
    case deleteUser.FAILURE:
      return 'doh!'
    case deleteUser.SUCCESS:
      return 'Done!'
    default:
      return state
  }
}
```

### Integrate with react-redux-spinner

I kind a like this module: https://www.npmjs.com/package/react-redux-spinner.

As async flow use to come with showing some loader in the page, if you are using this module and like the async related actions to include the flags to start and finish the react-redux-spinner, just add this to the actionCreator creation step:

```
const myAction = makeActionCreator('my_action', { rrSpinner: true });
```

### Add more data to the action object

By default you just pass one paremeter to the action creator and that will be the action payload. If you want to add extra data:

```
const myAction = makeActionCreator('my_action', { rrSpinner: true });

myAction('foo', {
	more: data
})

/*
{
	type: 'MY_ACTION',
	payload: 'foo',
	more: data
}
*/
```

