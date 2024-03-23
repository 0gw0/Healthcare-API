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
								<thead className="bg-blue-950 text-white">
									<tr>
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
											Start Date
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
										>
											End Date
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
										>
											Confirmation
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.map((item) => (
										
										<tr
											key={item.docid}
											className="text-gray-900"
										>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium ">
												{item.doctor_name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
												{item.start_date}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
												{item.end_date}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm flex items-center justify-center font-medium">
											<button className="rounded-3xl bg-blue-500 text-white m-2 p-4 basis-1/4 text-lg hover:bg-blue-700">
												Accept
											</button>
											<button className="rounded-3xl bg-indigo-700 text-white m-2 p-4 basis-1/4  text-lg hover:bg-indigo-900">
												Decline
											</button>
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
