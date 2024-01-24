import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const EditEmployee = () => {

    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    });

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getData = async () => {
          try {
            const result = await axios.get("http://localhost:3000/auth/category");
            setCategories(result.data); 
            console.log(result.data); 
          } catch (error) {
            console.error(error);
          }
        };
        getData();
    }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Add Employee</h3>
      <form className="row g-1">
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
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
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-0"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) =>
              setEmployee({ ...employee, password: e.target.value })
            }
          />
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
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
              setEmployee({ ...employee, category_id: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            className="form-control rounded-0"
            id="inputGroupFile01"
            name="image"
            onChange={(e) =>
              setEmployee({ ...employee, image: e.target.files[0] })
            }
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

