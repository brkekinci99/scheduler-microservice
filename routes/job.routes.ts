import { verifyToken } from "../middlewares/auth";
const jobs = require("../controllers/job.controller");

const router = require("express").Router();

module.exports = (app: any) => {
  // Create a recurring job
  router.post("/recurring", jobs.recurring);

  // Create a scheduled job
  router.post("/schedule", jobs.schedule);

  // Create a weekly job
  router.post("/weekly", jobs.weekly);

  // Retrieve all jobs
  router.get("/", jobs.findAll);

  // Delete a job with id
  router.delete("/:id", jobs.delete);

  // Delete all jobs
  router.delete("/", jobs.deleteAll);

  // Delete weekly job
  router.delete("/delete-weekly/:id", jobs.deleteWeekly);

  app.use("/api/jobs", verifyToken, router);
};
