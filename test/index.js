/* global describe, it */

import { expect } from 'chai';
import makeActionCreator from '../src/index';
import { begin, end, pendingTask } from 'react-redux-spinner';

describe('makeActionCreator', () => {
  it('should return an action creator function', () => {
    const actionPrefixType = 'my_action';
    const actionCreator = makeActionCreator(actionPrefixType);

    expect(actionCreator).to.be.a('function');
  });

  it('should accept options.rrSpiner flag and when is present adds spinner data to actions start, success and failure', () => {
    const actionPrefixType = 'my_action';
    const actionCreator = makeActionCreator(actionPrefixType, { rrSpinner: true });

    expect(actionCreator.start('foo')).to.deep.equal({
      type: 'MY_ACTION_START',
      payload: 'foo',
      [pendingTask]: begin
    });

    expect(actionCreator.success('foo')).to.deep.equal({
      type: 'MY_ACTION_SUCCESS',
      payload: 'foo',
      [pendingTask]: end
    });

    expect(actionCreator.failure('foo')).to.deep.equal({
      type: 'MY_ACTION_FAILURE',
      payload: 'foo',
      [pendingTask]: end
    });
  });

  describe('actionCreator', () => {
    it('should return an action object wich include the payload and an uppercase type', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator('foo')).to.deep.equal({
        type: 'MY_ACTION',
        payload: 'foo'
      });
    });

    it('should have property `type` equal to the uppercase action type', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.type).to.be.equal('MY_ACTION');
    });

    it('should have method `start` that returns an action with the _START type sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.start).to.be.a('function');
      expect(actionCreator.start('foo')).to.deep.equal({
        type: 'MY_ACTION_START',
        payload: 'foo'
      });
    });

    it('should have property `START` equal to the uppercase action type with the _START sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.START).to.be.equal('MY_ACTION_START');
    });

    it('should have method `success` that returns an action with the _SUCCESS type sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.success).to.be.a('function');
      expect(actionCreator.success('foo')).to.deep.equal({
        type: 'MY_ACTION_SUCCESS',
        payload: 'foo'
      });
    });

    it('should have property `SUCCESS` equal to the uppercase action type with the _SUCCESS sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.SUCCESS).to.be.equal('MY_ACTION_SUCCESS');
    });

    it('should have method `failure` that returns an action with the _FAILURE type sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.failure).to.be.a('function');
      expect(actionCreator.failure('foo')).to.deep.equal({
        type: 'MY_ACTION_FAILURE',
        payload: 'foo'
      });
    });

    it('should have property `FAILURE` equal to the uppercase action type with the _FAILURE sufix', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      expect(actionCreator.FAILURE).to.be.equal('MY_ACTION_FAILURE');
    });

    it('should allow to pass an object with aditional propertys to merge with action object', () => {
      const actionPrefixType = 'my_action';
      const actionCreator = makeActionCreator(actionPrefixType);

      const aditionalFields = {
        foo: 'bar',
        another: 10
      };

      expect(actionCreator('foo', aditionalFields)).to.deep.equal({
        type: 'MY_ACTION',
        payload: 'foo',
        foo: 'bar',
        another: 10
      });

      expect(actionCreator.start('foo', aditionalFields)).to.deep.equal({
        type: 'MY_ACTION_START',
        payload: 'foo',
        foo: 'bar',
        another: 10
      });

      expect(actionCreator.success('foo', aditionalFields)).to.deep.equal({
        type: 'MY_ACTION_SUCCESS',
        payload: 'foo',
        foo: 'bar',
        another: 10
      });

      expect(actionCreator.failure('foo', aditionalFields)).to.deep.equal({
        type: 'MY_ACTION_FAILURE',
        payload: 'foo',
        foo: 'bar',
        another: 10
      });
    });
  });
});
