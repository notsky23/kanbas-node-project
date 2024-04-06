import db from "../Database/index.js";

function AssignmentRoutes(app) {
    // Assignment - Create
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {...req.body, course: cid, _id: new Date().getTime().toString()};
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // Assignment - Read
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });

    // Assignment - Read Single
    app.get("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find((a) => a._id === aid);
        if (assignment) {
            res.send(assignment);
        } else {
            res.status(404).send({ message: "Assignment not found" });
        }
    });

    // Assignment - Update
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if(assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {...db.assignments[assignmentIndex], ...req.body};
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });

    // Assignment - Delete
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const initialLength = db.assignments.length;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        const newLength = db.assignments.length;
        if(newLength < initialLength) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
}

export default AssignmentRoutes;