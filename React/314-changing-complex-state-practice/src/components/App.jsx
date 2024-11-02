import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleOnChange(event){
    const {value, name} = event.target;

    setContact((prevValue) => {
      if(name === 'fName'){
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email
        }
      }
      else if(name === 'lName'){
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email
        }
      }
      else {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value
        }
      }
    })
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <p></p>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleOnChange} value={fName}/>
        <input name="lName" placeholder="Last Name" onChange={handleOnChange} value={lName}/>
        <input name="email" placeholder="Email" onChange={handleOnChange} value={email}/>
        <button>Submit</button>
      </form>
    </div>
  );
}
 
export default App;
