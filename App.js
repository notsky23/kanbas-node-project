import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import cors from 'cors'
import CourseRoutes from './Kanbas/Courses/routes.js'
import ModuleRoutes from './Kanbas/Modules/routes.js'
import AssignmentRoutes from './Kanbas/Assignments/routes.js'

const app = express()
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
app.use(cors())
app.use(express.json())

Hello(app)
Lab5(app)
CourseRoutes(app)
ModuleRoutes(app)
AssignmentRoutes(app)

app.listen(process.env.PORT || 4000);