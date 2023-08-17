const  USERNAME1 = process.env.USERNAME1;
const  PASSWORD = process.env.PASSWORD;
const  CLUSTER = process.env.CLUSTER;
const  DB_NAME = process.env.DB_NAME;
const  DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;
import mongoose from "mongoose";

export function connectToDB() {
    mongoose.connect(DB_URL, {dbName: DB_NAME}).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}