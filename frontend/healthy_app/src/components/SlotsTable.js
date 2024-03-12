import React from 'react';
import Container from './container';

const SlotsTable = ({ data }) => {
	return (
		<Container>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden border border-gray-200 rounded-md">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Date
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Time
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Patient Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Appointment Type
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.map((item) => (
										<tr key={item.id}>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
												{item.date}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
												{item.time}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
												{item.ptName}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
												{item.appType}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default SlotsTable;
