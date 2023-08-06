import axios from 'axios';
import { findNextDay } from './findDays';

export const sendRequest: Function = async (data: any, done: any) => {
  axios //                           customer_notifications/send
    .post(`${data.route}`, data, {
      headers: { Authorization: `API_KEY ${process.env.API_KEY}` },
    })
    .then((response) => {
      console.log(`Request to ${data.route} response ${response.status}`);
      done();
    })
    .catch((err) => {
      console.error(err);
      done(err);
    });
};

export const createWeeklyNextJob: Function = async (data: any) => {
  data.schedule_date = data.next_date;
  const days = data.days.map((value) => value.day);
  data.next_date = findNextDay(data.schedule_date, days, data.repeat_every);
  const SCHEDULER_URL = process.env.SCHEDULER_URL || 'http://localhost:5000';
  axios
    .post(`${SCHEDULER_URL}/api/jobs/weekly`, data, {
      headers: { Authorization: `Bearer ${process.env.MICROSERVICE_AUTH}` },
    })
    .then((response) => {
      console.log(`Weekly Job created.`);
    })
    .catch((err) => {
      console.error(err);
    });
};
