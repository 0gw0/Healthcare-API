"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Inventory from "@/components/Inventory";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Page() {
    // Use state for inventory data
    const [inventoryData, setInventoryData] = useState([]);

    // Use state for data retrieval
    const [hasRetrieved, setHasRetrieved] = useState(false);

    // After SSR
    useEffect(() => {
        clearInterval();

        // Get inventory with API
        // - First time get inventory
        if (!hasRetrieved) {
            axios
                .get("http://127.0.0.1:5005/inventory/get/all")
                .then((res) => {
                    let data = res.data.data;
                    console.log(data);
                    setInventoryData(data);
                    setHasRetrieved(true);
                })
                // Empty database
                .catch((error) => {
                    console.log("No inventory found");
                    setInventoryData([]);
                });
        }

        // - Get inventory every 10 seconds
        setInterval(() => {
            axios
                .get("http://127.0.0.1:5005/inventory/get/all")
                .then((res) => {
                    let data = res.data.data;
                    console.log(data);
                    setInventoryData(data);
                })
                // Empty database
                .catch((error) => {
                    console.log("No inventory found");
                    setInventoryData([]);
                });
        }, 10000);
    }, []);

    // Hardcode
    // const inventoryData = [
    //     {
    //         id: 1,
    //         name: "Paracetamol",
    //         quantity: "30",
    //     },
    //     {
    //         id: 2,
    //         name: "Hydrocodone",
    //         quantity: "29",
    //     },
    //     {
    //         id: 3,
    //         name: "Metformin",
    //         quantity: "16",
    //     },
    //     {
    //         id: 4,
    //         name: "Lorsartan",
    //         quantity: "19",
    //     },
    //     {
    //         id: 5,
    //         name: "Antibiotics",
    //         quantity: "120",
    //     },
    //     {
    //         id: 6,
    //         name: "Albuterol",
    //         quantity: "37",
    //     },
    //     {
    //         id: 7,
    //         name: "Antihistamine",
    //         quantity: "23",
    //     },
    //     {
    //         id: 8,
    //         name: "Gabapentin",
    //         quantity: "25",
    //     },
    //     {
    //         id: 9,
    //         name: "Atorvastatin",
    //         quantity: "20",
    //     },
    //     {
    //         id: 10,
    //         name: "Levothyroxine",
    //         quantity: "27",
    //     },
    //     {
    //         id: 11,
    //         name: "Omeprazole",
    //         quantity: "46",
    //     },
    // ];
    return (
        <>
            <Navbar />
            <Hero
                title="Inventory"
                description="Update mediciation inventory here."
                heroImg="doc"
            />
            {/* User Homepage items */}
            <Container>
                <div className="flex flex-row">
                    <Container>
                        <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                            Inventory Details
                        </h1>
                        <div className="w-3/4">
                            <Inventory data={inventoryData}></Inventory>
                        </div>
                    </Container>
                </div>
            </Container>

            <div className="container flex justify-center p-4 mx-auto"></div>

            <Footer />
        </>
    );
}
