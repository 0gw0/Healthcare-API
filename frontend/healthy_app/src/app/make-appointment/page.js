"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import TimeslotPicker from "@/components/TimeslotPicker";
import Footer from "@/components/footer";
import DatePickerComponent from "@/components/DatePickerComponent";

import React, { useState } from "react";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* User Homepage items */}
      <Container>
        <div className="flex flex-row">
          <div className="basis-5/12">
            <Container>
              <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                Make an Appointment
              </h1>
              <h3 className="ml-4 text-xl leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                Select the desired date for your appointment below:
              </h3>
            </Container>

            <div className="flex flex-row">
              <Container className="basis-1/2">
                <DatePickerComponent />
              </Container>
            </div>
          </div>
          <Container className="basis-7/12">
            <h1 className="text-xl  leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
              Slots available for selected date:
            </h1>

            <TimeslotPicker></TimeslotPicker>
          </Container>
        </div>

        <button
          type="button"
          class="mx-8 p-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 float-right"
        >
          Confirm Appointment
        </button>
      </Container>

      <div className="container mx-auto p-4 flex justify-center"></div>

      <Footer />
    </>
  );
}
