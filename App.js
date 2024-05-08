import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import "dotenv/config";

import Hello from './Hello.js'
import Lab5 from './Lab5.js'
// import CourseRoutes from './Kanbas/Courses/routesV2.js'
import courseRoutes from './Kanbas/Courses/routes.js'
// import ModuleRoutes from './Kanbas/Modules/routes.js'
import moduleRoutes from './Kanbas/Modules/routes.js'
// import AssignmentRoutes from './Kanbas/Assignments/routes.js'
import assignmentRoutes from './Kanbas/Assignments/routes.js'
import UserRoutes from './Kanbas/Users/routes.js'
import quizRoutes from './Kanbas/Quizzes/routes.js';

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.info('Connected to database'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express()

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === 'production';

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // Set secure only in production.
    sameSite: isProduction ? 'None' : 'Lax', // Use 'None' in production with secure, 'Lax' otherwise.
    httpOnly: true, // Always true to prevent access from client-side scripts.
    maxAge: 24 * 60 * 60 * 1000 // Cookie expires after 24 hours.
  },
  proxy: isProduction // Set proxy true in production if behind a reverse proxy.
};
app.use(session(sessionOptions));

const allowedDomains = [
  'http://localhost:3000',
  'https://harmonious-cannoli-f4be26.netlify.app',
  'https://main--harmonious-cannoli-f4be26.netlify.app',
].concat(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);
const corsOptions = {
  credentials: true, // This allows the server to accept credentials (cookies, authorization headers, etc.) from the origin
  origin: function (origin, callback) {
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true); // Allow the request if the origin is in the allowedDomains list or not present (CORS pre-flight requests)
    } else {
      callback(new Error('Not allowed by CORS')); // Reject other origins
    }
  }
};
app.use(cors(corsOptions)); 

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('Session:', req.session);
  next();
});

Hello(app);
Lab5(app);
// CourseRoutes(app);
courseRoutes(app);
// ModuleRoutes(app);
moduleRoutes(app);
// AssignmentRoutes(app);
assignmentRoutes(app);
quizRoutes(app);
UserRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));