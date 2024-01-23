
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Category = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/category");
        setcategories(result.data); 
        console.log(result.data); 
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Categories List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Category
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
