import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/taskSlice";

export default function TaskModal({ task, onClose }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [details, setDetails] = useState("");

 
  useEffect(() => {
    if (task) {
      setEditText(task.title || "");
      setDetails(task.details || "");
      setIsEditing(false);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    if (!editText.trim()) return;

    dispatch(
      editTask({
        id: task._id,
        title: editText,
        details: details,
      })
    );

    setIsEditing(false);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✖</CloseBtn>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isEditing ? (
            <>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Title"
              />

              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Details"
              />

              <SaveBtn onClick={handleSave}>Save</SaveBtn>
            </>
          ) : (
            <>
              <TaskTitle>{task.title}</TaskTitle>

              <TaskDetails>
                {task.details || "No details available."}
              </TaskDetails>

              <EditBtn onClick={() => setIsEditing(true)}>
                Edit
              </EditBtn>
            </>
          )}
        </motion.div>
      </ModalCard>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  color: #fff;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: transparent;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const TaskTitle = styled.h2`
  margin-bottom: 15px;
`;

const TaskDetails = styled.p`
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  border: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  border: none;
`;

const EditBtn = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #286b70;
  color: white;
  border: none;
  cursor: pointer;
`;

const SaveBtn = styled(EditBtn)``;