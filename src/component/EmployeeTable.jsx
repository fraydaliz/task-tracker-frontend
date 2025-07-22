import React from "react";

import { useEffect, useState } from "react";

const baseUrl = "http://18.233.157.62:3000/api/";
const endPoint = "employee";

export const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const getEmployee = async () => {
    const url = baseUrl + endPoint
    const result = await fetch(url);
    const data = await result.json();
    setEmployeeData(data);
  };

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
          </tr>
        </thead>

        <tbody>
          {employeeData.map((item) => (
            <tr key={item.employee_id}>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
