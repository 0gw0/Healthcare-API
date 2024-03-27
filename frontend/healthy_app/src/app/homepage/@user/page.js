"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import GreyBox from "@/components/GreyBox";
import Footer from "@/components/footer";
import UpcomingAppt from "@/components/UpcomingAppt";

import React, { useState } from "react";

export default function Page() {
    return (
        <>
            <Navbar />
            <Hero
                title="Homepage"
                description="Book and manage your consultations below."
                heroImg="doc"
            />
            {/* User Homepage items */}
            <Container className="pt-0">
                <div className="flex flex-row">
                    <div className="basis-8/12">
                        <Container>
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                Specialty
                            </h1>
                        </Container>
                        <div className="flex flex-row">
                            <Container className="basis-1/2">
                                <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                    Prescription Status
                                </h1>
                            </Container>
                            <Container className="basis-1/2">
                                <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                    History
                                </h1>
                                <div className="grid mt-4 lg:grid-cols-1 xl:grid-cols-2">
                                    <GreyBox />
                                </div>
                            </Container>
                        </div>
                    </div>
                    <Container className="basis-4/12">
                        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                            Upcoming Appointments
                        </h1>

                        <UpcomingAppt></UpcomingAppt>
                    </Container>
                </div>

                <div className="container flex justify-center p-4 mx-auto"></div>
            </Container>
            <Footer />
        </>
    );
}
