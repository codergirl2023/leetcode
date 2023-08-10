"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.connectToDB = exports.Submissions = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const USERNAME1 = process.env.USERNAME1;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;
const SubmissionsSchema = new mongoose_2.default.Schema({
    language: {
        type: String
    },
    code: {
        type: String
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
    },
    problemId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Problems'
    }
});
exports.Submissions = mongoose_2.default.model("Submissions", SubmissionsSchema);
function connectToDB(tableName) {
    mongoose_2.default.connect(DB_URL + tableName, { dbName: DB_NAME }).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
exports.connectToDB = connectToDB;
function searchRecord(query) {
    connectToDB("submissions");
    return exports.Submissions.find(query);
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    connectToDB("submissions");
    exports.Submissions.insertMany(newRecord);
}
exports.createRecord = createRecord;
