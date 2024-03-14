"use client"; // This is a client component

import Navbar2 from "@/components/Navbar2";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import DatePickerComponent from "@/components/DatePickerComponent";

import React, { useState } from "react";

export default function Page() {
  return (
    <>
      <Navbar2 />
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
              <h3 className="ml-4 text-xl leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                Please choose the date for which you'd like to view your
                available time slots :
              </h3>
            </Container>

            <div className="flex flex-row">
              <Container className="basis-1/2">
                <DatePickerComponent />
                <Container>
                  <div className="flex flex-col text-xs justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
                    <div className="flex items-center my-2">
                      <div className="h-4 w-4 rounded-full bg-blue-950 mr-2"></div>
                      A patient has booked this slot
                    </div>
                    <div className="flex items-center my-2">
                      <div className="h-4 w-4 rounded-full bg-indigo-300 mr-2"></div>
                      No patient has booked this slot yet
                    </div>
                  </div>
                </Container>
              </Container>
            </div>
          </div>
          <Container className="basis-7/12">
            <h1 className="text-xl  leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
              Time Slots for selected date:
            </h1>

			<div className="flex flex-col text-xs  w-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800 ">
				<div className="flex flex-row flex-wrap">
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">09:00-10:00</button></div>
				<div><button className="rounded-3xl bg-indigo-300 text-white m-2 p-4 basis-1/4 text-lg">10:00-11:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">11:00-12:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">13:00-14:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">14:00-15:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">15:00-16:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">16:00-17:00</button></div>
				<div><button className="rounded-3xl bg-blue-950 text-white m-2 p-4 basis-1/4 text-lg">17:00-18:00</button></div>
				
				</div>
				
			</div>
            
          </Container>
        </div>

        <button
          type="button"
          class="mx-8 p-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 float-right"
        >
          Edit Time Slots
        </button>
      </Container>

      <div className="container mx-auto p-4 flex justify-center"></div>

      <Footer />
    </>
  );
}
