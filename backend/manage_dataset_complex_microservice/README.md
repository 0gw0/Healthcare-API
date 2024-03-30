# Manage Dataset Complex Microservice

To manage datasets of all microservices.

### Functions (WIP)

1. Use a dataset
    1. `dataset1`

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
    docker build -t yata/manage_dataset:1.0 ./
    docker run -p 5109:5109 --name manage_dataset_microservice yata/manage_dataset_microservice:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
