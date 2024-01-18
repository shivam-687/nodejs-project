"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requireLocalAuth_1 = __importDefault(require("@/middleware/requireLocalAuth"));
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const validateSchema_1 = __importDefault(require("@/middleware/validateSchema"));
const user_schema_1 = require("@/request-schema/user-schema");
const userController = new userController_1.UserController();
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validateSchema_1.default)(user_schema_1.CreateUserInputSchema), userController.registerUser);
authRouter.post('/login', requireLocalAuth_1.default, userController.authenticateUser);
exports.default = authRouter;
