"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.connectToDB = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const USERNAME1 = process.env.USERNAME1;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    age: {
        type: Number,
        default: 0,
    }
});
exports.User = mongoose_1.default.model("User", UserSchema);
function connectToDB(tableName) {
    mongoose_1.default.connect(DB_URL + tableName, { dbName: DB_NAME }).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
exports.connectToDB = connectToDB;
function searchRecord(query) {
    connectToDB("users");
    return exports.User.find(query);
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    connectToDB("users");
    exports.User.insertMany(newRecord);
}
exports.createRecord = createRecord;
