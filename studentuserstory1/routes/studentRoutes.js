const express = require("express");
const router = express.Router();

const validateStudent = require("../middleware/validateStudent");

router.post("/", validateStudent, (req, res) => {

    res.json({
        success: true,
        message: "student data accepted",
        data: req.body
    });

});

router.get("/error", (req, res) => {
    throw new Error("Unexpected Failure");
});

module.exports = router;