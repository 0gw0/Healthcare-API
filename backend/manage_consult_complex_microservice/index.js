// Framework Express
const express = require("express");
// Get payload from requestor
var bodyParser = require("body-parser");
// HTTP Client
const axios = require("axios");
// CORS
const cors = require("cors");
// Hot-Reload w/ Nodemon
// const reload = require("reload");
// amqp added
const amqp = require("amqplib");

// Creating express app
const port = 5104;
const app = express();

/// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Enabling CORS for any unknown origin
// E.g. https://xyz.example.com
app.use(cors());

// Microservices URLs
const appointment_URL = "http://host.docker.internal:5003/appointment";
const medical_certificate_URL =
    "http://host.docker.internal:5008/medical_certificate";
const create_delivery_complex_URL = "http://host.docker.internal:5103";

const amqp_URL = "amqp://host.docker.internal:5672";

// For testing
app.get("/", (req, res) => {
    // res.send("Manage Cancellation Complex Microservice");
    res.send({ Title: "Manage Consult Complex Microservice" });
});

/**
 * Complete teleconsultation
 * @summary With appointment_id, timeslot_datetime, duration_minutes, mc_start_datetime, mc_days, items
 * @type {PUT} /complete_teleconsultation
 * @param {JSON} payload - { data: { appointment_id, timeslot_datetime, duration_minutes, mc_start_datetime, mc_days, items } }
 */
app.put("/complete_teleconsultation", async (req, res) => {
    // (1) Get payload from request body
    const payload = req.body;
    console.log(payload.data);

    // (2) Check payload format
    // - Must have data: { appointment_id, timeslot_datetime, duration_minutes, mc_start_datetime, mc_days, items }
    if (
        !payload.data.appointment_id ||
        !payload.data.timeslot_datetime ||
        !payload.data.duration_minutes ||
        !payload.data.mc_start_datetime ||
        !payload.data.items
    ) {
        console.log(
            `\n================================================================
             \n===============  ERROR - Invalid Payload Format  ===============
             \n================================================================`
        );
        res.status(400).send({
            message: "Invalid payload format",
            must_contain: [
                "data: { appointment_id }",
                "timeslot_datetime",
                "duration_minutes",
                "mc_start_datetime",
                "mc_days",
                "items",
            ],
        });
        return;
    }

    // (3) Update appointment with payload
    console.log(`\n===============  (1) Updating appointment  ===============`);
    let url = `${appointment_URL}/update/${payload.data.appointment_id}`;
    let hasError = false;

    await axios
        .put(url, {
            data: {
                isCompleted: 1,
            },
        })
        .then((response) => {
            console.log(response.data.message);
        })
        // (3.1) If error, handle error and exit
        .catch((error) => {
            hasError = true;

            // (3.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                message = `ERROR - The appointment_microservice is down. ${url}`;
                error_code = 500;
            }
            // (3.1.2) No appointment found - 404
            // - Should not occur
            else if (error.response.status === 404) {
                message = "No appointment found";
                error_code = 404;
            }

            console.log(error);

            // (3.2) Send error to client
            res.status(error_code).send({
                message,
                used_payload: payload,
                error,
            });
            return;
        });
    console.log(
        `==============================================================`
    );

    // (3.1) EXIT - Code stops here
    if (hasError) return;

    // (4) Create medical certificate
    console.log(
        `\n===============  (2) Creating medical certificate  ===============`
    );
    url = `${medical_certificate_URL}/create`;

    // (4.1) Prepare payload for medical certificate
    // E.g.
    // {
    //     "data": {
    //         "appointment_id": 999,
    //         "timeslot_datetime": "2025-10-25 15:30:00",
    //         "duration_minutes": 30,
    //         "mc_start_datetime": "2025-10-25",
    //         "mc_days": 1
    //     }
    // }
    const mc_payload = {
        data: {
            appointment_id: payload.data.appointment_id,
            timeslot_datetime: payload.data.timeslot_datetime,
            duration_minutes: payload.data.duration_minutes,
            mc_start_datetime: payload.data.mc_start_datetime,
            mc_days: payload.data.mc_days,
        },
    };

    // // (4.2) Create medical certificate
    // await axios
    //     .post(url, mc_payload)
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     // (4.3) If error, handle error and exit
    //     .catch((error) => {
    //         hasError = true;
    //         message = `ERROR - The medical_certificate_microservice is down. ${url}`;
    //         console.log(message);
    //         res.status(500).send({
    //             message,
    //             used_payload: mc_payload,
    //             error,
    //         });
    //         return;
    //     });

    // // (4.3) EXIT - Code stops here
    // if (hasError) return;

    // (4.2) Create medical certificate - RabbitMQ
    const exchangeName = "order_topic";
    const topic = "created"; // Example topic

    const queue = "medical_certificate";
    const amqpMessage = Buffer.from(JSON.stringify(mc_payload));

    // (4.2.1) Connect to RabbitMQ
    const connection = await amqp.connect(amqp_URL);
    const channel = await connection.createChannel();

    // (4.2.2) Declare the exchange if not exists
    await channel.assertExchange(exchangeName, "topic", { durable: true });

    // Convert message to JSON
    const messageBuffer = amqpMessage;

    // Publish message to the exchange with the specified topic
    await channel.publish(exchangeName, topic, messageBuffer);

    console.log(`Message published with topic '${topic}':`, amqpMessage);

    // Close connection
    await channel.close();
    await connection.close();

    // (5) Create delivery complex
    console.log(
        `\n===============  (3) Creating delivery complex  ===============`
    );
    url = `${create_delivery_complex_URL}/delivery/create/${payload.data.appointment_id}`;

    await axios
        .post(url, { items: payload.data.items })
        .then((response) => {
            console.log(response.data.message);
        })
        // (5.1) If error, handle error and exit
        .catch((error) => {
            hasError = true;
            const errorData = error.response.data;
            console.log(errorData);

            // (5.1.1) Insufficient stock
            if (errorData.code === 400) {
                message = "Insufficient stock for certain items";
            }
            // (5.1.2) If error.response.status is undefined, microservice is down
            else {
                message = `ERROR - The create_delivery_complex_microservice is down. ${url}`;
            }
            console.log(message);

            res.status(500).send({
                message,
                used_payload: { items: payload.data.items },
                error: errorData,
            });
            return;
        });

    // (5.1) EXIT - Code stops here
    if (hasError) return;

    // (6) Send response to client, success
    res.status(200).send({ message: "Teleconsultation completed" });
    return;
});

