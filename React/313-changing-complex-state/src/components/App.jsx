import React, { useState } from "react";

function App() {

  let [fullName, setFullName] = useState({
    fname: "",
    lname: ""
  });

  function updateFullName(event){
    const {value, name} = event.target;

    setFullName((prevValue) => {
      if(name === 'fName'){
        return {
          fname: value,
          lname: prevValue.lname
        }
      }
      else{
        return {
          fname: prevValue.fname,
          lname: value
        }
      }
    })
  }

  return (
    <div className="container">
      <h1>Hello {fullName.fname} {fullName.lname}</h1>
      <form>
        <input name="fName" placeholder="First Name" value={fullName.fname} onChange={updateFullName} />
        <input name="lName" placeholder="Last Name" value={fullName.lname} onChange={updateFullName} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
