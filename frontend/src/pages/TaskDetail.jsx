import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import searchImg from "../images/search.jpeg"; 
import { useEffect } from "react";
import {fetchTasks} from "../redux/taskSlice"

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks]);

  //  loading first
  if (loading || !tasks) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Loading...</p>;
  }

  // 
  const task = tasks.find((t) => String(t._id) === String(id));

  // Only show  AFTER loading
  if (!task) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Task not found!</p>;
  }

  return (
    <PageContainer>
      <Background>
        <img src={searchImg} alt="background" />
        <Overlay />
      </Background>

      <Content>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <TaskTitle>Title: {task.title}</TaskTitle>
            <TaskDetails>
              {task.details || "No details available."}
            </TaskDetails>
          </Card>
        </motion.div>
      </Content>
    </PageContainer>
  );
}

// Styled components
const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5);
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 30px 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
`;

const TaskTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const TaskDetails = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;