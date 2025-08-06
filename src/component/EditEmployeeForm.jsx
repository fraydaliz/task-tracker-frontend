import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "employee";

export const EditEmployeeForm = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [editEmployee, setEdit] = useState({
    name: "",
    department: "",
    role: "",
  });

  const formHandler = (event) => {
 

    const temp = {
      name: editEmployee.name,
      department: editEmployee.department,
      role: editEmployee.role,
    };

    temp[event.target.name] = event.target.value;

    setEdit(temp);
  };

  const getEmployeeById = async () => {
    const { employee_id } = params;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = "employee";
    const url = `${baseUrl}${endPoint}/${employee_id}`;
    const token = localStorage.getItem("token");
    const result = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const employee_id = params.employee_id;

    const url = `${baseUrl}${endPoint}/${employee_id}`;

    const token = localStorage.getItem("token");

    const result = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(editEmployee),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });

    const data = await result.json();
    navigate("/employee");
  };
   useEffect(() => {
        getEmployeeById()
    }, [])

  return (
    <>
      <h1>Edit Employee</h1>

      <main className="container ml-2 mr-2 mb-5">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              onChange={formHandler}
              type="text"
              className="form-control"
              value={editEmployee.name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              onChange={formHandler}
              type="text"
              className="form-control"
              value={editEmployee.department}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              name="role"
              onChange={formHandler}
              type="text"
              className="form-control"
              value={editEmployee.role}
            />
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </main>
    </>
  );
};
