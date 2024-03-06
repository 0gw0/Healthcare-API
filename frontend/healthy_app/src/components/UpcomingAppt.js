import userOneImg from '../../public/doc1.jpeg';
import Image from 'next/image';

const UpcomingAppt = () => {
	return (
		<div className="lg:col-span-2 xl:col-auto">
			<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
						Upcoming Appointments 
					</h1>
			<div className="flex flex-col justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
				<p className="text-2xl leading-normal ">Tue, May 23</p>

				<Avatar
					image={userOneImg}
					name="Dr. Mary Tan"
					title="Cardiologist"
				/>
			</div>
		</div>
	);
};

function Avatar(props) {
	return (
        
		<div className="flex items-center mt-8 space-x-3">
            
			<div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
				<Image
					src={props.image}
					width="40"
					height="40"
					alt="Avatar"
					placeholder="blur"
				/>
			</div>
			<div>
				<div className="text-lg font-medium">{props.name}</div>
				<div className="text-gray-600 dark:text-gray-400">
					{props.title}
				</div>
			</div>
		</div>
	);
}

export default UpcomingAppt;
