"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationSchema = void 0;
const mongoose_1 = require("mongoose");
const options = { timestamps: true };
exports.operationSchema = new mongoose_1.Schema({
    socketId: { type: String, trim: true, required: true },
    operation: { type: String, trim: true, required: true },
    result: { type: String, trim: true, required: true },
}, options);
exports.default = (0, mongoose_1.model)("operations", exports.operationSchema);
