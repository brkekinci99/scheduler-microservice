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
// const sendWelcome = require("../../functions/email.function");
const email_function_1 = require("../../functions/email.function");
module.exports = (agenda) => {
    agenda.define("Send Customer Welcome Email", (job, done) => __awaiter(void 0, void 0, void 0, function* () {
        const data = job.attrs.data;
        const email = data.welcome;
        console.log("joba geldi");
        yield (0, email_function_1.sendWelcome)(data, done);
        // await sendWelcome({
        //   email,
        //   subject: "An Email by Scheduled Emails",
        //   message,
        // });
        // done();
    }));
};
//# sourceMappingURL=welcome.job.js.map