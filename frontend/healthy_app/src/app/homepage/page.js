import { NavbarSimple } from '@/components/Navbar';
import Image from 'next/image';
import bgImg from '../../../public/bg_header.png';

export default function Homepage() {
	return (
		<>
			<NavbarSimple />
			<div className="relative w-full lg:h-64 md:h-44 h-28 overflow-hidden">
				<Image
					src={bgImg}
					className="min-w-full h-full object-cover object-left"
				/>
			</div>
		</>
	);
}
