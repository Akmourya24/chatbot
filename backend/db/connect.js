import mongoose from 'mongoose';

const dataBase_name = 'chatApp';

const conncetDB = async () => {
    try {
        const connectionDatabase = await mongoose.connect(`${process.env.MONGODB_URI}/${dataBase_name}`)
        console.log(`Database connected successfully ${connectionDatabase.connection.host}`);
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with failure
    }
}

export default conncetDB;