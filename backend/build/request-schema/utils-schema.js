"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSortingSchema = exports.WithPagination = void 0;
const config_1 = __importDefault(require("@/config"));
const zod_1 = __importDefault(require("zod"));
exports.WithPagination = zod_1.default.object({
    page: zod_1.default.string().optional(),
    limit: zod_1.default.string().optional().default(config_1.default.limit.toString())
});
exports.WithSortingSchema = zod_1.default.object({
    sortOrder: zod_1.default.string().optional(),
    sortBy: zod_1.default.enum(['asc, desc']).optional()
});
