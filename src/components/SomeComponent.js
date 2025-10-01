import React from 'react';

function SomeComponent() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform operations that require window
      console.log(window.innerWidth);
    }
  }, []);

  return <div>Some Component</div>;
}

export default SomeComponent;
