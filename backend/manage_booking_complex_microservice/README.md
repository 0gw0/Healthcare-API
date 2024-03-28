# Manage Booking Complex Microservice

To manage both timeslot and appointment bookings.

### Functions

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

#### Before running the code:

Ensure that microservices for `timeslot` and `appointment` is already running.

#### (WINDOWS) Run the code in this directory:

```BASH
    python3 -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    python manage_booking.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/manage_booking:1.0 ./
    docker run -p 5101:5101 --name manage_booking_microservice yata/manage_booking:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset

### Steps After composing kong:

-   Go to: http://localhost:8002/overview
-   To stop: docker compose stop
