const mongoose = require("mongoose");

// Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    details: {
       type: String,
       default: "" 
      },
    completed: {
      type: Boolean,
      default: false, 
    }
  },
  {
    timestamps: true 
  }
);


module.exports = mongoose.model("Task", taskSchema);