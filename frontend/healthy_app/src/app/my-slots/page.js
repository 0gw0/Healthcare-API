"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import DatePickerComponentDoctor from "@/components/DatePickerComponentDoctor";
import DatePickerComponentDoctor2 from "@/components/DatePickerComponentDoctor2";
import DatePickerComponentDoctor3 from "@/components/DatePickerComponentDoctor3";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Doctor Work Hours: 8:30 - 17:30
// - Default time slots to be created
const timeslots = [
    "08:30:00",
    "09:30:00",
    "10:30:00",
    "11:30:00",
    "12:30:00",
    "13:30:00",
    "14:30:00",
    "15:30:00",
    "16:30:00",
    "17:30:00",
];

const LOCAL_URL = "localhost";
const PEER_URL = "172.20.10.8";
const URL_TO_USE = PEER_URL;

export default function Page() {
    // Today
    const today = new Date().toISOString().split("T")[0];

    // Add timeslot
    const [selectedAddDate, setSelectedAddDate] = useState(today);

    // Request cancel
    const [selectedStartDate, setSelectedStartDate] = useState(today);
    const [selectedEndDate, setSelectedEndDate] = useState(today);

    // Disabled in the DatePickerComponentDoctor
    const [unavailableDates, setUnavailableDates] = useState([]);

    const [isRetrieved, setIsRetrieved] = useState(false);

    // Prevents multiple API calls from rendering multiple times
    useEffect(() => {
        if (!isRetrieved) {
            // Get all dates already working by API
            // - Hardcode doctor_id to 1
            // - Currently only one doctor
            axios
                .post(`http://${URL_TO_USE}:8080/timeslot/v1/all`, {
                    data: {
                        doctor_id: 1,
                    },
                })
                .then((res) => {
                    const data = res.data.data;
                    // console.log(data);

                    // For each timeslot_datetime, get the date
                    // And save into an array, no duplicates
                    // E.g. '2024-04-04 08:30:00' -> '2024-04-04'
                    for (const datum of data) {
                        let [date, time] = datum.timeslot_datetime.split(" ");
                        if (!unavailableDates.includes(date)) {
                            let temp = unavailableDates;
                            temp.push(date);

                            setUnavailableDates(temp);
                        }
                    }

                    console.log(unavailableDates);
                })
                // Empty database
                .catch((error) => {
                    console.log(error);
                });
            setIsRetrieved(true);
        }
    }, []);

    async function handleAddTimeslot() {
        // Cannot add timeslot for today
        if (selectedAddDate === new Date().toISOString().split("T")[0]) {
            alert("Cannot add timeslot for today!");
            return;
        }

        // (1) For each timeslot, create a timeslot
        for (const timeslot of timeslots) {
            // (2) Combine the date and time
            const timeslot_datetime = `${selectedAddDate} ${timeslot}`;
            // console.log(timeslot_datetime);

            // (3) Create timeslots by API
            // - Hardcode doctor_id to 1
            // - Currently only one doctor
            await axios
                .post(`http://${URL_TO_USE}:8080/timeslot/v1/create`, {
                    data: {
                        doctor_id: 1,
                        timeslot_datetime,
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        // (4) Inform the user
        alert(`Timeslots added successfully for ${selectedAddDate}!`);

        // (5) Refresh the page
        window.location.reload();
    }

    async function handleCancelRequest() {
        // Create cancel request by API
        // - Hardcode doctor_id to 1
        // - Currently only one doctor
        await axios
            .post(`http://${URL_TO_USE}:5102/make_cancellation_request`, {
                data: {
                    doctor_id: 1,
                },
                start_date: selectedStartDate,
                end_date: selectedEndDate,
            })
            .then((res) => {
                alert("Request sent to nurse!");
                console.log(res);
            })
            // No timeslot found
            .catch((error) => {
                console.log(error);
                alert("You have no timeslot for that date range!");
            });
    }

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
                    <div className="basis-6/12">
                        {/* Add Timeslot */}
                        <Container>
                            <h3 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 ms-4 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                                Add Timeslot:
                            </h3>
                        </Container>
                        <div className="flex flex-col w-full px-4 py-4 text-xs bg-gray-100 rounded-2xl dark:bg-trueGray-800 ">
                            <Container className="ms-4">
                                <div>
                                    <h1 className="text-lg font-bold ">
                                        Date:
                                    </h1>
                                    <DatePickerComponentDoctor
                                        unavailableDates={unavailableDates}
                                        selectedDate={selectedAddDate}
                                        setSelectedDate={setSelectedAddDate}
                                    />
                                </div>
                            </Container>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleAddTimeslot}
                                    className="block p-3 mx-8 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg float-end focus:outline-none hover:bg-gray-100 hover:text-blue-700"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                    <Container className="basis-1/12"></Container>

                    {/* Request Cancel */}
                    <Container className="basis-6/12">
                        <h3 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 ms-4 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                            Request Cancel:
                        </h3>
                        <Container>
                            <div className="flex flex-col w-full px-4 py-4 text-xs bg-gray-100 rounded-2xl dark:bg-trueGray-800 ">
                                <Container className="ms-4">
                                    <div className="mb-5">
                                        <h1 className="text-lg font-bold ">
                                            Start Date:
                                        </h1>
                                        <DatePickerComponentDoctor2
                                            unavailableDates={[]}
                                            selectedStartDate={
                                                selectedStartDate
                                            }
                                            selectedEndDate={selectedEndDate}
                                            setSelectedStartDate={
                                                setSelectedStartDate
                                            }
                                            setSelectedEndDate={
                                                setSelectedEndDate
                                            }
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold ">
                                            End Date:
                                        </h1>
                                        <DatePickerComponentDoctor3
                                            unavailableStartDate={
                                                selectedStartDate
                                            }
                                            selectedEndDate={selectedEndDate}
                                            setSelectedEndDate={
                                                setSelectedEndDate
                                            }
                                        />
                                    </div>
                                </Container>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleCancelRequest}
                                        className="block p-3 mx-8 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg float-end focus:outline-none hover:bg-gray-100 hover:text-blue-700"
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
