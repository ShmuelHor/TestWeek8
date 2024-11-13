import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }    
};

export default connectDB;
