import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Search.module.css";
import searchImg from "../images/search.jpeg";
import InputBox from "../components/InputBox";
import TaskList from "../components/TaskList";

export default function TaskPage() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);
  

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <motion.div className={styles.background} style={{ y: bgY }}>
        <img src={searchImg} alt="background" />
      </motion.div>

      <div className={styles.overlay}></div>

      {/* Main content with 3 equal sections */}
      <div className={styles.content}>
        <div className={styles.section}>
          <h1>MiniTasker</h1>
          <p>Organize your thoughts. Track your tasks.</p>
        </div>

        <div className={styles.section}>
          <h2>Add New Task</h2>
          <InputBox/>
        </div>

        <div className={styles.section}>
          <h2>Your Tasks</h2>
          
          <TaskList/>
        </div>
      </div>
    </div>
  );
}