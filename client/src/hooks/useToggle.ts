import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [show, setShow] = useState(initialState);

  const toggle = useCallback(() => setShow(!show), [show]);

  return { show, toggle };
};

export default useToggle;
