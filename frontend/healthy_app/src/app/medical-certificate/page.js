'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import TimeslotPicker from '@/components/TimeslotPicker';
import Footer from '@/components/footer';
import DatePickerComponent from '@/components/DatePickerComponent';
import MedicineList from '@/components/MedicineList';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const apptiID = searchParams.get('id');
	const [startDate, setStartDate] = useState('');
	const [day, setDay] = useState(0);

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
						<MedicineList />
						<p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Choose quantity:
						</p>
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
