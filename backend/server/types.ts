import mongoose from "mongoose";

interface IUser{
    email:string;
    password:string;
    fullName:string;
}

 interface IProblem{
    title:string;
    description:string;
    examples:string;
    acceptance:string;
    difficulty:string;
}

 interface ISubmission{
    language:string;
    code:string;
    problemId?:mongoose.Schema.Types.ObjectId;
    userId?:mongoose.Schema.Types.ObjectId;
}


export {IUser, ISubmission, IProblem};