export interface Cancelable {
  cancel(): void
}

export interface Fn {
  (...args: any[]): any
}
export interface Debounce {
  (fn: Fn, wait?: number, immediate?: boolean): Fn & Cancelable
}

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
