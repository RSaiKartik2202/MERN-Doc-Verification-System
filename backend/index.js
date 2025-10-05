import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import instituteRoutes from './routes/institute.js';
import companyRoutes from './routes/company.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());
app.use('/api', authRoutes);
app.use('/api/institute', instituteRoutes);
app.use('/api/company', companyRoutes);

connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});
