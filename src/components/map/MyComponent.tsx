import React, { useState } from 'react';
import styles from './MyComponent.module.css'; // Import the CSS module

interface MyComponentProps {
  initialCount?: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.redBox}> {/* Use the CSS module class */}
    <center>
      <h1>RPSU</h1>
      <h1>Central Bus</h1>
    </center>
      {/* <h1>Counter: {count}</h1> */}
      {/* <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button> */}
    </div>
  );
};

export default MyComponent;
