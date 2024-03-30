// Framework Express
const express = require('express');
// Get payload from requestor
var bodyParser = require('body-parser');
// HTTP Client
const axios = require('axios');
// CORS
const cors = require('cors');
// Hot-Reload w/ Nodemon
// const reload = require("reload");

// Creating express app
const port = 5109;
const app = express();

/// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Enabling CORS for any unknown origin
// E.g. https://xyz.example.com
app.use(cors());

// Microservices URLs
const user_URL = 'http://host.docker.internal:5001/user';
const timeslot_URL = 'http://host.docker.internal:5002/timeslot';
const appointment_URL = 'http://host.docker.internal:5003/appointment';
const notification_URL = 'http://host.docker.internal:5004/notification';
const inventory_URL = 'http://host.docker.internal:5005/inventory';
const delivery_order_URL = 'http://host.docker.internal:5006/delivery_order';
const payment_URL = 'http://host.docker.internal:5007/payment';
const mc_URL = 'http://host.docker.internal:5008/medical_certificate';

// URLs to reset
const URLsToReset = [
	['user_microservice', user_URL],
	['timeslot_microservice', timeslot_URL],
	['appointment_microservice', appointment_URL],
	['notification_microservice', notification_URL],
	['inventory_microservice', inventory_URL],
	['delivery_order_microservice', delivery_order_URL],
	// ["payment_microservice", payment_URL],
	// ["mc_microservice", mc_URL],
];

// For testing
app.get('/', (req, res) => {
	// res.send("Manage Cancellation Complex Microservice");
	res.send({ Title: 'Manage Dataset Complex Microservice' });
});

/**
 * Resets databases of all microservices
 * @summary Resets databases of all microservices to empty
 * @type {POST} /reset_empty
 */
app.post('/reset_empty', async (req, res) => {
	// (1) Setup
	const endURL = 'reset/empty';
	let hasError = false;

	// (2) Reset all microservices
	for (const resetURL of URLsToReset) {
		const microservice = resetURL[0];
		console.log(`\n===============  ${microservice}  ===============`);
		const url = `${resetURL[1]}/${endURL}`;

		// Async POST request
		await axios
			.post(url)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				hasError = true;
				const message = `Please turn on ${microservice}`;
				console.log(message);
				// console.log(error);
				res.send(
					{
						code: 500,
						message,
						error,
					},
					500
				);
			});

		if (hasError) break;
	}

	if (!hasError) {
		res.send({ code: 200, message: 'All databases are reset to empty' });
	}
	return;
});

/**
 * Resets databases of all microservices to dataset1
 * @summary Resets databases of all microservices to dataset1
 * @type {POST} /dataset1
 */
app.post('/reset_dataset1', async (req, res) => {
	// (1) Setup
	const endURL = 'reset/dataset1';
	let hasError = false;

	// (2) Reset all microservices
	for (const resetURL of URLsToReset) {
		const microservice = resetURL[0];
		console.log(`\n===============  ${microservice}  ===============`);
		const url = `${resetURL[1]}/${endURL}`;

		// Async POST request
		await axios
			.post(url)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				hasError = true;
				const message = `Please turn on ${microservice}`;
				console.log(message);
				// console.log(error);
				res.send(
					{
						code: 500,
						message,
						error,
					},
					500
				);
			});

		if (hasError) break;
	}

	if (!hasError) {
		res.send({ code: 200, message: 'All databases are reset to dataset1' });
	}
	return;
});

// On startup - `npm run start`
app.listen(port, () => {
	console.log(
		'This is Express for ' +
			__filename +
			': manage_cancellation_complex ...'
	);
	console.log(`Server running on port ${port}`);
});
// reload(app);
