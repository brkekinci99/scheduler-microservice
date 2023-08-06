import { sendRequest } from '../../functions/job.function';

module.exports = (agenda: any) => {
  agenda.define('Scheduled Job', async (job: any, done: any) => {
    const data = job.attrs.data;
    await sendRequest(data, done);
  });
};
