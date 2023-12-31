import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user_routes.js';
import adminRoutes from './routes/admin_routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(() => console.log('mongodb connected'))
.catch((err) => console.log(err))

app.use('/', userRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
