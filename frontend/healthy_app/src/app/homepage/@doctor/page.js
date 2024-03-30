"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import TodayAppt from "@/components/TodayAppt";
import SlotsTable from "@/components/SlotsTable";
import SlotsTable2 from "@/components/SlotsTable2";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
    // Timeslot data
    const [timeslotData, setTimeslotData] = useState([]);

    // Appointment data
    const [appointmentData, setAppointmentData] = useState([]);

    const [isRetrieved, setIsRetrieved] = useState(false);

    // Prevents multiple API calls from rendering multiple times
    useEffect(() => {
        if (!isRetrieved) {
            // Get all doctor timeslot by API
            // - Hardcode doctor_id to 1
            // - Currently only one doctor
            axios
                .post("http://127.0.0.1:5002/timeslot/get/all", {
                    data: {
                        doctor_id: 1,
                        isAccepted: 0,
                    },
                })
                .then((res) => {
                    const data = res.data.data;
                    console.log(data);

                    setTimeslotData(data);
                })
                // Empty database
                .catch((error) => {
                    console.log(error);
                });

            // Get all doctor appointment by API
            // - Hardcode doctor_id to 1
            // - Currently only one doctor
            axios
                .post("http://127.0.0.1:5003/appointment/get/all", {
                    data: {
                        doctor_id: 1,
                        isCompleted: 0,
                    },
                })
                .then((res) => {
                    const data = res.data.data;
                    console.log(data);

                    setAppointmentData(data);
                })
                // Empty database
                .catch((error) => {
                    console.log(error);
                });

            setIsRetrieved(true);
        }
    }, []);

    return (
        <>
            <Navbar />
            <Hero
                title="Doctor homepage"
                description="Book and manage your consultations below."
                heroImg="doc"
            />
            {/* User Homepage items */}
            <Container>
                <div className="flex flex-row">
                    <div className="w-1/2 basis-8/12">
                        <Container>
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                View All Time Slots
                            </h1>
                            <div className="mx-4 overflow-y-auto h-72">
                                <SlotsTable data={timeslotData} />
                            </div>
                        </Container>
                        <Container>
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                View All Appointments
                            </h1>
                            <div className="mx-4 overflow-y-auto h-72">
                                <SlotsTable2 data={appointmentData} />
                            </div>
                        </Container>
                    </div>
                    <Container className="basis-4/12">
                        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                            Today's Appointments
                        </h1>

                        <TodayAppt></TodayAppt>
                    </Container>
                </div>
            </Container>

            <div className="container flex justify-center p-4 mx-auto"></div>

            <Footer />
        </>
    );
}
