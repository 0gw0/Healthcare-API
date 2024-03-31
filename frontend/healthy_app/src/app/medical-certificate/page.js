'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import TimeslotPicker from '@/components/TimeslotPicker';
import Footer from '@/components/footer';
import DatePickerComponent from '@/components/DatePickerComponent';
import { initInputCounters } from 'flowbite';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const apptiID = searchParams.get('id');
	const [startDate, setStartDate] = useState('');
	const [day, setDay] = useState(0);

	useEffect(() => {
		initInputCounters({
			min: 0,
		});
	}, []);

	const handleClearForm = () => {
		// Clear form fields
		setStartDate('');
		setDay(0);
	};
	return (
		<>
			<Navbar />
			<Hero
				title="Doctor medical certificate"
				description="Issue medical certificates to patients."
				heroImg="doc"
			/>

			{/* User Homepage items */}
			<Container>
				<div className="bg-white shadow-md rounded-lg px-8 py-5 mx-20">
					<h2 className="text-xl font-medium mb-4">
						Issue Medical Certificate
					</h2>
					<form onSubmit={(e) => e.preventDefault()}>
						{' '}
						{/* Prevent default form submission */}
						<div className="mb-4">
							<a className="block text-sm font-medium mb-2">
								Appointment ID:{' '}
								<a className="font-normal">{apptiID}</a>
							</a>
						</div>
						<div className="mb-4">
							<label
								htmlFor="dateReceived"
								className="block text-sm font-medium mb-2"
							>
								Start Date
							</label>
							<input
								type="date"
								id="dateReceived"
								className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="numberOfDays"
								className="block text-sm font-medium mb-2"
							>
								Number of days of MC
							</label>
							<input
								type="number"
								min="0"
								id="numberOfDays"
								className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
								value={day}
								onChange={(e) => setDay(e.target.value)}
								required
							/>
						</div>
						{/* Medication Selection section */}
						<br />
						<h2 className="text-xl font-medium mb-4">
							Select Medication
						</h2>
						{/* Searchbar Start */}
						<div className="mb-3 md:w-96">
							<div className="relative mb-4 flex w-full flex-wrap items-stretch">
								<input
									type="search"
									className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
									placeholder="Search"
									aria-label="Search"
									aria-describedby="button-addon3"
								/>

								{/* <!--Search button--> */}
								<button
									className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
									type="button"
									id="button-addon3"
								>
									Search
								</button>
							</div>
						</div>
						{/* Searchbar End */}
						{/* Quantity Selector Start */}
						<label
							htmlFor="quantity-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Choose quantity:
						</label>
						<div className="relative flex items-center max-w-[8rem]">
							<button
								type="button"
								id="decrement-button"
								data-input-counter-decrement="quantity-input"
								className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
							>
								<svg
									className="w-3 h-3 text-gray-900 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 2"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 1h16"
									/>
								</svg>
							</button>
							<input
								type="text"
								id="quantity-input"
								data-input-counter
								data-counter-min="0"
								aria-describedby="helper-text-explanation"
								className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="0"
								required
							/>
							<button
								type="button"
								id="increment-button"
								data-input-counter-increment="quantity-input"
								className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
							>
								<svg
									className="w-3 h-3 text-gray-900 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 18"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 1v16M1 9h16"
									/>
								</svg>
							</button>
						</div>
						<p
							id="helper-text-explanation"
							className="mt-2 text-sm text-gray-500 dark:text-gray-400"
						>
							Please select a number from 0 to 9.
						</p>
						{/* Quantity Selector End */}
						<button
							type="button"
							className="w-full py-2 px-4 bg-blue-950 text-white font-medium rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 hover:text-blue-700"
							onClick={handleClearForm}
						>
							Issue MC
						</button>
					</form>
				</div>
			</Container>

			<div className="container mx-auto p-4 flex justify-center"></div>

			<Footer />
		</>
	);
}
