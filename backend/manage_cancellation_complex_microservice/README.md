# Manage Cancellation Complex Microservice

To manage both timeslot and appointment cancellation requests, and making notifications.

### Functions

1. Make cancellation request (Doctor)
    1. Doctor cancels his schedule for a specific time period
    2. Calls `timeslot` microservice to get affected time slots
    3. Calls `appointment` microservice to get affected appointments
    4. Calls `notification` microservice to create notifications for all affected timeslots and appointments, ignoring duplicates
2. Make a cancellation (Nurse)
    1. Nurse confirms doctor's cancellation one-by-one
    2. Calls `timeslot` microservice to delete
    3. Calls `appointment` microservice to delete
    4. Calls `notification` microservice to update status to'completed'

### How to code

Ensure that the relevant VSCode extensions are installed

1. SQLite Viewer

Watch this tutorial to [learn SQLite](https://www.youtube.com/watch?v=pd-0G0MigUA)

Helpful Documentations

1. [List of HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
2. [Starting an Express project - Video](https://www.youtube.com/watch?v=Jcfo-j5y0rM)
3. [Auto reload with Nodemon - Video](https://www.youtube.com/watch?v=XgM_t9K_plw)
4. [Enable CORS](https://www.geeksforgeeks.org/how-to-allow-cors-in-express/)
5. [Express.js req.body undefined](https://stackoverflow.com/questions/9177049/express-js-req-body-undefined)
6. [ExpressJs(NodeJs) Fire & Forget](https://stackoverflow.com/questions/34716335/expressjsnodejs-fire-forget)
7. [Using async/await with a forEach loop](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop)
8. [Docker with Express](https://www.geeksforgeeks.org/how-to-dockerize-an-expressjs-app/)

#### Before running the code:

Ensure that microservices for `timeslot`, `appointment` and `notification` is already running.

#### (WINDOWS) Run the code in this directory:

```BASH
    npm install
    npm run start
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/manage_cancellation:1.0 ./
    docker run -p 5102:5102 --name manage_cancellation_microservice yata/manage_cancellation_complex:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
