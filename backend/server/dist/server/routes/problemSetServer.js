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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("./../../middleware/auth");
const { searchRecord, createRecord } = require('../../dbms/schema/ProblemSchema');
router.get('/all', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield searchRecord({});
        res.status(200).send({ 'problemSet': problems });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}));
router.get('/:problemId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = req.params.problemId;
    const problem = yield searchRecord({ _id: problemId });
    res.status(200).send(problem);
}));
router.post('/addProblem', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProblem = req.body;
    yield createRecord(newProblem);
    res.status(201).send({ 'msg': 'Problem added' });
}));
exports.default = router;
