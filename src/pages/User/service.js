import axiosApi from "../../utils/axiosApi";

export const getAllUsers = async () => {
  return axiosApi
    .get("http://localhost:8000/api/user/getAll")
    .then((response) => response.data.users)
    .catch((error) => console.error("Error fetching users:", error));
};

export const getUserProjectData = async () => {
  return axiosApi
    .get("http://localhost:8000/api/user/projectData")
    .then((response) => response.data.userProjectData)
    .catch((error) => console.error("Error fetching users:", error));
};
