import React from 'react'
import "./signup.css"
import { RxCross2 } from "react-icons/rx";

function Signup() {
  return (
    <div className="signupform">
        <div className='top'>
            <h2>Sign up</h2>
            <div className='icon'><RxCross2/></div>
        </div>
        <form action="submit">
            <input className='inputsign' type="text" placeholder='Email'/>
            <input className='inputsign' type="text" placeholder='Full Name'/>
            <input className='inputsign' type="password" placeholder='Password' />
        </form>
        <button className='btnsign'>Create Account</button>
        <h3>Already have an account? Login here</h3>
    </div>
  )
}

export default Signup