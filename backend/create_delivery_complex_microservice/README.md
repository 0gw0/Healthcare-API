# Create Delivery Complex Microservice

To manage inventory and create delivery orders.

### Functions

1. Create delivery with `appointment_id` and `items`
    1. Calls `inventory` microservice to update affected items' quantity
    2. Calls `delivery_order` microservice to create a delivery order based on `items`

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
    python create_delivery.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/create_delivery:1.0 ./
    docker run -p 5101:5101 --name create_delivery_microservice yata/create_delivery_complex:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset

### Steps After composing kong:

-   Go to: http://localhost:8002/overview
-   To stop: docker compose stop
