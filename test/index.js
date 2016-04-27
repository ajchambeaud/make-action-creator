/* global describe, it */

import { expect } from 'chai';
import makeActionCreator from '../src/index';

describe('makeActionCreator', () => {
  it('should return an action creator function', () => {
    const actionPrefixType = 'my_action';
    const actionCreator = makeActionCreator(actionPrefixType);

    expect(actionCreator).to.be.a('function');
  });

  it('should return an action object when action creator is called', () => {
    const actionPrefixType = 'my_action';
    const actionCreator = makeActionCreator(actionPrefixType);

    expect(actionCreator('foo')).to.deep.equal({
      type: 'MY_ACTION',
      payload: 'foo'
    });
  });
});
