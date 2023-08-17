import {Schema} from 'mongoose';
import mongoose from 'mongoose';
import { ISubmission } from '../../server/types';

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


export function searchRecord( query:Object){
    const submissions = Submissions.find(query);
    // mongoose.connection.close()
    return submissions;
}

export function createRecord( newRecord:ISubmission){

    Submissions.insertMany(newRecord);
}
