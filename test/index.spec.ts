import * as sinon from 'sinon';
import { expect } from 'chai';

import debounce from '../src';

describe('debounce', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
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
