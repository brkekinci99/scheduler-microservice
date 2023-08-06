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
exports.createWeeklyNextJob = exports.sendRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const findDays_1 = require("./findDays");
const sendRequest = (data, done) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default //                           customer_notifications/send
        .post(`http://localhost:8080/api/${data.route}`, data, {
        headers: { Authorization: "Bearer deneme" },
    })
        .then((response) => {
        console.log(`Request to ${data.route} response ${response.status}`);
        done();
    })
        .catch((err) => {
        console.error(err);
        done(err);
    });
});
exports.sendRequest = sendRequest;
const createWeeklyNextJob = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule_date = (0, findDays_1.findNextDay)(data.schedule_date, data.days, data.weeks);
    data.schedule_date = schedule_date;
    axios_1.default
        .post("http://localhost:5000/api/emails/weekly", data, {
        headers: { Authorization: `Bearer ${process.env.MICROSERVICE_AUTH}` },
    })
        .then((response) => {
        console.log(`Weekly Job created.`);
    })
        .catch((err) => {
        console.error(err);
    });
});
exports.createWeeklyNextJob = createWeeklyNextJob;
//# sourceMappingURL=email.function.js.map