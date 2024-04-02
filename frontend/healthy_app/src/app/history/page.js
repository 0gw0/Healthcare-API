'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import HistoryLog from '@/components/HistoryLog';

import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const LOCAL_URL = "localhost"
const PEER_URL = "172.20.10.8"
const URL_TO_USE = PEER_URL

export default function Page() {
	const [medicationLogData, setMedicationLogData] = useState([]);

	const [isRetrieved, setIsRetrieved] = useState(false);

	// Prevents multiple API calls from rendering multiple times
	useEffect(() => {
		if (!isRetrieved) {
			// User type dynamic
			// - If cookie userType is patient, get patient_id from cookie
			// - If cookie userType is doctor, get doctor_id from cookie
			const userType = getCookie('userType');
			const userData = JSON.parse(getCookie('userData'));
			// console.log(userType);
			// console.log(userData);

			// Prep payload
			const payload =
				userType === 'doctor'
					? {
							data: {
								doctor_id: userData.id,
								isCompleted: 1,
							},
					  }
					: {
							data: {
								patient_id: userData.id,
								isCompleted: 1,
							},
					  };

			// console.log(payload);

			// Get all upcoming appointments by API
			axios
				.post(`http://${URL_TO_USE}:8080/appointment/v1/all`, payload)
				.then((res) => {
					const Appts = res.data.data;

					// Order by date (YYYY-MM-DD) and time (HH:MM:SS)
					Appts.sort((a, b) => {
						return (
							new Date(b.timeslot_datetime) -
							new Date(a.timeslot_datetime)
						);
					});

					console.log(Appts);

					setMedicationLogData(Appts);
				})
				// Empty database
				.catch((error) => {
					setMedicationLogData([]);
				});
			setIsRetrieved(true);
		}
	}, []);

	// Hardcoded data for testing
	// const medicationLogData = [
	//     {
	//         id: 1,
	//         date: "2024-03-01",
	//         time: "01:00 PM",
	//         doctorname: "Dr Peter Lam",
	//         medicinePrescribed: "Paracetamol",
	//         mcissued: "Yes",
	//         medicineDelivered: "Yes",
	//     },
	//     {
	//         id: 2,
	//         date: "2024-03-09",
	//         time: "05:00 PM",
	//         doctorname: "Dr Alice Tan",
	//         medicinePrescribed: "Paracetamol",
	//         mcissued: "Yes",
	//         medicineDelivered: "No",
	//     },
	// ];

	return (
		<>
			<Navbar />
			<Hero
				title="History"
				description="View previous appointments here."
				heroImg="time"
			/>
			{/* User Homepage items */}
			<Container>
				<div className="flex flex-row">
					<div className="basis-5/12">
						<Container>
							<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								Past Teleconsultation Details
							</h1>
						</Container>
					</div>
				</div>

				{/* No History */}
				{medicationLogData.length === 0 && (
					<div className="flex flex-col justify-between h-full px-5 py-5 mt-5 text-white rounded bg-blue-950 w-100 dark:bg-trueGray-800">
						<div className="text-xl font-semibold text-center">
							No Past Teleconsultations
						</div>
					</div>
				)}

				{/* Have History */}
				{medicationLogData.length !== 0 && (
					<HistoryLog data={medicationLogData}></HistoryLog>
				)}
			</Container>

			<div className="container flex justify-center p-4 mx-auto"></div>

			<Footer />
		</>
	);
}
