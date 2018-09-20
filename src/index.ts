export interface RFunction {
  (...args: any[]): void
}

export interface Debounce {
  (fn: Function, wait: number): RFunction // @TODO TS: Function connot assign to (...args: any[]) => void
}

export const debounce: Debounce = (fn, wait) => {
  let timeout: NodeJS.Timer;

  return function(...args: any[]) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
};

export default debounce;
