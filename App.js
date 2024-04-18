import express from 'express'
import mongoose from 'mongoose'
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import cors from 'cors'
// import CourseRoutes from './Kanbas/Courses/routesV2.js'
import courseRoutes from './Kanbas/Courses/routes.js'
// import ModuleRoutes from './Kanbas/Modules/routes.js'
import moduleRoutes from './Kanbas/Modules/routes.js'
// import AssignmentRoutes from './Kanbas/Assignments/routes.js'
import assignmentRoutes from './Kanbas/Assignments/routes.js'
import UserRoutes from './Kanbas/Users/routes.js'
import session from 'express-session'
import "dotenv/config";

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.info('Connected to database');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express()
app.use(express.json());
const port = process.env.PORT || 4000;

const sessionOptions = {
  // secret: "any string",
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  }
}
app.use(session(sessionOptions));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

Hello(app);
Lab5(app);
// CourseRoutes(app);
courseRoutes(app);
// ModuleRoutes(app);
moduleRoutes(app);
// AssignmentRoutes(app);
assignmentRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);