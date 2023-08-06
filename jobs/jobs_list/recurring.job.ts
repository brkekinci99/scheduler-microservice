import { sendRequest } from '../../functions/job.function';

module.exports = function (agenda: any) {
  agenda.define(`Recurring Job`, async (job: any, done: any) => {
    const data = job.attrs.data;
    await sendRequest(data, done);
  });
};
