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
const JobController = require("../models/job");
const agendaController = require("../jobs/agenda");
const Job = require("../models/job");
const findDays_1 = require("../functions/findDays");
exports.recurring = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recurring = req.body;
    const recurringJob = agendaController.create(`Recurring Job`, recurring);
    recurringJob.repeatEvery(recurring.interval, {
        startDate: recurring.start_date,
        endDate: recurring.end_date,
    });
    yield recurringJob.save();
    res.send("Recurring Job Created");
});
exports.schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = req.body;
    if (schedule.schedule == "weekly") {
        // timeArr[0] = hours, timeArr[1] = minutes
        const timeArr = schedule.time.split(":");
        const tempDate = new Date(schedule.schedule_date) > new Date()
            ? new Date(schedule.schedule_date)
            : new Date();
        tempDate.setHours(timeArr[0]);
        tempDate.setMinutes(timeArr[1]);
        const tempDays = schedule.days.map((value) => value.day);
        let weeklyStartDate = (0, findDays_1.findNextDay)(tempDate, tempDays, schedule.repeat_every);
        if (tempDays.includes(tempDate.getDay()) && tempDate > new Date()) {
            weeklyStartDate = tempDate;
        }
        agendaController.schedule(weeklyStartDate, "Weekly Job", schedule);
        res.send("Weekly Job Scheduled");
    }
    else {
        agendaController.schedule(schedule.schedule_date, "Scheduled Job", schedule);
        res.send("Job Scheduled");
    }
});
exports.weekly = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weekly = req.body;
    agendaController.schedule(weekly.schedule_date, "Weekly Job", weekly);
});
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("create ulaştı");
    res.send("Create successfull");
});
exports.findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("findall ulaştı");
    try {
        let jobs = yield Job.find();
        console.log(jobs);
    }
    catch (err) {
        console.log(err);
    }
    res.send("findall successfull");
});
exports.findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("findone ulaştı");
    console.log("bozuk mu ");
    let job = Job.findOne({ _id: id });
    console.log(job);
    console.log("bozuk mu ");
    res.send("findone successfull");
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    console.log("update ulaştı");
    try {
        const id = req.params.id;
        const updatedJob = yield Job.findByIdAndUpdate(id, req.body);
        if (!updatedJob) {
            return res.status(404).send({
                message: "Job not found",
            });
        }
        console.log(updatedJob);
        res.status(201).send({
            message: "Job updated successfully",
        });
    }
    catch (error) {
        res.status(400).json({ status: "False", message: error.message });
    }
});
exports.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield Job.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({
                message: "Job not found",
            });
        }
        return res.status(200).send({
            message: "Job deleted successfully",
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.deleteAll = (req, res) => {
    console.log("deleteall ulaştı");
    res.send("deleteall successfull");
};
//# sourceMappingURL=email.controller.js.map