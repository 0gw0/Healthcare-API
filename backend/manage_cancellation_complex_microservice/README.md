# Manage Cancellation Complex Microservice

To manage both timeslot and appointment cancellation requests, and making notifications.

### Functions (WIP)

1. Make an appointment by timeslot_id
    1. Calls `timeslot` microservice to update isAccepted=1 by id
    2. Calls `appointment` microservice to create an appointment based on the updated timeslot
2. Cancel an appointment by appointment_id
    1. Calls `timeslot` microservice to update isAccepted=0 by id
    2. Calls `appointment` microservice to delete an appointment based on appointment_id

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
    docker run -p 5102:5002 --name manage_cancellation_microservice yata/manage_cancellation:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
