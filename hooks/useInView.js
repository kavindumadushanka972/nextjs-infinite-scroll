import React, { useState, useEffect, useRef } from 'react';

const useInView = () => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver((entries) => {
      setInView(entries[0].isIntersecting);
    });

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return { ref, inView }
};

export default useInView;
