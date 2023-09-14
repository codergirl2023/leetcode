"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const SECRET = process.env.TOKEN_KEY;
const authenticateJwt = (req, res, next) => {
    if (!SECRET) {
        return res.status(500).json({ "message": "Secret key is missing" });
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            if (err || !payload || typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers["userId"] = payload.email;
        });
        return next();
    }
    else {
        return res.status(403).json({ "message": "A token is required for authentication" });
    }
};
exports.authenticateJwt = authenticateJwt;
