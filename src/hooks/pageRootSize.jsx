import { useLayoutEffect, useState } from 'react';

function useRootSize () {
  const [rootSize, setRootSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateRootSize() {
      setRootSize([document.getElementById("root").offsetWidth, document.getElementById("root").offsetHeight]);
    }
    document.addEventListener('click', updateRootSize);
    updateRootSize();
    return () => document.removeEventListener('click', updateRootSize);
  }, []);
  return rootSize;
};

export default useRootSize;