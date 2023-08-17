import mongoose from 'mongoose';
import { IProblem } from '../../server/types';

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

export function searchRecord( query:Object){
    const problem= Problems.find(query);
    return problem;
}

export function createRecord( newRecord:IProblem){

    Problems.insertMany(newRecord);

}