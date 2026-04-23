import { configDotenv } from 'dotenv';
configDotenv();
import express, {type Request,type Response} from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5432',
    credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));


if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
}





app.get('/health', (req:Request, res:Response) => {
    res.json({
        status: 'OK',
        time: new Date().toISOString()
    })
})


export default app;