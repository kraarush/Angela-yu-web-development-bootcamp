import React, { useState } from "react";

function App() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  function updateTime(){
    setTime(new Date().toLocaleTimeString());
  }

  function everySec(){
    let everySecond = setInterval(updateTime, 1000);
    setTimeout(() => clearInterval(everySecond),60000);
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

//Challenge:
//1. Given that you can get the current time using:

//Show the latest time in the <h1> when the Get Time button
//is pressed.

//2. Given that you can get code to be called every second
//using the setInterval method.
//Can you get the time in your <h1> to update every second?

//e.g. uncomment the code below to see Hey printed every second.
// function sayHi() {
//   console.log("Hey");
// }
// setInterval(sayHi, 1000);