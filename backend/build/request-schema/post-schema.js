"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostListInputSchema = exports.UpdatePostInputSchema = exports.CreatePostInputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_schema_1 = require("./utils-schema");
const CreatePostInputBody = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
    isActive: zod_1.default.boolean().default(true),
    geoLocation: zod_1.default.object({
        type: zod_1.default.enum(['Point']).default('Point'),
        coordinates: zod_1.default.array(zod_1.default.number()).min(2).max(2)
    })
});
exports.CreatePostInputSchema = zod_1.default.object({
    body: CreatePostInputBody
});
exports.UpdatePostInputSchema = zod_1.default.object({
    body: CreatePostInputBody,
    params: zod_1.default.object({
        id: zod_1.default.string()
    })
});
exports.PostListInputSchema = zod_1.default.object({
    query: utils_schema_1.WithPagination.merge(utils_schema_1.WithSortingSchema)
});