/**
 * Makes cancellation request
 * @summary With doctor_id, start_date, and end_date, this function makes a cancellation request.
 * @type {POST} /make_cancellation_request
 * @param {JSON} payload - { data: { doctor_id }, start_date, end_date }
 */
app.post("/make_cancellation_request", async (req, res) => {
    // (1) Get payload from request body
    const payload = req.body;

    // (2) Check payload format
    // - Must have data: { doctor_id }, start_date, end_date
    if (!payload.data.doctor_id || !payload.start_date || !payload.end_date) {
        console.log(
            `\n================================================================
             \n===============  ERROR - Invalid Payload Format  ===============
             \n================================================================`
        );
        res.status(400).send({
            message: "Invalid payload format",
            must_contain: ["data: { doctor_id }", "start_date", "end_date"],
        });
        return;
    }

    // (3) Get all timeslots with payload
    console.log(
        `\n===============  (1) Retrieving affected time slots  ===============`
    );
    let url = `${timeslot_URL}/get/all`;
    let timeslots = await axios
        .get(url, { data: payload })
        .then((response) => {
            // console.log(response.data);
            console.log(`Time slots found: ${response.data.count}`);
            return response.data.data;
        })
        // (3.1) If error, handle error and exit
        .catch((error) => {
            // (3.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                message = `ERROR - The timeslot_microservice is down. ${url}`;
                error_code = 500;
            }
            // (3.1.2) No timeslots found - 404
            else if (error.response.status === 404) {
                message = "No timeslots or appointments found";
                error_code = 404;
            }

            console.log(message);

            // (3.2) Send error to client
            res.status(error_code).send({
                message,
                used_payload: payload,
                error,
            });
            return null;
        });
    console.log(
        `====================================================================`
    );

    // console.log(timeslots);
    // (3.1) EXIT - Code stops here
    if (timeslots === null) return;

    // (4) Get all appointments with payload
    console.log(
        `\n===============  (2) Retrieving affected appointments  ===============`
    );
    url = `${appointment_URL}/get/all`;
    const appointments = await axios
        .get(url, { data: payload })
        .then((response) => {
            // console.log(response.data);
            console.log(`Appointments found: ${response.data.count}`);
            return response.data.data;
        })
        // (4.1) If error, handle error
        // - EXIT only at (4.1.1)
        .catch((error) => {
            // (4.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                let message = `ERROR - The appointment_microservice is down. ${url}`;
                console.log(message);
                res.status(500).send({
                    message,
                    used_payload: payload,
                    error,
                });
                return null;
            }
            console.log("No appointments found");
            // (4.1.2) No appointments found - 404
            return [];
        });
    console.log(
        `======================================================================`
    );

    // console.log(appointments);
    // (4.1.1) EXIT - Code stops here
    if (appointments === null) return;

    // For tracking duplication
    sessions_ids = [];
    number_of_created = 0;
    number_of_duplicates = 0;

    // (5) For each appointment, create a notification
    // - Save the id of the appointment
    // - Do not use forEach or map, as they do not wait for entire completion
    console.log(
        `\n===============  (3) Creating notification for appointments  ===============`
    );
    for (const appointment of appointments) {
        const id = appointment.id;
        sessions_ids.push(id);
        appointment["session_id"] = id;
        appointment["status"] = "new";

        isDown = false;
        // (5.1) Create notification for each appointment
        url = `${notification_URL}/create`;
        await axios
            .post(url, { data: appointment })
            .then((response) => {
                console.log(
                    `${response.data.message} for appointment with id: ${id}`
                );
                number_of_created++;
            })
            // Only when notification already exists
            // - There should not be any other error
            .catch((error) => {
                // (5.1.1) If error.response.status is undefined, microservice is down
                if (error.response === undefined) {
                    let message = `ERROR - The notification_microservice is down. ${url}`;
                    console.log(message);
                    res.status(500).send({
                        message,
                        used_payload: payload,
                        error,
                    });
                    isDown = true;
                    return;
                }

                // console.log(error);
                console.log(
                    `${error.response.data.message} for appointment with id: ${id}`
                );
                number_of_duplicates++;
            });

        // (5.1.1) EXIT - Code stops here
        if (isDown) {
            console.log(
                `============================================================================`
            );
            return;
        }
    }
    console.log(
        `============================================================================`
    );

    // (6) For each timeslot, create a notification
    // - If timeslot id is not in sessions_ids, create notification
    // - Save the id of the timeslot
    // - Do not use forEach or map, as they do not wait for entire completion
    console.log(
        `\n===============  (4) Creating notification for time slots  ===============`
    );
    for (const timeslot of timeslots) {
        const id = timeslot.id;
        sessions_ids.push(id);
        timeslot["session_id"] = id;
        timeslot["status"] = "new";

        // (6.1) Create notification for each timeslot
        url = `${notification_URL}/create`;
        await axios
            .post(url, { data: timeslot })
            .then((response) => {
                console.log(
                    `${response.data.message} for timeslot with id: ${id}`
                );
                number_of_created++;
            })
            // Only when notification already exists
            // - There should not be any other error
            .catch((error) => {
                console.log(
                    `${error.response.data.message} for timeslot with id: ${id}`
                );
                number_of_duplicates++;
            });
    }
    console.log(
        `==========================================================================`
    );

    // Print Notification Stats
    console.log(`\n===============  (5) Notification Stats  ===============`);
    console.log(
        `Total notifications: ${number_of_created + number_of_duplicates}`
    );
    console.log(`Total notifications created: ${number_of_created}`);
    console.log(
        `Total duplicate notifications not created: ${number_of_duplicates}`
    );
    console.log(`========================================================`);

    // (7) Send response to client, success
    res.status(200).send({ message: "Request received" });
    return;
});

