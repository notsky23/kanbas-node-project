import * as quizDao from './dao.js';

// let currentUser = null;

export default function quizRoutes(app) {
    const createQuiz = async (req, res) => {
        try {
            const quizData = { ...req.body, course: req.params.cid };
            const quiz = await quizDao.createQuiz(quizData)
            res.json(quiz);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        } 
    };
    const findAllQuizzes = async (req, res) => {
        try {
            const courseId = req.params.cid;
            if (!courseId) {
                return res.status(400).json({ message: "Course ID is missing." });
            }
            const quizzes = await quizDao.findAllQuizzesByCourse(req.params.cid);
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const findQuizById = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const quizId = req.params.qid;
            console.log("Course ID:", courseId, "Quiz ID:", quizId);
            const quiz = await quizDao.findQuizById(courseId, quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }
            res.json(quiz);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    const updateQuiz = async (req, res) => {
        try {
            const updatedQuiz = await quizDao.updateQuiz(req.params.qid, req.body);
            if (!updatedQuiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }
            res.json(updatedQuiz);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const deleteQuiz = async (req, res) => {
        const status = await quizDao.deleteQuiz(req.params.qid)
        res.json(status);
    };

    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/courses/:cid/quizzes", findAllQuizzes);
    app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
}