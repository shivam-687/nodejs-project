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
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const statusCode = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
        const message = err.message || "Something went wrong.";
        // returns error status code and message
        return res.status(statusCode).json({
            error: statusCode,
            message: message
        });
    });
}
exports.default = errorHandler;
