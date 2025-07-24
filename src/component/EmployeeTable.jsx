import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "employee";

export const EmployeeTable = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState([]);

  const getEmployee = async () => {
    const url = baseUrl + endPoint;
    const result = await fetch(url);
    const data = await result.json();
    setEmployeeData(data);
  };

  const handleEdit = (id) => {
    navigate(`/editEmployee/${id}`);
  };

  const handleDelete = async (id) => {
    const url = `${baseUrl}${endPoint}/${id}`;
    const result = await fetch(url, {
      method: "DELETE",
    });

    const data = await result.json();
    window.location.reload()
  };

  const roleHandler = (id)=>{
     navigate(`/tasks/${id}`);
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <>
      <h1>Employee Data</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employeeData.map((item) => (
            <tr key={item.employee_id}>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.role}</td>
              <td>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => handleEdit(item.employee_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.employee_id)}
                >
                  Delate
                </button>
                  <button
                  className="btn btn-info m-1"
                  onClick={() => roleHandler(item.employee_id)}
                >
                  Roles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
