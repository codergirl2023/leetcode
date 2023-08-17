import { IUser } from "../../server/types";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    }
});

export const User = mongoose.model<IUser>("User", UserSchema);



export function searchRecord(query: Object) {
    const user = User.find(query);
    return user;
}

export function createRecord(newRecord: IUser) {

    User.insertMany(newRecord);
}
