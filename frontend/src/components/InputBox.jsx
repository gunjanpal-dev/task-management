import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";
import { addTask } from "../redux/taskSlice";

export default function InputBox() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState(""); // ✅ new state for details
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title, details })); // ✅ send both title & details
    setTitle("");
    setDetails("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <Textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Enter task details"
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

// Styled components
const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  resize: vertical;
  min-height: 60px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: #286b70;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1f5257;
  }
`;