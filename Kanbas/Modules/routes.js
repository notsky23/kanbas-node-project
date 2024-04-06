import db from "../Database/index.js";

function ModuleRoutes(app) {
    // Module - Create
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {...req.body, course: cid, _id: new Date().getTime().toString()};
        db.modules.push(newModule);
        res.send(newModule);
      });
    
    // Module - Read
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });

    // Module - Update
    app.put("/api/courses/:cid/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        db.modules[moduleIndex] = {...db.modules[moduleIndex], ...req.body};
        res.sendStatus(204);
      });    

    // Module - Delete
    app.delete("/api/courses/:cid/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });
    
}

export default ModuleRoutes;