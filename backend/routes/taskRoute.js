const express=require("express");
const { addTask ,deleteTask, getTasks ,editTask} = require("../controller/taskController");
const router=express.Router()

router.get("/", getTasks); 
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);



module.exports=router