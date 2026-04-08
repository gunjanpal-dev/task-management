const express=require ("express")
const cors=require("cors")
const connectDb=require("./config/db")
const dotenv=require("dotenv")
const taskRoutes=require("./routes/taskRoute")

dotenv.config(); // ✅ load env FIRST

const app = express();

// Connect DB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
})