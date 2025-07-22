import React from "react";
import { useState } from "react";

const baseUrl = "http://18.233.157.62:3000/api/";
const endPoint = "employee";

export const EmployeeForm = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    role: "",
  });

  const submitHandler = async (event) => {

event.preventDefault()

    const url = baseUrl + endPoint;
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newEmployee),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await result.json()
    console.log(data)

    window.location.reload()

  };


  
  const handlerName = (event) => {
      newEmployee.name = event.target.value;
};

const handlerDepartment = (event) => {
    newEmployee.department = event.target.value;
};

const handlerRole = (event) => {
    newEmployee.role = event.target.value;
};

return (
    <>
    <h1>Employee Form</h1>
    <main className="container ml-2 mr-2 mb-5">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input onChange={handlerName} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            onChange={handlerDepartment}
            type="text"
            className="form-control"
            />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input onChange={handlerRole} type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  </>
)

};