// Makes cancellation
// [POST] /booking/make_cancellation/{session_id}

/**
 * Makes cancellation
 * @summary With session_id, this function performs a cancellation and sends a notification.
 * @type {POST} /make_cancellation/{session_id}
 */
app.post("/make_cancellation/:session_id", async (req, res) => {
    // (0) Information
    console.log(`\n===============  (0) Information  ===============`);
    console.log("Note:");
    console.log("- If there is an appointment, there is associated time slot");
    console.log("- But a time slot may not have an associated appointment");
    console.log(`=================================================`);

    // (1) Get session_id from request params
    const session_id = req.params.session_id;

    // (2) Delete all timeslot with that session_id
    console.log(`\n===============  (1) Deleting time slots  ===============`);
    let url = `${timeslot_URL}/delete/${session_id}`;
    const timeslot = await axios
        .delete(url)
        .then((response) => {
            // console.log(response.data);
            console.log(
                `This item slot has been deleted: ${JSON.stringify(
                    response.data.deleted
                )}`
            );
            return response.data.deleted;
        })
        // (2.1) If error, handle error and exit
        .catch((error) => {
            // (3.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                message = `ERROR - The timeslot_microservice is down. ${url}`;
                error_code = 500;
            }
            // (2.1.2) No timeslots found - 404
            else if (error.response.status === 404) {
                message = "No timeslot or appointment found";
                error_code = 404;
            }

            console.log(message);

            // (2.2) Send error to client
            res.status(error_code).send({
                message,
                error,
            });
            return null;
        });
    console.log(`=========================================================`);

    // console.log(timeslots);
    // (2.1) EXIT - Code stops here
    if (timeslot === null) return;

    // (3) Delete all appointments with that session_id
    console.log(
        `\n===============  (2) Deleting appointments  ===============`
    );
    url = `${appointment_URL}/delete/${session_id}`;
    const appointment = await axios
        .delete(url)
        .then((response) => {
            // console.log(response.data);
            console.log(
                `This appointment has been deleted: ${JSON.stringify(
                    response.data.deleted
                )}`
            );
            return response.data.deleted;
        })
        // (3.1) If error, handle error
        // - EXIT only at (4.1.1)
        .catch((error) => {
            // (4.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                let message =
                    "ERROR - The appointment_microservice is down but time slot was already deleted...";
                message +=
                    " Please reset the database, ensure all microservice is running, and retest again.";
                message += " If not, there will be unexpected results.";
                message += `Down site: ${url}`;
                console.log(message);
                res.status(500).send({
                    message,
                    error,
                });
                return null;
            }
            console.log("No appointment found");
            // (3.1.2) No appointments found - 404
            return [];
        });
    console.log(`============================================================`);

    // console.log(appointment);
    // (3.1.1) EXIT - Code stops here
    if (appointment === null) return;

    // (4) Update the one affected notifications to 'completed'
    console.log(
        `\n===============  (3) Updating notifications  ===============`
    );
    url = `${notification_URL}/update/${session_id}`;
    await axios
        .put(url)
        .then((response) => {
            // console.log(response.data);
            console.log(
                `This notification has been updated: ${response.data.message}`
            );
        })
        // (4.1) If error, handle error
        // - EXIT only at (4.1.1)
        .catch((error) => {
            // (4.1.1) If error.response.status is undefined, microservice is down
            if (error.response === undefined) {
                let message = `ERROR - The notification_microservice is down. ${url}`;
                console.log(message);
                res.status(500).send({
                    message,
                    error,
                });
                return;
            }
            // Should never occur
            // - As notification should always exist
            console.log("No notification found");
        });

    console.log(`============================================================`);

    // (5) Status Information
    console.log(`\n===============  (4) Status Information  ===============`);
    console.log(`Cancellation successful`);
    console.log(`Deleted timeslot: ${JSON.stringify(timeslot)}`);
    const statusMessage =
        appointment.length > 0
            ? `Deleted appointment: ${JSON.stringify(appointment)}`
            : "No appointment was deleted";
    console.log(statusMessage);
    console.log(`========================================================`);

    // (6) Send response to client, success
    res.status(200).send({ message: "Cancellation successful" });
});

// On startup - `npm run start`
app.listen(port, () => {
    console.log(
        "This is Express for " + __filename + ": manage_consult_complex ..."
    );
    console.log(`Server running on port ${port}`);
});
// reload(app);
