"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
exports.User = mongoose_1.default.model("User", UserSchema);
function searchRecord(query) {
    const user = exports.User.find(query);
    return user;
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    exports.User.insertMany(newRecord);
}
exports.createRecord = createRecord;
