import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import contactRoutes from './routes/contact.routes';
import {connectDb} from "./config/connectDb";

dotenv.config();

connectDb();
const app = express();

app.use(express.json());
app.use('/api/v2', [userRoutes, contactRoutes]);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});