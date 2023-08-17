"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.searchRecord = exports.Problems = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
function searchRecord(query) {
    const problem = exports.Problems.find(query);
    return problem;
}
exports.searchRecord = searchRecord;
function createRecord(newRecord) {
    exports.Problems.insertMany(newRecord);
}
exports.createRecord = createRecord;
