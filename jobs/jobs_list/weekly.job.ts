import { createWeeklyNextJob, sendRequest } from '../../functions/job.function';

module.exports = (agenda: any) => {
  agenda.define('Weekly Job', async (job: any, done: any) => {
    const data = job.attrs.data;
    await createWeeklyNextJob(data);
    await sendRequest(data, done);
  });
};
