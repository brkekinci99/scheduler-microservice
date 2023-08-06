# Scheduler Microservice Documentation

## 1. Introduction

Welcome to the documentation of our Scheduler Microservice. We leverage the power of the Agenda library for scheduling and managing jobs. Our service works on a MongoDB database using the Mongoose library to handle frequent job checks and operations.

## 2. Authentication

The Scheduler Microservice uses Bearer Authentication. When making requests to the service, the client must include the Bearer token in the Authorization header as follows:

```
Authorization: Bearer <token>
```

## 3. Job Module

The Job Module is designed to manage recurring or scheduled jobs. It offers basic CRUD (Create, Read, Update, Delete) operations on the jobs database.

### 3.1 Recurring Jobs

Creates a recurring scheduling job.

**Endpoint:** `/api/jobs/recurring`

**Method:** POST

**Parameters:**

- `data` (object): An object containing all required parameters for job creation.
- `start_date` (date): The start date of the recurring job.
- `end_date` (date): The end date of the recurring job.
- `interval` (string): Cron or human interval can be used for job frequency. Cron is recommended.
- `route` (string): The route that the job sends its request to.

### 3.2 Scheduled Jobs

Creates a one-time scheduled job.

**Endpoint:** `/api/jobs/schedule`

**Method:** POST

**Parameters:**

- `data` (object): An object containing all required parameters for job creation.
- `schedule_date` (date): The date for the job to start.
- `route` (string): The route that the job sends its request to.
- `schedule` (string): Specify "weekly" for weekly recurring jobs.
- `days` (array): Specify the days the job needs to work on, used if `schedule` is "weekly".
- `time` (string): Specify when the job should run, formatted as "hh:mm".

### 3.3 Weekly Jobs

Creates a weekly scheduled job. This route is intended for internal use only.

**Endpoint:** `/api/jobs/weekly`

**Method:** POST

**Parameters:**

- `data` (object): An object containing all required parameters for job creation.
- `schedule_date` (date): The date for the job to start.

### 3.4 Retrieving All Jobs

Retrieve all scheduled jobs.

**Endpoint:** `/api/jobs`

**Method:** GET

### 3.5 Deleting a Job

Deletes a specific job. If `schedule` is "weekly", it will also send a request to delete all jobs with the same id.

**Endpoint:** `/api/jobs/:id`

**Method:** DELETE

**Parameters:**

- `id` (string): The id of the job to delete.
- `schedule` (string): Specify "weekly" to delete other jobs with the same id.

### 3.6 Deleting All Jobs

Deletes all scheduled jobs.

**Endpoint:** `/api/jobs`

**Method:** DELETE

### 3.7 Deleting Weekly Jobs

Deletes weekly jobs with a given id. This route is intended for internal use only.

**Endpoint:** `/api/jobs/delete-weekly/:id`

**Method:** DELETE

**Parameters:**

- `id` (string): The id of the jobs to delete.

## 4. Further Information

For additional support or queries, feel free to reach out to our support team. We're always here to help!
