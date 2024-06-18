import React from 'react'
import "../signup/signup.css"
import { RxCross2 } from "react-icons/rx";

function Login() {
  return (
    <div className="signupform">
        <div className='top'>
            <h2>Log in</h2>
            <div className='icon'><RxCross2/></div>
        </div>
        <form action="submit">
            <input className='inputsign' type="text" placeholder='Full Name'/>
            <input className='inputsign' type="password" placeholder='Password' />
        </form>
        <button className='btnsign'>Log in</button>
        <h3>Don't have an account? Create here</h3>
    </div>
  )
}

export default Login