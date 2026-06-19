import { configDotenv } from 'dotenv';
configDotenv();
import express, {type Request,type Response} from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js'
import projectsRoutes from './routes/projects.js'
import rulesRoutes from './routes/rules.js'
import alertsRoutes from './routes/alerts.js'
import rateLimitRoutes from './routes/rateLimit.js'


const app = express();

// behind nginx — trust the proxy so req.ip / X-Forwarded-For work
app.set('trust proxy', true);

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));


if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
}


//! routes

// hot path — SDKs / raw HTTP call this on every inbound request
app.use("/api/rl", rateLimitRoutes);

app.use("/api/v1/auth", authRoutes);

// project routes
app.use("/api/v1/projects", projectsRoutes);

// rules + alerts are scoped to a project, so they nest under it
// (their routers use mergeParams to read :projectId)
app.use("/api/v1/projects/:projectId/rules", rulesRoutes);
app.use("/api/v1/projects/:projectId/alerts", alertsRoutes);



app.get('/health', (req:Request, res:Response) => {
    res.json({
        status: 'OK',
        time: new Date().toISOString()
    })
})


export default app;