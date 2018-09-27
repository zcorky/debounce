export interface Cancelable {
  cancel(): void
}

export interface Fn {
  (...args: any[]): any
}
export interface Debounce {
  (fn: Fn, wait?: number, immediate?: boolean): Fn & Cancelable
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will called after it stops being called for
 * N millisenconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'cancel'
 * that is a function which will cancel the timer to prevent previously scheduled executions.
 *
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @see https://github.com/component/debounce/blob/master/index.js
 * @see https://github.com/mqyqingfeng/Blog/issues/22
 *
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (default: 250)
 * @param {Boolean} whether to execute at the beginning (default: false)
 * @return {Function} function with cancel
 */
export const debounce: Debounce = (fn, wait = 250, immediate = false) => {
  let timeout: NodeJS.Timer | null;
  let result;

  const debounced: Fn = function (...args: any[]) {
    const context = this;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => { timeout = null }, wait);
      if (callNow) result = fn.apply(context, args);
    } else {
      timeout = setTimeout(() => fn.apply(context, args), wait);
    }

    return result;
  };

  (debounced as Fn & Cancelable).cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced as Fn & Cancelable;
};

export default debounce;
