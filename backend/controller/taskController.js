const Task = require("../model/taskModel");

//get tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.status(200).json(tasks);     
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add task
const addTask = async (req, res) => {
  try {
    const { title, details } = req.body; 
    const newTask = await Task.create({ title, details }); 
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit task
const editTask = async (req, res) => {
  try {
    const { title, details } = req.body; 
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, details }, 
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports={addTask,deleteTask,getTasks,editTask}