// src/api/tasksAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/tasks";

export const fetchTasksAPI = () => axios.get(BASE_URL);
export const addTaskAPI = ({title,details}) => axios.post(BASE_URL, { title,details });
// export const editTaskAPI = (id, title) => { axios.put(`${BASE_URL}/${id}`, { title });};
export const editTaskAPI = (id, {title,details}) => {
  return axios.put(`${BASE_URL}/${id}`, { title ,details});
};

export const deleteTaskAPI = (id) => axios.delete(`${BASE_URL}/${id}`);