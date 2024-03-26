import React from 'react';
import Container from './container';

const Inventory = ({data}) => {
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
											ID
										</th>

										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider float-right"
										>
											Quantity
										</th>

									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.map((item) => (
										<tr
											key={item.id}
											className="text-gray-900"
										>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
												{item.id}
											</td>

											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
												{item.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium float-right">
												{item.quantity}
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
  )
}

export default Inventory
