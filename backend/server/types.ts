import mongoose from "mongoose";

interface IUser{
    email:string;
    password:string;
    fullName:string;
    age:number;
}

interface IRequest extends Request{
    user:IUser;
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


export {IUser, IRequest, ISubmission, IProblem};