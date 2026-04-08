import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import TaskItem from "../components/TaskItem";
import { fetchTasks } from "../redux/taskSlice";
import TaskModal from "../modal/TaskModal";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  // Fetch tasks
  useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter tasks
  let filteredTask = tasks.filter((task) =>
    task.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Sort tasks
  filteredTask = filteredTask.sort((a, b) => {
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    if (sortBy === "date-new") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "date-old") return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <>
      <SearchSortContainer ref={dropdownRef}>
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
        <DropdownIcon open={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />

        {dropdownOpen && (
          <Dropdown>
            <DropdownItem
              onClick={() => {
                setSortBy("title-asc");
                setDropdownOpen(false);
              }}
            >
              Title: A-Z
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setSortBy("title-desc");
                setDropdownOpen(false);
              }}
            >
              Title: Z-A
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setSortBy("date-new");
                setDropdownOpen(false);
              }}
            >
              Date: Newest
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setSortBy("date-old");
                setDropdownOpen(false);
              }}
            >
              Date: Oldest
            </DropdownItem>
          </Dropdown>
        )}
      </SearchSortContainer>

      <ul>
       <ScrollableTaskList>
        {filteredTask.length > 0 ? (
          filteredTask.map((task) => <TaskItem key={task._id} task={task} onClick={setSelectedTask} />)
        ) : (
          <p>No tasks yet!</p>
        )}
       </ScrollableTaskList>

        
      </ul>

      <TaskModal
  task={selectedTask}
  onClose={() => setSelectedTask(null)}
/>
    </>
  );
}

const SearchSortContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  max-width: 400px;
`;

// Search input
const SearchInput = styled.input`
  flex: 1;
  padding: 10px 40px 10px 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

// Search icon
const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
`;

// Dropdown arrow icon
const DropdownIcon = styled(FaCaretDown)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(${(props) => (props.open ? "180deg" : "0deg")});
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: transform 0.2s ease;
`;

// Dropdown menu
const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

// Dropdown item
const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
const ScrollableTaskList = styled.ul`
  max-height: 400px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  margin-left: -30px; /* shift left by 20px */
  list-style: none;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
