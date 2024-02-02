interface DebouncedFunction<T extends (...args: any[]) => any> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timer: number;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = window.setTimeout(() => func.apply(this, args), delay);
  };
};
