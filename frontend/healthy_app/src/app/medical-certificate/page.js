'use client'; // This is a client component

import Navbar from '@/components/Navbar';
import Container from '@/components/container';
import Hero from '@/components/hero';
import TimeslotPicker from '@/components/TimeslotPicker';
import Footer from '@/components/footer';
import DatePickerComponent from '@/components/DatePickerComponent';

import React, { useState } from 'react';



export default function Page() {
	return (
		<>

			{/* User Homepage items */}
			<Container>

				<div className='text-9xl'>
                    Thanks Hyinki :D
                </div>

			</Container>

			<div className="container mx-auto p-4 flex justify-center"></div>

			<Footer />
		</>
	);
}
