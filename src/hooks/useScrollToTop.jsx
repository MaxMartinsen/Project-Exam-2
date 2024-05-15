import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * `useScrollToTop` is a custom React hook that automatically scrolls the window to the top
 * whenever the route changes. This is especially useful in single-page applications (SPAs)
 * where scroll positions can persist across route transitions, leading to a non-intuitive
 * user experience. The hook leverages the `useLocation` hook from `react-router-dom` to
 * detect route changes.
 *
 */

function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}

export default useScrollToTop;
