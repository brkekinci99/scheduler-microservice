var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let jobsAgenda = require("../configs/agenda");
// list the different jobs availale throughout your app
// if you are adding the job types dynamically and saving them in the database you will get it here
let jobTypes = ["recurring.job", "scheduled.job", "weekly.job"];
// loop through the job_list folder and pass in the jobsAgenda instance
jobTypes.forEach((type) => {
    // the type name should match the file name in the jobs_list folder
    require("./jobs_list/" + type)(jobsAgenda);
});
if (jobTypes.length) {
    // if there are jobs in the jobsTypes array set up
    jobsAgenda.on("ready", () => __awaiter(this, void 0, void 0, function* () { return yield jobsAgenda.start(); }));
}
// let graceful = () => {
//   jobsAgenda.stop(() => {
//     process.exit(0);
//   });
// };
jobsAgenda.on("start", function (job) {
    console.log("Job to %s with id %s starting", job.attrs.data.route, job.attrs.data.id);
});
jobsAgenda.on("success", function (job) {
    console.log(`Job %s with id %s successfull`, job.attrs.data.route, job.attrs.data.id);
});
jobsAgenda.on("fail", function (err, job) {
    console.log(`Job %s with id %s failed`, job.attrs.data.route, job.attrs.data.id);
});
// process.on("SIGTERM", graceful);
// process.on("SIGINT", graceful);
module.exports = jobsAgenda;
//# sourceMappingURL=agenda.js.map