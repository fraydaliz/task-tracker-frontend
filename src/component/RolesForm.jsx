import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "tasks";

export const RolesForm = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState({
    employee_id,
    description: "",
    status: "Pending",
  });

  const formHandler = (event) => {
    const { name, value } = event.target;
    setTasks((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const url = `${baseUrl}${endPoint}`;
    const token = localStorage.getItem("token")

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(tasks),
        headers: { "Content-Type": "application/json",
           Authorization: token
         },
        
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to submit task");
      }
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  const returnHandler = () => {
    navigate("/employee");
  };

  return (
    <main>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            onChange={formHandler}
            className="form-control"
            rows={3}
            value={tasks.description}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            onChange={formHandler}
            className="form-select"
            value={tasks.status}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>

      <button className="btn btn-warning mt-3 w-100" onClick={returnHandler}>
        Return
      </button>
    </main>
  );
};
