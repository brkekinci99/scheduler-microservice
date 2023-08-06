import { Agenda } from '@hokify/agenda';

let configureMongoDBObj = {
  db: {
    address: process.env.DATABASE,
    collection: 'jobs',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  // If your lock limit is higher than the concurrency then one worker will put a "lock" on more jobs than it can processes.
  //Note that by default lock limit is "no limit" meaning that one worker will lock all the available jobs.
  defaultLockLimit: 20,
  defaultConcurrency: 20,
};

const agenda = new Agenda(configureMongoDBObj);

module.exports = agenda;
