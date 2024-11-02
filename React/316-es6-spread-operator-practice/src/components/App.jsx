import React from "react";
import { useState } from "react";

function App() {

  const [newItem, setNewItem] = useState("");
  const [todoList, setTodoList] = useState([]);

  function handleChange(event){
    setNewItem(event.target.value);
  }

  function handleClick(){
    setTodoList((prevValue) => {
      return [...prevValue,newItem];
    });

    setNewItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={newItem} onChange={handleChange}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todoList.map((item,index) => <li key={index}>{item}</li> )}
        </ul>
      </div>
    </div>
  );
}

export default App;
