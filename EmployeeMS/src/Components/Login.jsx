import axios from 'axios'
import { useState } from 'react';
import './style.css'

export const Logoin = () => {

  const [values, seteValues] = useState({
    email:'',
    password:''
  })

  const handleSubmit =(e)=>{
    e.preventDefault()
    //console.log(values)
    axios.post('http://localhost:3000/auth/adminlogin',values)
    .then(result => console.log(result))  
    .catch(err => console.log(err))
  }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border loginForm col-10 col-sm-8 col-md-6 col-lg-4 mx-auto" style={{maxWidth: '400px'}}>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><strong>Email</strong></label>
          <input type="text" id='email' name='email' autoComplete="off" placeholder="Enter Email" className="form-control rounded-0"
          onChange={(e)=>seteValues({...values, email: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong>Password</strong></label>
          <input type="password" id='password' name='password' placeholder="Enter Password" className="form-control rounded-0"
          onChange={(e)=>seteValues({...values, password: e.target.value })} />
        </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">Log in</button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className='me-2' />
            <label htmlFor="password">You are Agree with terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};
