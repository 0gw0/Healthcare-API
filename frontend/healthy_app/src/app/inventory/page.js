"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import InventoryLog from "@/components/InventoryLog";

import React, { useState } from "react";
import CreateOrder from "@/components/CreateOrder";

export default function Page() {
  const InventoryLogData = [
    {
      id: 1,
      date: "2024-03-01",
      name: "Paracetamol",
      quantity: "150",
      manufacturer: "GSX",
    },
    {
      id: 2,
      date: "2024-01-23",
      name: "Amoxicillin",
      quantity: "24",
      manufacturer: "MSD",
    },
  ];
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
          <div className="basis-5/12">
            <Container>
              <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                Inventory Details
              </h1>

              <InventoryLog data={InventoryLogData}></InventoryLog>
            </Container>
          </div>
          <Container className="basis-7/12">
            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
              Create Order
            </h1>

            <CreateOrder></CreateOrder>
          </Container>
        </div>
      </Container>

      <div className="container mx-auto p-4 flex justify-center"></div>

      <Footer />
    </>
  );
}
