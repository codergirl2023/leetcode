import {Schema} from 'mongoose';
import mongoose from 'mongoose';
import { ISubmission } from '../../server/types';

const  USERNAME1 = process.env.USERNAME1;
const  PASSWORD = process.env.PASSWORD;
const  CLUSTER = process.env.CLUSTER;
const  DB_NAME = process.env.DB_NAME;
const  DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;

const SubmissionsSchema = new mongoose.Schema({
    language: {
        type: String
    },
    code: {
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    problemId:{
        type: Schema.Types.ObjectId, ref: 'Problems'
    }
});

export const Submissions = mongoose.model("Submissions", SubmissionsSchema);

export function connectToDB(tableName:string) {
    mongoose.connect(DB_URL+tableName, {dbName: DB_NAME}).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

export function searchRecord( query:Object){
    connectToDB("submissions");
    const submissions = Submissions.find(query);
    // mongoose.connection.close()
    return submissions;
}

export function createRecord( newRecord:ISubmission){
    connectToDB("submissions");

    Submissions.insertMany(newRecord);
}
