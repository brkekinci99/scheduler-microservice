const mongooseModel = require("mongoose");
const validator = require("validator");
const jobSchema = mongooseModel.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    to: {
        type: String,
        required: [true, "Email is required"],
    }
});
const Job = mongooseModel.model("Job", jobSchema, "jobs");
module.exports = Job;
//# sourceMappingURL=job.js.map