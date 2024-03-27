'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import DatePickerComponentDoctor from '@/components/DatePickerComponentDoctor';

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
				title="View Slots"
				description="View the slots you have available and edit them below!"
				heroImg="doc"
			/>
			{/* User Homepage items */}
			<Container>
				<div className="flex flex-row">
					<div className="basis-5/12">
						<Container>
							<h3 className="text-xl leading-snug tracking-tight text-gray-800 ms-4 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
								Please choose the date for which you'd like to
								view your available time slots:
							</h3>
						</Container>
						<Container className="ms-4">
							<DatePickerComponentDoctor />
						</Container>
					</div>
					<Container className="basis-7/12">
						<h1 className="mb-2 text-xl leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
							Remove unavailable time slots below:
						</h1>

						<div className="flex flex-col w-full px-4 py-4 text-xs bg-gray-100 rounded-2xl dark:bg-trueGray-800 ">
							<div className="flex flex-row flex-wrap">
								{timeslots.map((data) => (
									<div>
										<button className="p-4 m-2 text-lg text-white rounded-3xl bg-blue-950 basis-1/4 hover:bg-blue-800">
											{data}
										</button>
									</div>
								))}
							</div>
						</div>
					</Container>
				</div>

				<button
					type="button"
					className="float-right p-3 mx-8 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>
					Confirm
				</button>
			</Container>

			<div className="container flex justify-center p-4 mx-auto"></div>

			<Footer />
		</>
	);
}
