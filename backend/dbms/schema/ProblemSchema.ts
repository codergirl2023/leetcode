import mongoose from 'mongoose';
import { IProblem } from '../../server/types';

const  USERNAME1 = process.env.USERNAME1;
const  PASSWORD = process.env.PASSWORD;
const  CLUSTER = process.env.CLUSTER;
const  DB_NAME = process.env.DB_NAME;
const  DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;

const ProblemsSchema = new mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    examples:{
        type: String,
        get: function(data:string) {
            try {
                return JSON.parse(data);
            } catch(error) {
                return data;
            }
        },
        set: function(data:JSON) {
            return JSON.stringify(data);
        }
    },
    acceptance: {
        type: String
    },
    difficulty: {
        type: String
    }
});

export const Problems = mongoose.model<IProblem>("Problems", ProblemsSchema);

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
    connectToDB("problems");
    return Problems.find(query);
}

export function createRecord( newRecord:IProblem){
    connectToDB("problems");

    Problems.insertMany(newRecord);
}