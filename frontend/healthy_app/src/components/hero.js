import Image from 'next/image';
import doctorImg from '../../public/hero.svg';
import timeImg from '../../public/time.svg';
import Container from './container';

const Hero = ({ title, description, heroImg }) => {
	return (
		<>
			<Container className="pb-0">
				<div className="flex items-center justify-start gap-6 lg:gap-28 xl:gap-36">
					<div className="max-w-2xl">
						<h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
							{title}
						</h1>
						<p className="py-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-xl dark:text-gray-300">
							{description}
						</p>
					</div>
					<div className="flex items-center justify-center">
						<div className="w-40">
							<Image
								src={heroImg == 'doc' ? doctorImg : timeImg}
								alt="Hero Illustration"
								loading="eager"
							/>
						</div>
					</div>
				</div>
			</Container>
			<hr className="w-9/12 h-1 ms-5 my-1 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700" />
		</>
	);
};

export default Hero;
