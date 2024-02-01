import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    const result = await axios.get("http://localhost:3000/verify");
    console.log(result);
    try {
      if (result.data.Status) {
        const { role, id } = result.data;
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate(`/employee_detail/${id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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