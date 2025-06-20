// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const resumeRoutes = require("./routes/resumeRoutes");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use("/api/resume", resumeRoutes);

// app.get("/", (req, res) => {
//   res.send("Smart Resume Builder API is running.");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");
const suggestRoutes = require("./routes/suggestRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/saveResume", resumeRoutes);       // ✅ for saving resume
app.use("/api/suggestion", suggestRoutes);  // ✅ for AI suggestions

app.get("/", (req, res) => {
  res.send("Smart Resume Builder API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
