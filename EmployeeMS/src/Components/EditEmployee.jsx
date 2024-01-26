import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  //console.log("ID:", id);

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/category");
        setCategories(result.data);
        //console.log(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();

    const dataEmployee = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/auth/employee/${id}`
        );
        //console.log(result);
        setEmployee({
          ...employee,
          name: result.data[0].name,
          email: result.data[0].email,
          salary: result.data[0].salary,
          address: result.data[0].address,
        });
      } catch (error) {
        console.log(error);
      }
    };

    dataEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee);
      //console.log(response.data)
      if (response.data.affectedRows === 1) {
        navigate('/dashboard/employee')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value || null })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
