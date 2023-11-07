import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user_routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(() => console.log('mongodb connected'))
.catch((err) => console.log(err))

app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
