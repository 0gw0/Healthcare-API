"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HistoryLog from "@/components/HistoryLog";



import React, { useState } from "react";

export default function Page() {
    const medicationLogData = [
        { id: 1, date: '2024-03-01', time: '01:00 PM', doctorname: "Dr Peter Lam", medicinePrescribed: 'Paracetamol', mcissued:"Yes", medicineDelivered: 'Yes' },
        { id: 2, date: '2024-03-09', time: '05:00 PM', doctorname: "Dr Alice Tan", medicinePrescribed: 'Paracetamol', mcissued:"Yes", medicineDelivered: 'No' }
      ];
      
  return (
    <>
      <Navbar />
      <Hero title="History" />
      {/* User Homepage items */}
      <Container>
        <div className="flex flex-row">
          <div className="basis-5/12">
            <Container>
              <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                Past Teleconsultation Details
              </h1>
              
            </Container>

            
          </div>
          
        </div>

        <HistoryLog data={medicationLogData}></HistoryLog>
       
      </Container>

      <div className="container mx-auto p-4 flex justify-center"></div>

      <Footer />
    </>
  );
}
