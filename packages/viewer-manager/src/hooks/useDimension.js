import { useRef, useState, useEffect } from 'react';

const useDimension = (ref) => {
  const resizeObserverRef = useRef();

  const [dimensions, setdDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries = []) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        setdDimensions({ width, height });
      });
    });

    if (ref.current) {
      resizeObserverRef.current.observe(ref.current);
    }

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [ref]);

  return dimensions;
};

export default useDimension;
