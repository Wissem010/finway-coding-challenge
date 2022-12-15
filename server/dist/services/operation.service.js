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
exports.findHistory = exports.calculate = void 0;
const strings_helper_1 = require("../helpers/strings.helper");
const Operation_1 = __importDefault(require("../schema/Operation"));
/**
 * returns operation result from the giving string
 * @param  {string} socketId
 * @param  {string} operationString
 */
function calculate({ socketId, operationString, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, strings_helper_1.evaluate)(operationString);
        if (!result || Number.isNaN(result)) {
            throw new Error("Unprocessable entity");
        }
        try {
            yield Operation_1.default.create({
                socketId,
                result,
                operation: operationString,
            });
            return result;
        }
        catch (e) {
            throw new Error(e.name);
        }
    });
}
exports.calculate = calculate;
/**
 * returns the latest 10 operations executed by the given user (socketId)
 * @param  {string} socketId
 */
const findHistory = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = yield Operation_1.default.find({ socketId })
        .limit(10)
        .select({ operation: 1, result: 1 })
        .sort({ _id: -1 })
        .lean();
    return operations;
});
exports.findHistory = findHistory;
