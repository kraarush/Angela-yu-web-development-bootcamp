import React , {useState} from "react";

function App() {
  const [count, setCount] = useState(0);
  const newName = useState(4564);

  console.log(newName);

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={() => setCount(count+1)}>+</button>
      <button onClick={() => setCount(count-1)}>-</button>
    </div>
  );
}

export default App;
