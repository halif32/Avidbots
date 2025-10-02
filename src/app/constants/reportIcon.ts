import { useState, useEffect } from 'react';
import { reportStatus } from './reportStatus';

const useResultIcon = (status: string) => {
  const [iconShape, setIconShape] = useState('circle');
  const [boxColour, setBoxColour] = useState('');

  useEffect(() => {
    if (status === reportStatus.success) {
      setIconShape('check');
      setBoxColour('#29E4AC');
    } else if (status === reportStatus.partial) {
      setIconShape('alert-triangle');
      setBoxColour('#E16E2F');
    } else if (status === reportStatus.avidbots_cancelled) {
      setIconShape('x');
      setBoxColour('#6D6A6A');
    } else if (status === reportStatus.operator_cancelled) {
      setIconShape('user-x');
      setBoxColour('#B7BAC3');
    } else {
      // Handle other cases or set defaults
    }
  }, [status]);

  return { iconShape, boxColour };
};

export default useResultIcon;
