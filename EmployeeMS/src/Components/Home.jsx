import axios from 'axios'
import { useEffect, useState } from "react"


export const Home = () => {

  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])
   
  useEffect(()=>{
    adminCount()
    employeeCount()
    salatyCount()
    adminRecords()
  },[])

  const adminRecords = async() => {
    try {
      const response = await axios.get('http://localhost:3000/auth/admin_records')
      //console.log(response.data[0])
      if(response.data[0]){
        setAdmins(response.data)
      }
    } catch (error) {
      console.log(error)
    }

  } 

  const adminCount = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/auth/admin_count')
      //console.log(response.data[0].admin)
       if(response.data[0].admin) {
         setAdminTotal(response.data[0].admin)
        }
    } catch (error) {
      console.log(error)
    }
  }  
  
  const employeeCount = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/auth/employee_count')
      //console.log(response.data[0].employee)
       if(response.data[0].employee) {
         setEmployeeTotal(response.data[0].employee)
        }
    } catch (error) {
      console.log(error)
    }
  }  
  
  const salatyCount = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/auth/salary_count')
      //console.log(response.data[0].salary)
       if(response.data[0].salary ) {
        setSalaryTotal(response.data[0].salary)
        }
    } catch (error) {
      console.log(error)
    }
  }  


  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: {adminTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: {employeeTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: US$ {salaryTotal}</h5>
        </div>
      </div>
    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            admins.map(a =>(
              <tr key={a.id}>
                <td>{a.email}</td>

                  <td>
                    <button className="btn btn-info btn-sm mx-1 mt-1">Edit</button>
                    <button className="btn btn-danger btn-sm mx-1 mt-1"
                    >Delete</button>
                  </td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  )
}

