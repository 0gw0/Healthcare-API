import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineList = ({ payloadItems, setPayloadItems }) => {
	const [isRetrieved, setIsRetrieved] = useState(false);
	// Initialize medicineList as an empty array
	const [medicineList, setMedicineList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (!isRetrieved) {
			axios
				.get('http://localhost:8080/inventory/v1/all')
				.then((res) => {
					console.log(res.data.data);

					// Set the medicine list from the response
					setMedicineList(res.data.data);
				})
				.catch((error) => {
					console.log(error);
					setMedicineList([
						// Default list in case of error
						{ id: 1, name: 'Paracetamol', quantity: 30 },
						{ id: 2, name: 'Hydrocodone', quantity: 29 },
						{ id: 3, name: 'Metformin', quantity: 16 },
						{ id: 4, name: 'Losartan', quantity: 19 },
						{ id: 5, name: 'Antibiotics', quantity: 12 },
						{ id: 6, name: 'Albuterol', quantity: 37 },
						{ id: 7, name: 'Antihistamine', quantity: 23 },
						{ id: 8, name: 'Gabapentin', quantity: 25 },
					]);
				});
			setIsRetrieved(true);
		}
	}, [isRetrieved]);

	const handleUpdate = (e) => {
		const id = e.target.id.split('-')[2];
		const name = e.target.id.split('-')[3];
		const quantity = e.target.value;

		// Add the selected medicine to the payloadItems array
		setPayloadItems((prevItems) => {
			const newItems = prevItems.filter(
				(item) => item.id !== parseInt(id)
			);
			if (quantity > 0) {
				newItems.push({
					id: parseInt(id),
					name: name,
					quantity: parseInt(quantity),
				});
			}
			return newItems;
		});

		// Log the payloadItems array
		// - Note: This will be the previous state of the payloadItems array
		console.log(payloadItems);
	};

	return (
		<div>
			{/* Search bar */}
			<input
				type="text"
				placeholder="Search for medicine"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mb-4 p-2 border rounded-lg"
			/>

			<div className="grid grid-cols-4 gap-4">
				{medicineList
					.filter((medicine) =>
						medicine.name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					)
					.map((medicine) => (
						<div
							key={medicine.id}
							className="p-4 rounded-lg shadow-lg"
						>
							<p>{medicine.name}</p>
							<div className="relative flex items-center max-w-[8rem]">
								<input
									type="number"
									id={`quantity-input-${medicine.id}-${medicine.name}`}
									min={0}
									max={medicine.quantity}
									aria-describedby={`helper-text-explanation-${medicine.id}`}
									className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="0"
									// Add the selected medicine to the payloadItems array
									onChange={handleUpdate}
								/>
							</div>
							<p
								id={`helper-text-explanation-${medicine.id}`}
								className="mt-2 text-sm text-red-600 dark:text-gray-400"
							>
								* only {medicine.quantity} left
							</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default MedicineList;
