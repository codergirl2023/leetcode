"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../../middleware/auth");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { searchRecord, createRecord } = require('../../dbms/schema/SubmissionsSchema');
const Users = require('../../dbms/schema/UserSchema');
//get all submissions of a particular user
router.get('/users/:userId/all', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const allSubmissionsOfReqUser = yield searchRecord({ userId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map((submission) => {
        return {
            "Language": submission.language,
            "Code": submission.code,
            "Problem Id": submission.problemId
        };
    });
    res.status(200).send(submissionsWithSpecificFields);
}));
//get all submissions on a particular problem
router.get('/problems/:problemId/all', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = req.params.problemId;
    const allSubmissionsOfReqUser = yield searchRecord({ problemId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map((submission) => {
        return {
            "Language": submission.language,
            "Code": submission.code,
            "User Id": submission.userId
        };
    });
    res.status(200).send(submissionsWithSpecificFields);
}));
router.post('/', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = searchRecord(Users, { email: req.body.userId }).select("_id"); //getting the user id from user email provided in request body
    const user = yield userQuery.exec();
    const problemId = req.params.problemId;
    const problem = yield searchRecord({ problemId });
    req.body.userId = user[0];
    req.body.problemId = problem[0];
    yield createRecord(req.body);
    res.status(200).send({ "msg": "Submitted successfully!" });
}));
exports.default = router;
