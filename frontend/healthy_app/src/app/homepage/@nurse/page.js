"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import TodayAppt from "@/components/TodayAppt";

import React, { useState, useEffect } from "react";
import SlotsTable from "@/components/SlotsTable";
import RequestsTable from "@/components/RequestsTable";

import axios from "axios";

// Hardcoded data, for demo purposes
const doctor_name = "Dr. Michael Scott";
const patient_name = "Mr. Dwight Schrute";

export default function Page() {
    // Use state for requests data
    const [requestData, setRequestData] = useState([]);

    // Use state for data retrieval
    const [hasRetrieved, setHasRetrieved] = useState(false);

    // After SSR
    useEffect(() => {
        clearInterval();

        // Get inventory with API
        // - First time get inventory
        if (!hasRetrieved) {
            // Get data from API
            axios
                .get("http://127.0.0.1:5004/notification/get/new/all")
                .then((res) => {
                    let data = res.data.data;

                    // Formate the data
                    for (let i = 0; i < data.length; i++) {
                        data[i]["doctor_name"] = doctor_name;
                        data[i]["patient_name"] = patient_name;
                    }

                    console.log(data);
                    setRequestData(data);
                    setHasRetrieved(true);
                })
                // When there is no requests
                .catch((error) => {
                    console.log("No requests found");
                });
        }

        // - Get inventory every 10 seconds
        setInterval(() => {
            axios
                .get("http://127.0.0.1:5004/notification/get/new/all")
                .then((res) => {
                    let data = res.data.data;

                    // Formate the data
                    for (let i = 0; i < data.length; i++) {
                        data[i]["doctor_name"] = doctor_name;
                        data[i]["patient_name"] = patient_name;
                    }

                    console.log(data);
                    setRequestData(data);
                })
                .catch((error) => {
                    console.log("No requests found");
                    setRequestData([]);
                });
        }, 10000);
    }, []);

    // Hardcoded data
    // const DoctorRequestData = [
    //     {
    //         docid: 1,
    //         doctor_name: "John",
    //         start_date: "2024-03-07",
    //         end_date: "2024-03-07",
    //     },
    //     {
    //         docid: 2,
    //         doctor_name: "Shau",
    //         start_date: "2024-03-07",
    //         end_date: "2024-03-07",
    //     },
    // ];

    return (
        <>
            <Navbar />
            <Hero
                title="Nurse homepage"
                description="View requests and inventory"
                heroImg="doc"
            />
            {/* User Homepage items */}

            <Container>
                <div className="flex flex-row">
                    <div className="basis-8/12">
                        <Container>
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                View All Requests
                            </h1>
                            <div className="mx-4">
                                <RequestsTable
                                    data={requestData}
                                    setRequestData={setRequestData}
                                />
                            </div>
                        </Container>
                    </div>
                </div>
            </Container>

            <div className="container flex justify-center p-4 mx-auto"></div>

            <Footer />
        </>
    );
}
