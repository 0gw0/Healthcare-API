'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import Inventory from '@/components/Inventory';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import LowInventoryModal from '@/components/LowInventoryModal'; // Import the modal component

export default function Page() {
	// Use state for inventory data
	const [inventoryData, setInventoryData] = useState([]);

	// Use state for data retrieval
	const [hasRetrieved, setHasRetrieved] = useState(false);

	const [showLowInventoryModal, setShowLowInventoryModal] = useState(false);

	// After SSR
	useEffect(() => {
		clearInterval();

		// Get inventory with API
		// - First time get inventory
		if (!hasRetrieved) {
			axios
				.get('http://localhost:8080/inventory/v1/all')
				.then((res) => {
					let data = res.data.data;
					console.log(data);
					setInventoryData(data);
					setHasRetrieved(true);

					// Check for low inventory
					const lowInventoryItems = data.filter(
						(item) => item.quantity < 20
					); // Adjust threshold as needed
					if (lowInventoryItems.length > 0) {
						setShowLowInventoryModal(true);
					}
				})
				// Empty database
				.catch((error) => {
					console.log('No inventory found');
					setInventoryData([]);
				});
		}

		// - Get inventory every 10 seconds
		setInterval(() => {
			axios
				.get('http://localhost:8080/inventory/v1/all')
				.then((res) => {
					let data = res.data.data;
					console.log(data);
					setInventoryData(data);
				})
				// Empty database
				.catch((error) => {
					console.log('No inventory found');
					setInventoryData([]);
				});
		}, 10000);
	}, []);

	return (
		<>
			<Navbar />
			<Hero
				title="Inventory"
				description="Update medication inventory here."
				heroImg="doc"
			/>
			{/* User Homepage items */}
			<Container>
				<div className="flex flex-row">
					<Container>
						<h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
							Inventory Details
						</h1>
						<div className="w-3/4">
							<Inventory data={inventoryData}></Inventory>
						</div>
					</Container>
				</div>
			</Container>

			{/* Low Inventory Modal */}
			{showLowInventoryModal && (
				<LowInventoryModal
					data={inventoryData}
					onClose={() => setShowLowInventoryModal(false)}
				/>
			)}

			<div className="container flex justify-center p-4 mx-auto"></div>

			<Footer />
		</>
	);
}
