const JobController = require('../models/job');
const agendaController = require('../jobs/agenda');
const Job = require('../models/job');
import axios from 'axios';
import { findNextDay } from '../functions/findDays';

exports.recurring = async (req: any, res: any) => {
  const recurring = req.body;

  const recurringJob = agendaController.create(`Recurring Job`, recurring);

  recurringJob.repeatEvery(recurring.interval, {
    startDate: recurring.start_date,
    endDate: recurring.end_date,
  });

  await recurringJob.save();

  res.send(recurringJob.attrs._id);
};

exports.schedule = async (req: any, res: any) => {
  const schedule = req.body;
  if (schedule.schedule == 'weekly') {
    // timeArr[0] = hours, timeArr[1] = minutes
    const timeArr = schedule.time.split(':');
    const tempDate = new Date(schedule.schedule_date) > new Date() ? new Date(schedule.schedule_date) : new Date();
    tempDate.setHours(timeArr[0]);
    tempDate.setMinutes(timeArr[1]);
    const tempDays = schedule.days.map((value) => value.day);
    let weeklyStartDate = findNextDay(tempDate, tempDays, schedule.repeat_every);
    if (tempDays.includes(tempDate.getDay()) && tempDate > new Date()) {
      schedule.next_date = weeklyStartDate;
      weeklyStartDate = tempDate;
    }
    const weeklyJob = agendaController.create('Weekly Job', schedule);
    weeklyJob.schedule(weeklyStartDate, 'Weekly Job', schedule);
    await weeklyJob.save();
    res.send(weeklyJob.attrs._id);
  } else {
    const scheduledJob = agendaController.create('Scheduled Job', schedule);
    scheduledJob.schedule(schedule.schedule_date, 'Scheduled Job', schedule);
    await scheduledJob.save();
    res.send(scheduledJob.attrs._id);
  }
};

exports.weekly = async (req: any, res: any) => {
  const weekly = req.body;
  const weeklyJob = agendaController.create('Weekly Job', weekly);
  weeklyJob.schedule(weekly.schedule_date, 'Weekly Job', weekly);
  await weeklyJob.save();
  res.status(200).send('Next Weekly Job created.');
};
exports.findAll = async (req: any, res: any) => {
  try {
    let jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Couldn't find jobs" });
  }
};

exports.delete = async (req: any, res: any) => {
  const id: number = req.params.id;
  try {
    const result = await Job.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        message: 'Job not found',
      });
    }
    console.log(result?.schedule, result?.data?.schedule);
    if (result?.data?.schedule == 'weekly') {
      axios
        .delete(`http://localhost:5000/api/jobs/delete-weekly/${result._id}`)
        .then(() => {
          res.status(200).send({
            message: 'Weekly Job deleted successfully',
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send({ message: error.message });
        });
    } else {
      res.status(200).send({
        message: 'Job deleted successfully',
      });
    }
  } catch (error) {
    console.log('❌ ~ file: job.controller.ts:93 ~ exports.delete ~ error:', error);
    res.status(400).send({ message: error.message });
  }
};
exports.deleteAll = async (req: any, res: any) => {
  Job.deleteMany()
    .then((data: any) => {
      res.status(200).send({ message: 'All Jobs deleted successfully' });
    })
    .catch((err: any) => {
      console.error(err);
      res.status(400).send({ message: err.message });
    });
};

exports.deleteWeekly = async (req: any, res: any) => {
  const id = req.params._id;
  const jobs = await Job.aggregate([{ $match: { 'data.job_id': id } }]);

  jobs.map(async (value: any) => {
    await Job.findByIdAndDelete(value._id);
  });

  res.send({ message: 'All Weekly Jobs deleted successfully' });
};
