import axiosApi from "../../utils/axiosApi";

export const getAllUsers = async () => {
  return axiosApi
    .get("http://localhost:8000/api/user/getAll")
    .then((response) => response.data.users)
    .catch((error) => console.error("Error fetching users:", error));
};

export const getAllTimeEntries = async () => {
  return axiosApi
    .get("http://localhost:8000/api/timeEntry/getAll")
    .then((response) => response.data.timeEntries)
    .catch((error) => console.error("Error fetching time entries:", error));
};
