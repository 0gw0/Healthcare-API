import userOneImg from '../../public/doc1.jpeg';
import Image from 'next/image';

const GreyBox = () => {
	return (
		<div className="lg:col-span-2 xl:col-auto">
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

export default GreyBox;
