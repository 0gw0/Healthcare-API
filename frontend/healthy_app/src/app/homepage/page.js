import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';

export default function Page() {
	return (
		<>
			<Navbar />
			<Hero />
			<div className="flex flex-row">
				<div className="basis-8/12">
					<Container>
						<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
							Specialty
						</h1>
					</Container>
					<div className="flex flex-row">
						<Container className="basis-1/2">
							<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								Prescription Status
							</h1>
						</Container>
						<Container className="basis-1/2">
							<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
								History
							</h1>
						</Container>
					</div>
				</div>
				<Container className="basis-4/12">
					<h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
						Upcoming Appointments
					</h1>
				</Container>
			</div>
		</>
	);
}
