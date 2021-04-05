import { useState } from 'react';

export default () => {
  const [option, setOption] = useState('default');
  const updateOption = (e) => {
    setOption(e.target.value);
  };

  return [option, updateOption];
};
