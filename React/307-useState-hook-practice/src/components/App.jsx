import React, { useState } from "react";

function App() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  function updateTime(){
    setTime(new Date().toLocaleTimeString());
  }

  function everySec(){
    let everySecond = setInterval(updateTime, 1000);
    setTimeout(() => clearInterval(everySecond),60000);     // stops updating time after 60s
  }

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime} >Get Time</button>
      <button onClick={everySec} >Update Time every sec</button>

    </div>
  );
}

export default App;