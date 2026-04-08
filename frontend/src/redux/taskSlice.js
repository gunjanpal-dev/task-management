// redux/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTaskAPI, deleteTaskAPI, fetchTasksAPI, editTaskAPI } from "../api/taskApi";

// Initial state
const initialState = {
  tasks: [],
  fetchStatus: "idle",   // status for fetching tasks
  addStatus: "idle",     // status for adding tasks
  editStatus: "idle",    // status for editing tasks
  deleteStatus: "idle",  // status for deleting tasks
  error: null
};

// Fetch tasks from backend
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await fetchTasksAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ title, details }, thunkAPI) => { 
    try {
      const response = await addTaskAPI({ title, details }); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit a task
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, title, details }, thunkAPI) => { 
    try {
      const response = await editTaskAPI(id, { title, details }); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await deleteTaskAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => { state.fetchStatus = "loading"; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // ADD TASK
      .addCase(addTask.pending, (state) => { state.addStatus = "loading"; })
      .addCase(addTask.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })

      // EDIT TASK
      .addCase(editTask.pending, (state) => { state.editStatus = "loading"; })
      .addCase(editTask.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.tasks = state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(editTask.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload;
      })

      // DELETE TASK
      .addCase(deleteTask.pending, (state) => { state.deleteStatus = "loading"; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  }
});

export default tasksSlice.reducer;