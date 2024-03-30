"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import DatePickerComponentDoctor from "@/components/DatePickerComponentDoctor";

import React, { useState } from "react";
import TimeslotPicker from "@/components/TimeslotPicker";
const timeslots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero
        title="View Slots"
        description="View the slots you have available and edit them below!"
        heroImg="doc"
      />
      {/* User Homepage items */}
      <Container>
        <div className="flex flex-row">
          <div className="basis-5/12">
            <Container>
              <h3 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 ms-4 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                Add Timeslot:
              </h3>
            </Container>
            <div className="flex flex-col w-full px-4 py-4 text-xs bg-gray-100 rounded-2xl dark:bg-trueGray-800 ">
              <Container className="ms-4">
                <div>
                  <h1 className="text-lg font-bold  ">Date to add:</h1>
                  <DatePickerComponentDoctor />
                </div>
				<div>
				<h1 className="text-lg font-bold  ">Select time:</h1>
				
					<TimeslotPicker></TimeslotPicker>
					
				</div>
				<div>
				<button
                  type="button"
                  className="p-3 mx-8 float-end text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 block"
                >
                  Confirm
                </button>
				</div>
              </Container>
            </div>
          </div>
          <Container className="basis-2/12"></Container>
          <Container className="basis-5/12">
            <h3 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 ms-4 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
              Request Cancel:
            </h3>
            <Container>
              <div className="flex flex-col w-full px-4 py-4 text-xs bg-gray-100 rounded-2xl dark:bg-trueGray-800 ">
                <Container className="ms-4">
                  <div className="mb-5">
                    <h1 className="text-lg font-bold  ">Start Date:</h1>
                    <DatePickerComponentDoctor />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold  ">End Date:</h1>
                    <DatePickerComponentDoctor />
                  </div>
                </Container>
				<div>
				<button
                  type="button"
                  className="p-3 mx-8 float-end text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 block"
                >
                  Confirm
                </button>
				</div>
                
              </div>
            </Container>
          </Container>
        </div>
      </Container>

      <div className="container flex justify-center p-4 mx-auto"></div>

      <Footer />
    </>
  );
}
