import React from 'react';
import { isBrowser } from '../utils/browserUtils';

const SomeComponent = () => {
  React.useEffect(() => {
    if (isBrowser()) {
      // Browser-specific side effects
      document.title = 'My App';
    }
  }, []);

  return <div>Some Component</div>;
};

export default SomeComponent;