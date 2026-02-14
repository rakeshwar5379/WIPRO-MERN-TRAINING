const sequelize =require("../db/connection.js");
const Course = require("./Course.js");
const Instructor = require("./instructor.js");
const Enrollment = require("./enrollment.js");
const Studentss = require("./students.js");
Instructor.hasMany(Course)
Course.belongsTo(Instructor)
Studentss.belongsToMany(Course,{through:Enrollment})
Course.belongsToMany(Studentss,{through:Enrollment})
module.exports={sequelize,Course,Instructor,Studentss,Enrollment};