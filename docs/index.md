## 1. Introduction

Welcome to the comprehensive documentation of our Scheduler Microservice, an essential and highly effective tool for scheduling and managing a diverse range of tasks in your application. Whether it's a one-off event or a recurring job that needs to be handled, our Scheduler Microservice offers a reliable, efficient, and easy-to-use solution.

Our Scheduler Microservice is developed using Node.js, a powerful runtime environment with a strong reputation for building scalable network applications. For job scheduling, we've harnessed the capabilities of the Agenda library, a robust, MongoDB-backed job scheduling library. The key advantage of using Agenda lies in its flexibility, allowing both one-time and recurring job scheduling, which is a critical feature of our service.

Our service is designed to provide consistent performance and reliability. It checks for eligible jobs in the database at frequent intervals and handles the execution process. As we believe in transparency and control, we've incorporated functionalities to create, read, update, and delete jobs. This way, you always have complete control over your scheduled tasks.

## 2. How Scheduler Microservice Works

At the heart of our Scheduler Microservice is a constant cycle of job retrieval, processing, and execution. Here's an overview of how it works:

### 2.1. Job Creation

First, a job is created and saved into the MongoDB database. Jobs could be of different types such as recurring, one-time or even weekly jobs. Each job contains information on what task should be executed, when it should be executed, and any necessary data required for its execution.

### 2.2. Job Retrieval

Agenda, our job processing library, constantly polls the MongoDB database for jobs that are due for execution. It retrieves these jobs based on their start times and intervals specified during job creation.

### 2.3. Job Execution

Once a job is retrieved, the Agenda library carries out the task as defined in the job data. If the job is recurring, Agenda will reschedule the job according to its interval after it's executed.

### 2.4. Job Management

Our Scheduler Microservice provides endpoints for job management. You can create, find, and delete jobs, allowing for full control over the task schedule. If a task is no longer needed or if there's a change in the execution plan, you can adjust it accordingly through these operations.

All in all, our Scheduler Microservice is built to be a reliable and robust solution to cater to all your scheduling needs. It's designed to automate your processes, improve efficiency, and offer you the control you need over your tasks. We hope that our Scheduler Microservice serves as a valuable tool in managing your application's processes.
