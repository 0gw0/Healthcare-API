import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineList = () => {
	const [isRetrieved, setIsRetrieved] = useState(false);
	// Initialize medicineList as an empty array
	const [medicineList, setMedicineList] = useState([]);

	useEffect(() => {
		if (!isRetrieved) {
			axios
				.get('http://127.0.0.1:5005/inventory/get/all')
				.then((res) => {
					// Set the medicine list from the response
					setMedicineList(res.data.data);
					setIsRetrieved(true);
				})
				.catch((error) => {
					console.log(error);
					// Set the medicine list to a default value in case of error
					setMedicineList([
						{ id: 1, name: 'Paracetamol', quantity: 30 },
						{ id: 2, name: 'Hydrocodone', quantity: 29 },
						{ id: 3, name: 'Metformin', quantity: 16 },
						{ id: 4, name: 'Losartan', quantity: 19 },
						{ id: 5, name: 'Antibiotics', quantity: 12 },
						{ id: 6, name: 'Albuterol', quantity: 37 },
						{ id: 7, name: 'Antihistamine', quantity: 23 },
						{ id: 8, name: 'Gabapentin', quantity: 25 },
					]);
					setIsRetrieved(true);
				});
		}
	}, [isRetrieved]);
	return (
		<div className="grid grid-cols-4 gap-4">
			{medicineList.map((medicine) => (
				<div key={medicine.id} className="p-4 shadow-lg rounded-lg">
					<p>{medicine.name}</p>
					<div className="relative flex items-center max-w-[8rem]">
						<input
							type="number"
							id={`quantity-input-${medicine.id}`}
							min={0}
							max={medicine.quantity}
							aria-describedby={`helper-text-explanation-${medicine.id}`}
							className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="0"
						/>
					</div>
					<p
						id={`helper-text-explanation-${medicine.id}`}
						className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-red-600"
					>
						* only {medicine.quantity} left
					</p>
				</div>
			))}
		</div>
	);
};

export default MedicineList;
