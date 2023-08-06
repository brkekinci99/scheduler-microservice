const mongooseModel = require("mongoose");
const validator = require("validator");

const jobSchema = mongooseModel.Schema({});

const Job = mongooseModel.model("Job", jobSchema, "jobs");

module.exports = Job;
