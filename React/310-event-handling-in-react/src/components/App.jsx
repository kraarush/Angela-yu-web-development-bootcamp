import React, { useState } from "react";

function App() {

  const [heading , setHeading] = useState("Hello");
  const [customCSS, setColor] = useState({backgroundColor: "white"})

  function handleClick(){
    setHeading("Submitted");
  }

  function handleOver(){
    setColor({backgroundColor:"black", color:"white"})
  }

  function handleOut(){
    setColor({backgroundColor:"white"})
  }

  return (
    <div className="container">
      <h1>{heading}</h1>
      <input type="text" placeholder="What's your name?" />
      <button onClick={handleClick} onMouseOver={handleOver} onMouseOut={handleOut} style={customCSS}>Submit</button>
    </div>
  );  
}

export default App;