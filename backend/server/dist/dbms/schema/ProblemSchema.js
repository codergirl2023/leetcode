"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.connectToDB = exports.Problems = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const USERNAME1 = process.env.USERNAME1;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;
const ProblemsSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    examples: {
        type: String,
        get: function (data) {
            try {
                return JSON.parse(data);
            }
            catch (error) {
                return data;
            }
        },
        set: function (data) {
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
exports.Problems = mongoose_1.default.model("Problems", ProblemsSchema);
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
    connectToDB("problems");
    const problem = exports.Problems.find(query);
    return problem;
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    connectToDB("problems");
    exports.Problems.insertMany(newRecord);
}
exports.createRecord = createRecord;
