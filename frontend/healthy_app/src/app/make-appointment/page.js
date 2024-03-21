'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import TimeslotPicker from '@/components/TimeslotPicker';
import Footer from '@/components/footer';
import DatePickerComponent from '@/components/DatePickerComponent';

import React, { useState } from 'react';

const timeslots = [
	'09:00 - 10:00',
	'10:00 - 11:00',
	'11:00 - 12:00',
	'13:00 - 14:00',
	'14:00 - 15:00',
	'15:00 - 16:00',
	'16:00 - 17:00',
	'17:00 - 18:00',
];

export default function Page() {
	return (
		<>
			<Navbar />
			<Hero
				title="Make Appointment"
				description="Book appointments with our doctors here."
				heroImg="doc"
			/>
			{/* User Homepage items */}
			<Container>
				<div className="flex flex-row">
					<div className="basis-5/12">
						<Container>
							<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								Make an Appointment
							</h1>
							<h3 className="ml-4 text-xl leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
								Select the desired date for your appointment
								below:
							</h3>
						</Container>

						<div className="flex flex-row">
							<Container className="basis-1/2">
								<DatePickerComponent />
							</Container>
						</div>
					</div>
					<Container className="basis-7/12">
						<h1 className="text-xl font-bold mb-2 leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
							Appointment slots available for selected date:
						</h1>

						<TimeslotPicker></TimeslotPicker>
					</Container>
				</div>

				<button
					type="button"
					className="mx-8 p-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 float-right"
				>
					Confirm Appointment
				</button>
			</Container>

			<div className="container mx-auto p-4 flex justify-center"></div>

			<Footer />
		</>
	);
}
