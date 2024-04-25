import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosApi from "../../utils/axiosApi";
import Modal from "../../components/Modal"; // Ensure the path is correct based on your project structure
import { getAllProjects } from "../Project/service";
import { getAllUsers } from "./service";

// modify each project by adding totalDurationHours to it.
export const calculateTotalHour = (projectData) => {
  let totalSum = 0;
  for (const projectDataEle of projectData) {
    let sum = 0;
    for (const timeEntry of projectDataEle.timeEntries) {
      sum += parseInt(timeEntry.durationInHours);
      totalSum += parseInt(timeEntry.durationInHours);
    }
    projectDataEle.totalDurationHours = sum;
  }
  return totalSum;
};

function TimeEntryForm({ reload }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      startAt: new Date().toISOString().slice(0, 16), // Default datetime in local format
    },
  });
  const [isModalOpen, setModalOpen] = useState(false);

  // used for <Select/>
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [projects, users] = await Promise.all([
        getAllProjects(),
        getAllUsers(),
      ]);
      setProjects(projects);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosApi.post("/timeEntry/create", data);
      console.log("Time Entry Created:", response.data);
      alert("Time entry created successfully!");
      reset();
      setModalOpen(false);
      reload();
    } catch (error) {
      console.error("Failed to create time entry:", error);
      alert("Failed to create time entry.");
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Create Time Entry</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Time Entry</h2>
          <div>
            <label>Project:</label>
            <select {...register("projectId", { required: true })}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.projectId && <span>This field is required</span>}
          </div>
          <div>
            <label>User:</label>
            <select {...register("userId", { required: true })}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            {errors.userId && <span>This field is required</span>}
          </div>
          <div>
            <label>Hours (e.g., 3):</label>
            <input
              {...register("durationInHours", {
                required: true,
                validate: (value) => {
                  const number = parseInt(value, 10);
                  return (
                    !isNaN(number) &&
                    number >= 0 &&
                    number === parseFloat(value)
                  );
                },
              })}
            />
            {errors.durationInHours && <span>Please enter an integer</span>}
          </div>
          <div>
            <label>Description:</label>
            <textarea {...register("description", { required: true })} />
            {errors.description && <span>This field is required</span>}
          </div>
          <div>
            <label>Start At:</label>
            <input
              type="datetime-local"
              {...register("startAt", { required: true })}
            />
            {errors.startAt && <span>This field is required</span>}
          </div>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </>
  );
}

export default TimeEntryForm;
