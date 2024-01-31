import { useNavigate } from 'react-router-dom'

export const Start = () => {
    
    const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div className="p-3 rounded border loginForm col-10 col-sm-8 col-md-6 col-lg-4 mx-auto" style={{maxWidth: '350px'}}>
      <h2 className="text-center">Login As</h2>
      <div className="d-flex justify-content-between mt-5 mb-2">
        <button className="btn btn-primary"
        onClick={()=>{navigate('/employee_login')}}
        >
        Employee</button>
        <button className="btn btn-success"
        onClick={()=>{navigate('/admin_login')}}
        >
        Admin</button>
      </div>
    </div>                   
  </div>
  )
}