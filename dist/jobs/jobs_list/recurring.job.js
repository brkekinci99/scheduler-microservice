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
const email_function_1 = require("../../functions/email.function");
module.exports = function (agenda) {
    agenda.define(`Recurring Job`, (job, done) => __awaiter(this, void 0, void 0, function* () {
        const data = job.attrs.data;
        console.log("Recurring Email Job Works");
        yield (0, email_function_1.sendRequest)(data, done);
    }));
};
//# sourceMappingURL=recurring.job.js.map