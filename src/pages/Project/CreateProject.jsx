import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosApi from "../../utils/axiosApi";
import Modal from "../../components/Modal"; // Ensure the path is correct based on your project structure
import { getAllProjects } from "../Project/service";
import { getAllUsers } from "./service";

function CreateProjectForm({ reload }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axiosApi.post("/project/create", data);
      console.log("Project Created:", response.data);
      alert("Project created successfully!");
      reset();
      setModalOpen(false);
      reload();
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project.");
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Create Time Entry</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Project</h2>
          <div>
            <label>Name:</label>
            <input {...register("name", { required: true })} />
            {errors.name && <span>This Field is required</span>}
          </div>
          <div>
            <label>Description:</label>
            <textarea {...register("description", { required: true })} />
            {errors.description && <span>This field is required</span>}
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

export default CreateProjectForm;
