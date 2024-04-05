import Database from "../Database/index.js";

export default function CourseRoutes(app) {
    // Create
    app.post("/api/courses", (req, res) => {
        const course = { _id: new Date().getTime().toString(), ...req.body };
        Database.courses.push(course);
        res.send(course);
    });
    
    // Retrieve
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id === id);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(course);
    });
    
    // Update
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
          c._id === id ? { ...c, ...course } : c
        );
        res.sendStatus(204);
      });    

    // Delete
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });
    
}
