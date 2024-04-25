import axiosApi from "../../utils/axiosApi";

export const getAllProjects = async () => {
  return axiosApi
    .get("http://localhost:8000/api/project/getAll")
    .then((response) => {
      console.log(response);
      return response.data.projects;
    })
    .catch((error) => console.error("Error fetching projects:", error));
};
