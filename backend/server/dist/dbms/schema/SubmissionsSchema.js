"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.Submissions = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
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
function searchRecord(query) {
    const submissions = exports.Submissions.find(query);
    // mongoose.connection.close()
    return submissions;
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    exports.Submissions.insertMany(newRecord);
}
exports.createRecord = createRecord;
