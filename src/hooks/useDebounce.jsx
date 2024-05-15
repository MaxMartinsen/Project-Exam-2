import { useState, useEffect } from 'react';

/**
 * `useDebounce` hook allows you to debounce any fast changing value.
 * The hook is useful for scenarios like handling input changes in a text field where you want
 * to delay the execution of a function (such as API calls) until the user has stopped typing.
 *
 * @param {any} value - The value that you want to debounce.
 * @param {number} delay - The delay in milliseconds for the debounce period.
 *
 * @returns {any} - The debounced value which updates only after the specified delay
 * once the initial value has stopped changing.
 */

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
