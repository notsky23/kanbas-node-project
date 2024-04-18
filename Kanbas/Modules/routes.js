import * as moduleDao from './dao.js';

// let currentUser = null;

export default function moduleRoutes(app) {
    const createModule = async (req, res) => {
        try {
            const moduleData = { ...req.body, course: req.params.cid };
            const module = await moduleDao.createModule(moduleData)
            res.json(module);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        } 
    };
    const findAllModules = async (req, res) => {
        try {
            const courseId = req.params.cid;
            if (!courseId) {
                return res.status(400).json({ message: "Course ID is missing." });
            }
            const modules = await moduleDao.findAllModulesByCourse(req.params.cid);
            res.json(modules);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const updateModule = async (req, res) => {
        try {
            // const updatedModule = await moduleDao.updateModule(req.params.mid, req.body);
            const updatedModule = await moduleDao.updateModule(req.params.mid, req.body);
            if (!updatedModule) {
                return res.status(404).json({ message: "Module not found" });
            }
            res.json(updatedModule);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    const deleteModule = async (req, res) => {
        const status = await moduleDao.deleteModule(req.params.mid)
        res.json(status);
    };

    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/courses/:cid/modules", findAllModules);
    app.put("/api/modules/:mid", updateModule);
    app.delete("/api/modules/:mid", deleteModule);
}