import React from 'react'
import {useRef} from "react"
function UncontrolledRegistrationForm() {
    const usernameRef = useRef();  // reference variable
     const passwordRef = useRef();
     const handleSubmit =(e) =>
    {
        e.preventDefault();
        alert("Value :"+  usernameRef.current.value)
    }
  return (
   <div>
      <form >  
        <h2> User Registration Form</h2>
        <input ref={usernameRef} />
        <input ref={passwordRef} />
      
        <button onClick= {handleSubmit}> Submit</button>
      </form>
    </div>
  )
}
export default UncontrolledRegistrationForm;