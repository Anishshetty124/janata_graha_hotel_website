import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the window to the top (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the 'pathname' (URL) changes

  return null; // This component doesn't render any HTML
}

export default ScrollToTop;