const express = require("express");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();

app.use(express.json());
app.use("/api/employee", employeeRoutes);
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
