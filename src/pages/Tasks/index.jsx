import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((response) => setTasks(response.data.tasks))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.description}, Duration: {task.durationInHours}{" "}
            hours
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
