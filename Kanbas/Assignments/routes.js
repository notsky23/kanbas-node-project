import * as assignmentDao from './dao.js';

// let currentUser = null;

export default function assignmentRoutes(app) {
    const createAssignment = async (req, res) => {
        try {
            const assignmentData = { ...req.body, course: req.params.cid };
            const assignment = await assignmentDao.createAssignment(assignmentData)
            res.json(assignment);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        } 
    };
    const findAllAssignments = async (req, res) => {
        try {
            const courseId = req.params.cid;
            if (!courseId) {
                return res.status(400).json({ message: "Course ID is missing." });
            }
            const assignments = await assignmentDao.findAllAssignmentsByCourse(req.params.cid);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const findAssignmentById = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const assignmentId = req.params.aid;
            const assignment = await assignmentDao.findAssignmentById(courseId, assignmentId);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }
            res.json(assignment);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    const updateAssignment = async (req, res) => {
        try {
            const updatedAssignment = await assignmentDao.updateAssignment(req.params.aid, req.body);
            if (!updatedAssignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }
            res.json(updatedAssignment);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const deleteAssignment = async (req, res) => {
        const status = await assignmentDao.deleteAssignment(req.params.aid)
        res.json(status);
    };

    app.post("/api/courses/:cid/assignments", createAssignment);
    app.get("/api/courses/:cid/assignments", findAllAssignments);
    app.get("/api/courses/:cid/assignments/:aid", findAssignmentById);
    app.put("/api/assignments/:aid", updateAssignment);
    app.delete("/api/assignments/:aid", deleteAssignment);
}