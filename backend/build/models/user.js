"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
exports.userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
// userSchema.pre<IUser>('save', function save(next) {
//     const user = this
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err)
//         }
//         bcrypt.hash(this.password, salt, null, (err: Error, hash) => {
//             if (err) {
//                 return next(err)
//             }
//             user.password = hash
//             next()
//         })
//     })
// })
exports.userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        console.log({ isMatch, candidatePassword, pass: this.password });
        callback(err, isMatch);
    });
};
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
