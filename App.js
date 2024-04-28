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

const sessionOptions = {
  // secret: "any string",
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: process.env.NODE_ENV === "production", // Secure cookies only in production
    // sameSite: process.env.NODE_ENV === "production" ? 'None' : 'Lax', // Required to send cookies with cross-origin requests. 'None' requires secure=true
    secure: false,
    sameSite: 'Lax',
    httpOnly: false, // Prevent client-side JS from accessing the cookie
    maxAge: 24 * 60 * 60 * 1000 // Cookie expiration set to 24 hours
  }
};

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = false; // ensure secure cookie in production
  sessionOptions.proxy = false;
}

app.use(session(sessionOptions));

// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.HTTP_SERVER_DOMAIN,
//   }
// }
// Adjust session cookie settings for production
// if (process.env.NODE_ENV === "production") {
//   sessionOptions.cookie.secure = true; // Enable secure cookies on production
// }

const allowedDomains = [
  'http://localhost:3000',
  'https://harmonious-cannoli-f4be26.netlify.app',
  'https://main--harmonious-cannoli-f4be26.netlify.app',
  // process.env.FRONTEND_URL
];
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