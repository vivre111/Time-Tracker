import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import axiosApi from "../../utils/axiosApi";
import CreateProjectForm from "./CreateProject";
import { getAllProjects } from "./service";

function Project() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const projects = await getAllProjects();
    setProjects(projects);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {
        // create a new project
      }
      <CreateProjectForm reload={fetchData}></CreateProjectForm>
      {
        // display all existing projects
      }
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Project;
