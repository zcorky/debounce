import * as sinon from 'sinon';
import { expect } from 'chai';

import debounce, { Fn, Cancelable } from '../src';

describe('debounce', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should debounce with default timeout(250ms)', () => {
    const callback = sinon.spy();

    const fn = debounce(callback);

    setTimeout(fn, 0);
    setTimeout(fn, 50);
    setTimeout(fn, 100);
    setTimeout(fn, 351);

    clock.tick(351);

    expect(callback.callCount).to.equal(1);
  });

  it('should debounce with fast timeout', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 200);
    setTimeout(fn, 250);

    clock.tick(350);

    expect(callback.callCount).to.equal(1);
  });

  it('should debounce twice with fast timeout', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 251);

    clock.tick(351);

    expect(callback.callCount).to.equal(2);
  });

  it('should not execute prior to timeout', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);

    clock.tick(175);

    expect(callback.callCount).to.equal(0);
  });
});

describe('debounce immediate', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should debounce with fast timeout', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 200);
    setTimeout(fn, 250);

    clock.tick(350);

    expect(callback.callCount).to.equal(1);
  });

  it('should debounce twice with fast timeout', () => {
    const callback = sinon.spy();

    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 251);

    clock.tick(351);

    expect(callback.callCount).to.equal(2);
  });

  it('should execute prior to timeout', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);

    clock.tick(175);

    expect(callback.callCount).to.equal(1);
  });
});

describe('debounce, then cancel', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('cancel before timeout', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100);

    setTimeout(fn, 0);
    setTimeout(() => (fn as Fn & Cancelable).cancel(), 50);

    clock.tick(150)

    expect(callback.callCount).to.equal(0);
  });

  it('cancel after timeout', () => {
    const callback = sinon.spy();
    const fn = debounce(callback, 100);

    setTimeout(fn, 0);
    setTimeout(() => (fn as Fn & Cancelable).cancel(), 110);

    clock.tick(150)

    expect(callback.callCount).to.equal(1);
  });
});
