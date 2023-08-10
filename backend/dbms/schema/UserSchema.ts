import mongoose from "mongoose";
import { IUser } from "../../server/types";
const  USERNAME1 = process.env.USERNAME1;
const  PASSWORD = process.env.PASSWORD;
const  CLUSTER = process.env.CLUSTER;
const  DB_NAME = process.env.DB_NAME;
const  DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    fullName:{
        type: String
    },
    age: {
        type: Number,
        default: 0,
    }
});

export const User = mongoose.model<IUser>("User", UserSchema);

export function connectToDB(tableName:string) {
    mongoose.connect(DB_URL+tableName, {dbName: DB_NAME}).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

export  function searchRecord( query:Object){
    connectToDB("users");
    return User.find(query);
}

export function createRecord( newRecord:IUser){
    connectToDB("users");

    User.insertMany(newRecord);
}
