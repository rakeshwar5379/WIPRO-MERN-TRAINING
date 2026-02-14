const express = require("express");
const morgan = require("morgan");

const requestLogger = require("./student/middleware/requestLogger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();


// Body parsing (User Story 3)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Morgan logging (User Story 4)
app.use(morgan("dev"));


// Custom logging (User Story 1)
app.use(requestLogger);


// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});
app.use("/student", studentRoutes);


// Error handling middleware (User Story 5)
app.use((err, req, res, next) => {

    console.error("Error:", err.message);

    res.status(500).json({
        message: "Something went wrong on the server"
    });

});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});