
import './App.css';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import TaskPage from './pages/TaskPage';
import Parallax from "./pages/Parallax";

// import TaskModal from './modal/TaskModal';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage/>}/>
        {/* <Route path="/task/:id" element={<TaskModal/>}/> */}
        <Route path="/parallax" element={<Parallax/>}/>
      </Routes>
      </BrowserRouter>
      
   
  );
}

export default App;
