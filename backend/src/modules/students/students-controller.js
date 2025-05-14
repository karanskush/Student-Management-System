const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);
    res.status(200).json({
        status: "success",
        students: students
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const result = await addNewStudent(req.body);
    res.status(201).json({
        status: "success",
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const result = await updateStudent(req.body);
    res.status(200).json({
        status: "success",
        message: result.message
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.status(200).json({
        status: "success",
        ...student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const result = await setStudentStatus({
        userId: req.params.id,
        reviewerId: req.user.id,
        status: req.body.status
    });
    res.status(200).json({
        status: "success",
        message: result.message
    });
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const result = await deleteStudent(req.params.id);
    res.status(200).json({
        status: "success",
        message: result.message
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
