import Image from 'next/image';
import heroImg from '../../public/hero.svg';
import Container from './container';

const Hero = ({title}) => {
	return (
		<>
			<Container>
				<div className="flex items-center justify-center gap-6 lg:gap-28 xl:gap-36">
					<div className="max-w-2xl">
						<h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
							{title}
						</h1>
						<p className="py-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-xl dark:text-gray-300">
							Book and manage your consultations below
						</p>
					</div>
					<div className="flex items-center justify-center">
						<div className="w-64">
							<Image
								src={heroImg}
								alt="Hero Illustration"
								loading="eager"
							/>
						</div>
					</div>
				</div>
			</Container>
			<hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
		</>
	);
};

export default Hero;
