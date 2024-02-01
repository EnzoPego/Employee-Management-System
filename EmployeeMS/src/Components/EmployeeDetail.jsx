import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EmployeeDetail = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getEmployee()
    },[])

    const getEmployee = async()=> {
        const response = await axios.get(`http://localhost:3000/employee/detail/${id}`)
        console.log(response.data)
        try {
            setEmployee(response.data[0])
            
        } catch (error) {
            console.log(error)            
        }
    }

    const handleLogout = async () => {
        try {
          const response = await axios.get('http://localhost:3000/employee/logout')
          console.log(response)
          if(response.data.Status) {
            localStorage.removeItem('valid')
            navigate('/')
          }      
        } catch (error) {
          console.log(error)      
        }
    }

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/${employee.image}`}
            alt={employee.name}
            className="rounded-pill"        
            />
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: ${employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-danger'
                onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
    </div>
  )
}