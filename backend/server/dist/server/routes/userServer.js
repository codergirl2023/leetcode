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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.TOKEN_KEY;
const UserSchema_1 = require("../../dbms/schema/UserSchema");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!SECRET) {
        return res.status(500).json({ "message": "Secret key is missing" });
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const age = req.body.age;
        const fullName = req.body.fullName;
        const user = yield (0, UserSchema_1.searchRecord)({ email });
        if (user.length) {
            return res.status(403).send({ 'msg': 'Username already exists in our database, please try some other username' });
        }
        const token = jsonwebtoken_1.default.sign({ email, password }, SECRET, { expiresIn: "1h" });
        const userRecord = { fullName, age, email, password };
        (0, UserSchema_1.createRecord)(userRecord);
        res.status(200).send({ 'message': 'User created successfully', 'jwtToken': token });
    }
    catch (error) {
        console.error('Error creating the user:', error);
        return res.status(500).send('Error creating the user. Please try again later.');
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!SECRET) {
        return res.status(500).json({ "message": "Secret key is missing" });
    }
    const email = req.headers.email;
    const password = req.headers.password;
    const user = yield (0, UserSchema_1.searchRecord)({ email, password });
    if (!user.length) {
        return res.status(403).send({ 'msg': 'email or password is incorrect. Please try with correct email/password' });
    }
    const token = jsonwebtoken_1.default.sign({ email, password }, SECRET, {
        expiresIn: "1h",
    });
    return res.status(200).send({ 'message': 'User logged in successfully', 'jwtToken': token });
}));
router.get('/all', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield (0, UserSchema_1.searchRecord)({});
    return res.status(200).send(allUsers);
}));
router.get('/me', auth_1.authenticateJwt, (req, res) => {
    if (req.headers['userId'] !== null) {
        res.status(200).send({ email: req.headers['userId'] });
    }
});
exports.default = router;
