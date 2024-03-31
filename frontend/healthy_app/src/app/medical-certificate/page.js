"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import TimeslotPicker from "@/components/TimeslotPicker";
import Footer from "@/components/footer";
import DatePickerComponent from "@/components/DatePickerComponent";
import MedicineList from "@/components/MedicineList";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Page() {
    // Track Zoom meeting status
    const [isMeetingStarted, setIsMeetingStarted] = useState(false);

    // Get appointment ID from URL
    const searchParams = useSearchParams();
    const apptiID = searchParams.get("id");

    // Track MC form fields
    // - Default date is today. E.g. 2024-03-21
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    // - Number of days of MC. Default is 0
    const [day, setDay] = useState(0);

    const handleZoomMeeting = async () => {
        // Start Zoom meeting with API
        await axios
            .post("http://127.0.0.1:5009/zoom/start")
            .then((res) => {
                console.log(res);

                const zoom_link = res.data.data.zoom_invite_link;
                window.open(zoom_link, "_blank");
            })
            .catch((error) => {
                console.log(error);
            });

        // window.open("https://smu-sg.zoom.us/meeting#/pmi/6346697940", "_blank");

        // Set Zoom meeting status to true
        setIsMeetingStarted(true);
    };

    const handleIssueMC = () => {
        // Clear form fields
        setStartDate("");
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
                {/* Zoom Meeting Button */}
                <div className="grid justify-items-center">
                    {isMeetingStarted ? (
                        <button
                            className="px-4 py-2 text-lg text-white bg-gray-500 cursor-not-allowed rounded-xl"
                            disabled
                        >
                            Started Zoom Meeting
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 text-lg text-white bg-blue-500 rounded-xl hover:bg-blue-700"
                            onClick={handleZoomMeeting}
                        >
                            Start Zoom Meeting
                        </button>
                    )}
                </div>

                {/* Issue MC Form */}
                <div className="px-8 py-5 mx-20 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-medium">
                        Issue Medical Certificate
                    </h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {" "}
                        {/* Prevent default form submission */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Appointment ID:{" "}
                                <label className="font-normal">{apptiID}</label>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dateReceived"
                                className="block mb-2 text-sm font-medium"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="dateReceived"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={startDate}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setStartDate(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="numberOfDays"
                                className="block mb-2 text-sm font-medium"
                            >
                                Number of days of MC
                            </label>
                            <input
                                type="number"
                                min="0"
                                id="numberOfDays"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        {/* Medication Selection section */}
                        <h2 className="mb-4 text-xl font-medium">
                            Select Medication
                        </h2>
                        <MedicineList />
                        <br />
                        {/* Confirm and Issue MC */}
                        <button
                            type="button"
                            className="w-full px-4 py-2 font-medium text-white rounded-lg bg-blue-950 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 hover:text-blue-700"
                            onClick={handleIssueMC}
                        >
                            Issue MC
                        </button>
                    </form>
                </div>
            </Container>
            <div className="container flex justify-center p-4 mx-auto"></div>

            <Footer />
        </>
    );
}
