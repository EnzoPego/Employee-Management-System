import { Link } from "react-router-dom"


export const Category = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Cateory List</h3>
      </div>
      <Link to= "/dashboard/add_category" className="btn btn-success">Add Category</Link>
    </div>
  )
}

