const pool = require("../db/connection");
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

exports.registerEmployee = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Request body is required" });
        }
        const { name, email, department } = req.body;
        if (!name || !email || !department) {
            return res.status(400).json({
                error: "Name, Email and Department are required"
            });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: "Invalid email format"
            });
        }
        await pool.query(
            "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
            [name, email, department]
        );
        return res.status(201).json({
            message: "Employee registered successfully"
        });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
    }
};
