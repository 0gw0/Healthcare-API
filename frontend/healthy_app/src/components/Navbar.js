'use client';
import React from 'react';
import {
	Button,
	Navbar,
	Collapse,
	Typography,
	IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import icon from '../../public/icon.png';

function NavList() {
	return (
		<ul className="mt-2 mb-4 p-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="white"
				className="p-1 font-medium"
			>
				<a
					href="#"
					className="flex items-center hover:text-blue-100 transition-colors"
				>
					<strong>Homepage</strong>
					
				</a>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="white"
				className="p-1 font-medium"
			>
				<a
					href="#"
					className="flex items-center hover:text-blue-100 transition-colors"
				>
					Make Appointment
				</a>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="white"
				className="p-1 font-medium"
			>
				<a
					href="#"
					className="flex items-center hover:text-blue-100 transition-colors"
				>
					History
				</a>
			</Typography>
			<div className="flex items-center gap-x-1">
				<Button
					color="white"
					variant="gradient"
					size="sm"
					className="hidden lg:inline-block"
				>
					<span>Log Out</span>
				</Button>
			</div>
		</ul>
	);
}

export function NavbarSimple() {
	const [openNav, setOpenNav] = React.useState(false);

	const handleWindowResize = () =>
		window.innerWidth >= 960 && setOpenNav(false);

	React.useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<Navbar
			variant="gradient"
			color="blue-gray"
			className="mx-auto max-w-screen-3xl from-indigo-900 to-indigo-800 px-4 py-3"
		>
			<div className="flex items-center justify-between text-white">
				<Typography
					as="a"
					href="#"
					variant="h6"
					className="mr-4 cursor-pointer py-1.5"
				>
					YATA
				</Typography>
				<div className="hidden lg:block">
					<NavList />
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-6 w-6" strokeWidth={2} />
					) : (
						<Bars3Icon className="h-6 w-6" strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<NavList />
			</Collapse>
		</Navbar>
	);
}
