
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";
import { deleteTask } from "../redux/taskSlice";

export default function TaskItem({ task, onClick }) {
  const dispatch = useDispatch();

  return (
    <TaskLi
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      onClick={() => {
        onClick(task); // open modal
      }}
    >
      <Title>{task.title}</Title>
     <DeleteBtn onClick={(e) => { e.stopPropagation(); dispatch(deleteTask(task._id)); }}>Delete</DeleteBtn>
    </TaskLi>
  );
}
// Task container
const TaskLi = styled(motion.li)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

// Task title
const Title = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  word-break: break-word;
`;

// Base button
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
  white-space: nowrap;
`;

// Delete button
const DeleteBtn = styled(Button)`
  background: #fff;
  color: black;

  &:hover {
    background: #111;
    color: white;
  }
`;