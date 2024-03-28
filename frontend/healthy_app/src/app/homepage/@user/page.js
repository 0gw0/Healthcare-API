'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import GreyBox from '@/components/GreyBox';
import Footer from '@/components/footer';
import UpcomingAppt from '@/components/UpcomingAppt';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';
import axios from 'axios';

export default function Page() {
	const [patient, setPatient] = useState({});
	const [isDetailsShown, setIsDetailsShown] = useState(false);

	const togglePersonalDetails = () => {
		setIsDetailsShown(!isDetailsShown);
	};

	const maskString = (str) => {
		if (str === undefined) return '';
		if (!isDetailsShown) {
			const first2 = str.slice(0, 2);
			const last2 = str.slice(-2);
			const middleLength = str.length - 4;
			const maskedMiddle = '*'.repeat(middleLength);
			return `${first2}${maskedMiddle}${last2}`;
		}
		return str;
	};

	// Prevents rerender retrieval
	useEffect(() => {
		// From login page
		// - If no cookies, set cookies
		if (!hasCookie('userData')) {
			// Get user data from user_microservice
			axios
				.get('http://127.0.0.1:5001/user/get/patients/1')
				.then((res) => {
					const data = res.data.data;
					// console.log(res.data.data);

					// Set user type as patient
					setCookie('userType', 'patient');
					// Set user data
					setCookie('userData', data);
					setPatient(data);
				})
				// Empty database - We use hardcoded dummy login data
				.catch((error) => {
					const dummyData = {
						age: 38,
						contactNo: '9425 6214',
						email: 'Pdwight.schrute@gmail.com',
						fname: 'Dwight',
						gender: 'M',
						id: 1,
						lname: 'Schrute',
						password: 'pass123',
						salutation: 'Mr',
						username: 'pat1',
					};
					// Set user type as patient
					setCookie('userType', 'patient');
					// Set user data
					setCookie('userData', dummyData);
					setPatient(dummyData);
				});
		}
		// From other pages
		else {
			let userData = JSON.parse(getCookie('userData'));
			setPatient(userData);
		}
	}, []);

	return (
		<>
			<Navbar />
			<Hero
				title="Homepage"
				description="Book and manage your consultations below."
				heroImg="doc"
			/>
			{/* User Homepage items */}
			<Container className="pt-0">
				<div className="flex flex-row">
					{/* Left */}
					<div className="basis-5/12">
						{/* Greetings */}
						<Container>
							<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								Hello, {patient.salutation} {patient.fname}{' '}
								{patient.lname}
							</h1>
							<p className="ml-4 leading-snug tracking-tight text-gray-800 lg:leading-tight xl:text-2xl xl:leading-tight dark:text-white">
								Welcome back!
							</p>
						</Container>

						{/* Personal Details */}
						<Container className="basis-1/2">
							<h1 className="ml-4 text-2xl font-bold leading-snug text-gray-800 lg:text-2xl lg:leading-tight xl:leading-tight dark:text-white">
								Personal Details:
								{/* Add an eye icon with click handler */}
								<span
									className="ml-2 cursor-pointer"
									onClick={togglePersonalDetails}
								>
									<FontAwesomeIcon
										icon={
											isDetailsShown ? faEye : faEyeSlash
										}
									/>
								</span>
							</h1>
							<div className="ml-4">
								<p className="leading-snug text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
									<span className="font-bold">Email:</span>{' '}
									{maskString(patient.email)}
								</p>
								<p className="leading-snug text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
									<span className="font-bold">
										Contact Number:
									</span>{' '}
									{maskString(patient.contactNo)}
								</p>
								<p className="leading-snug text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
									<span className="font-bold">Age:</span>{' '}
									{isDetailsShown ? patient.age : '**'}
								</p>
							</div>
						</Container>

						{/* Account Details */}
						<Container className="basis-1/2">
							<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:leading-tight dark:text-white">
								Account Details:
							</h1>
							<p className="ml-4 leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
								<span className="font-bold">username: </span>{' '}
								{isDetailsShown ? patient.username : '*****'}
							</p>
						</Container>
						{/* <Container className="basis-1/2">
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                History
                            </h1>
                            <div className="grid mt-4 lg:grid-cols-1 xl:grid-cols-2">
                                <GreyBox />
                            </div>
                        </Container> */}
					</div>

					{/* Right */}
					<Container className="basis-4/12">
						<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
							Upcoming Appointments
						</h1>

						<UpcomingAppt></UpcomingAppt>
					</Container>
				</div>

				<div className="container flex justify-center p-4 mx-auto"></div>
			</Container>
			<Footer />
		</>
	);
}
