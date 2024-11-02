import React from "react";
import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [isClicked, setClick] = useState(false);

  function handleOnChange(event){
    setClick(false);
    setName(event.target.value);
  }

  function handleOnClick(){
    setClick(true);
  }

  return (
    <div className="container">
      <h1>Hello {isClicked && ", " + name}</h1>
      <input type="text" placeholder="What's your name?" onChange={handleOnChange} value={name}/>
      <button onClick={handleOnClick}>Submit</button>
    </div>
  );
}

export default App;