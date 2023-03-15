import express from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v2', contactRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});