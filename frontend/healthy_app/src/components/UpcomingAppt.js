import userOneImg from '../../public/doc1.jpeg';
import Image from 'next/image';

const UpcomingAppt = () => {
	return (
		<div className="mt-6 lg:col-span-2 xl:col-auto bg-gray-200 dark:bg-gray-700 rounded-2xl py-8 px-2 flex flex-col items-center">
			{/* first card */}
			<div className="flex flex-col justify-between w-96 h-full bg-white px-5 rounded-2xl py-1 pb-10 dark:bg-trueGray-800 mb-10 mt-4">
				<Avatar
					image={userOneImg}
					name="Dr. Mary Tan"
					title="Cardiologist"
					date="Tue, May 23"
					time="11:30am"
				/>
			</div>

			{/* second card */}
			<div className="flex flex-col justify-between w-96 h-full bg-white px-5 rounded-2xl py-1 pb-10 dark:bg-trueGray-800 mb-10 mt-4">
				<Avatar
					image={userOneImg}
					name="Dr. Mary Tan"
					title="Cardiologist"
					date="Tue, May 23"
					time="11:30am"
				/>
			</div>
		</div>
	);
};

function Avatar(props) {
	return (
		<div className="flex items-center mt-8 space-x-3">
			<div>
				<div className="text-xl font-semibold">{props.name}</div>
				<div className="text-gray-600 dark:text-gray-400 text-lg">
					{props.title}
				</div>
				<div className="text-lg mt-1">
					{' '}
					{/* Added mt-1 for spacing */}
					<div className="text-lg">
						{props.date}, {props.time}
					</div>
				</div>
			</div>

			<div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
				<Image
					src={props.image}
					width="100"
					height="100"
					alt="Avatar"
					placeholder="blur"
				/>
			</div>
		</div>
	);
}

export default UpcomingAppt;
