"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import TimeslotPicker from "@/components/TimeslotPicker";
import Footer from "@/components/footer";
import DatePickerComponent from "@/components/DatePickerComponent";

import React, { useState } from "react";

export default function Page() {
  const [dateReceived, setDateReceived] = useState("");
  const [quantity, setApptID] = useState(0);
  const [duration, setDuration] = useState(0);
  const [day, setDay] = useState(0);


  const handleClearForm = () => {
    // Clear form fields
    setDateReceived("");
    setApptID(0);
	setDuration(0);
	setDay(0);
  };
  return (
    <>
      <Navbar />
      <Hero
        title="Doctor medical certificate"
        description="Issue medical certificates to patients."
        heroImg="doc"
      />

      {/* User Homepage items */}
      <Container>
        <div className="bg-white shadow-md rounded-lg px-8 py-5 mx-20">
          <h2 className="text-xl font-medium mb-4">
            Issue Medical Certificate
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {" "}
            {/* Prevent default form submission */}
			<div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-2"
              >
                Appointment ID
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={quantity}
                onChange={(e) => setApptID(e.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dateReceived"
                className="block text-sm font-medium mb-2"
              >
                Date Received
              </label>
              <input
                type="date"
                id="dateReceived"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={duration}
                onChange={(e) => setDateReceived(e.target.value)}
                required
              />
            </div>
			<div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-2"
              >
                Duration
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={quantity}
                onChange={(e) => setDuration(e.parseInt(e.target.value))}
                required
              />
            </div>
			<div className="mb-4">
              <label
                htmlFor="dateReceived"
                className="block text-sm font-medium mb-2"
              >
                Number of days of MC
              </label>
              <input
                type="quantity"
                id="dateReceived"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              />
            </div>
            
            <button
              type="button" 
              className="w-full py-2 px-4 bg-blue-950 text-white font-medium rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 hover:text-blue-700"
              onClick={handleClearForm}
            >
              Issue MC
            </button>
          </form>
        </div>
      </Container>

      <div className="container mx-auto p-4 flex justify-center"></div>

      <Footer />
    </>
  );
}
