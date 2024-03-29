"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
const config_1 = __importDefault(require("../config"));
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(req.body.password, bcrypt_nodejs_1.default.genSaltSync(10));
            try {
                const createdUser = yield user_1.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                const token = jwt.sign({ email: createdUser.email }, config_1.default.jwt_secret);
                res.status(200).json({
                    data: {
                        email: createdUser.email,
                        token
                    }
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                console.log(error);
            }
        });
    }
    authenticateUser(req, res, next) {
        const user = req.user;
        const token = jwt.sign({ email: user.email }, config_1.default.jwt_secret);
        res.status(200).json({
            data: {
                email: user.email,
                token
            }
        });
    }
}
exports.UserController = UserController;
