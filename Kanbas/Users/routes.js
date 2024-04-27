import * as dao from './dao.js';

// let currentUser = null;

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        try {
            const user = await dao.createUser(req.body)
            // console.log(user);
            res.json(user);
        } catch (error) {
            if (error.message === 'Username already exists') {
                return res.status(409).json({ message: error.message }); // 409 Conflict
            }
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        } 
    };
    const findAllUsers = async (req, res) => {
        const {role} = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        
        const users = await dao.findAllUsers();
        res.json(users);
        return;
    };
    const findUserById = async (req, res) => {
        // const user = await dao.findUserById(req.params.userId);
        // console.log(user);
        // res.json(user);

        try {
            const user = await dao.findUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        try {
            const status = await dao.updateUser(userId, req.body);
            const updatedUser = await dao.findUserById(userId);
            if (req.session["currentUser"] && req.session["currentUser"]._id === userId) {
                req.session["currentUser"] = updatedUser;
            }
            // console.log(currentUser);
            res.json(status);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
        
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId)
        res.json(status);
    };
    const signup = async (req, res) => {
        try {
            const newUser = await dao.createUser(req.body);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        } catch (error) {
            const user = await dao.findUserByUsername(req.body.username);
            if (user) {
                // Sending a 409 status code back to the client with a specific message
                res.status(400).json({ message: "Username already taken" });
            } else {
                // Handling other types of errors that might occur
                console.error('Server error:', error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        try {
            const currentUser = await dao.findUserByCredentials(username, password);
            if (currentUser) {
                req.session.currentUser = currentUser; // Storing user data in the session
                res.json(currentUser); // Send back the user info as confirmation
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    const signout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "User not found" });
            }
            res.json(currentUser);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
        // res.json(currentUser);
    };
    const checkSession = async (req, res) => {
        if (req.session && req.session.currentUser) {
            res.json({ user: req.session.currentUser });
        } else {
            res.status(401).json({ user: null });
        }
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/checkSession", checkSession);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}