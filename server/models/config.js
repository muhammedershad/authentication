// models/config.js
import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/authentication', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error(error);
    }
}

