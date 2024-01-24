import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export const Employee = () => {

  const [employee, setEmployee] = useState([])

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/employee");
        setEmployee(response.data)
        console.log(response.data)
      } catch (error) {
        console.log("Error fetching employee data:", error)
      }
    };
    getEmployee()
  }, []);


  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3"></div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><img className="rounded-circle " src={`http://localhost:3000/Images/${e.image}`} alt="employee image"
                  style={{ width: "50px", height: "50px" }}/></td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>US$ {e.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className="btn btn-info btn-sm mx-1 mt-1">Edit</Link>
                    <button className="btn btn-danger btn-sm mx-1 mt-1">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
