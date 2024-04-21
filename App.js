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

const allowedDomains = [
  'https://stalwart-gingersnap-b465f3.netlify.app',
  'https://a5--stalwart-gingersnap-b465f3.netlify.app',
  'https://a6--stalwart-gingersnap-b465f3.netlify.app',
  'https://main--stalwart-gingersnap-b465f3.netlify.app',
  'https://harmonious-cannoli-f4be26.netlify.app',
  'https://main--harmonious-cannoli-f4be26.netlify.app',
  process.env.FRONTEND_URL // Assuming this is set in your environment variables
];
const corsOptions = {
  credentials: true, // This allows the server to accept credentials (cookies, authorization headers, etc.) from the origin
  origin: function (origin, callback) {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request if the origin is in the allowedDomains list or not present (CORS pre-flight requests)
    } else {
      callback(new Error('Not allowed by CORS')); // Reject other origins
    }
  }
};
app.use(cors(corsOptions)); 

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