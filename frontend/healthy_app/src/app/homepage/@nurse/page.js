'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import TodayAppt from '@/components/TodayAppt';

import React, { useState } from 'react';
import SlotsTable from '@/components/SlotsTable';

export default function Page() {
	const medicationLogData = [
		{
			id: 1,
			date: '2024-03-01',
			time: '01:00 PM',
			ptName: 'Dr Peter Lam',
			appType: 'Consult',
		},
		{
			id: 2,
			date: '2024-03-09',
			time: '05:00 PM',
			ptName: 'Dr Alice Tan',
			medicinePrescribed: 'Paracetamol',
			appType: 'Consult',
		},
	];
	return (
		<>
			<Navbar />
			<Hero
				title="Nurse homepage"
				description="View requests and inventory"
				heroImg="doc"
			/>
			{/* User Homepage items */}
			<Container>
				<div className="flex flex-row">
					<div className="basis-8/12">
						<Container>
							<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								View All Requests
							</h1>
							<div className="mx-4">
								<SlotsTable data={medicationLogData} />
							</div>
						</Container>

					</div>
					
				</div>
			</Container>

			<div className="container mx-auto p-4 flex justify-center"></div>

			<Footer />
		</>
	);
}
