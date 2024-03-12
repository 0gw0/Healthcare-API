import React from 'react';

const HistoryLog = ({ data }) => {
    
  return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden border border-gray-200 rounded-md">
						<table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr className="bg-blue-950 text-white">
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										Time
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										Doctor Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										Medicine Prescribed
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										MC issued
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									>
										Medicine Delivered
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{data.map((item) => (
									<tr key={item.id} className="text-gray-900">
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium ">
											{item.date}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
											{item.time}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
											{item.doctorname}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
											{item.medicinePrescribed}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
											{item.mcissued}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
											{item.medicineDelivered}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
  );
};

export default HistoryLog;
