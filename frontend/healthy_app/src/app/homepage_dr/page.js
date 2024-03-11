'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import TodayAppt from '@/components/TodayAppt';

import React, { useState } from 'react';

export default function Page() {
	return (
		<>
			<Navbar />
			<Hero title="Homepage" />
			{/* User Homepage items */}
			<div className="flex flex-row">
				<div className="basis-8/12">
					<Container>
						<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                        View All Slots
						</h1>
					</Container>
					<div className="flex flex-row">
						<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
							History
						</h1>
						
						
					</div>
				</div>
				<Container className="basis-4/12">
					<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
						Today's Appointments
					</h1>

					<TodayAppt></TodayAppt>
				</Container>
			</div>

			
			<div className="container mx-auto p-4 flex justify-center">
			</div>

			<Footer />
		</>
	);
}
