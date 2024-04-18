import * as courseDao from './dao.js';

// let currentUser = null;

export default function courseRoutes(app) {
    const createCourse = async (req, res) => {
        try {
            const course = await courseDao.createCourse(req.body)
            res.json(course);
        } catch (error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({ message: error.message }); // 409 Conflict
            }
            res.status(500).json({ message: "Internal server error" });
        } 
    };
    const findAllCourses = async (req, res) => {
        const {sem} = req.query;
        try {
            let courses;
            if (sem) {
                courses = await courseDao.findCoursesBySem(sem);
            } else {
                courses = await courseDao.findAllCourses();
            }
            res.json(courses);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    const findCourseById = async (req, res) => {
        try {
            const course = await courseDao.findCourseById(req.params.courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.json(course);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        try {
            const updatedCourse = await courseDao.updateCourse(courseId, req.body);
            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    const deleteCourse = async (req, res) => {
        const status = await courseDao.deleteCourse(req.params.courseId)
        res.json(status);
    };

    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById);
    app.put("/api/courses/:courseId", updateCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
}