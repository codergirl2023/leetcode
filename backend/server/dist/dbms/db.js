"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const USERNAME1 = process.env.USERNAME1;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDB() {
    mongoose_1.default.connect(DB_URL, { dbName: DB_NAME }).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
exports.connectToDB = connectToDB;
