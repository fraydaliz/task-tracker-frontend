import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "tasks";
const endPoint2 = "employee";

export const RolesTables = () => {
  const { employee_id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState({});

  const getTasks = async () => {
    const url = `${baseUrl}${endPoint}/${employee_id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        headers: { Authorization: token },
      });
      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const getEmployee = async () => {
    const url = `${baseUrl}${endPoint2}/${employee_id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setEmployee(data[0] || {});
    } catch (err) {
      console.error("Failed to fetch employee:", err);
    }
  };

  const deleteTask = async (id) => {
    const url = `${baseUrl}${endPoint}/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.task_id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    getTasks();
    getEmployee();
  }, [employee_id]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th colSpan={3}>{employee.name ?? "Employee"}</th>
        </tr>
        <tr>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center text-muted">
              No tasks found.
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task?.description?.trim() || "—"}</td>
              <td>{task?.status || "—"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.task_id)}
                >
                  <i className="bi bi-file-earmark-minus" /> Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
