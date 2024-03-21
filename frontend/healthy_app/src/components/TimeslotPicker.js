'use client';
const TimeslotPicker = () => {
	const timeslots = [
		'09:00 - 10:00',
		'10:00 - 11:00',
		'11:00 - 12:00',
		'13:00 - 14:00',
		'14:00 - 15:00',
		'15:00 - 16:00',
		'16:00 - 17:00',
		'17:00 - 18:00',
	];
	return (
		<div className="lg:col-span-2 xl:col-auto">
			<div className="flex flex-col justify-between w-3/4 h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
				<div className="flex-row items-center mb-4">
					{timeslots.map((data) => (
						<div>
							<input
								id={data}
								type="radio"
								value=""
								name="default-radio"
								className="w-8 h-4 "
							/>
							<label
								htmlFor={data}
								className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
							>
								{data}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default TimeslotPicker;
