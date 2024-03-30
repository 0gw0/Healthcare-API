"use client"; // This is a client component

import Navbar from "@/components/Navbar";
import Container from "@/components/container";
import Hero from "@/components/hero";
import TimeslotPicker from "@/components/TimeslotPicker";
import Footer from "@/components/footer";
import DatePickerComponent from "@/components/DatePickerComponent";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
    // Patient date selection
    const [selectedDate, setSelectedDate] = useState("");
    // Patient time selection
    const [selectedTime, setSelectedTime] = useState("");

    const [dateToTime, setDateToTime] = useState("");
    // setTimeslotOptions inside DatePickerComponent
    const [timeslotOptions, setTimeslotOptions] = useState([]);

    const [isRetrieved, setIsRetrieved] = useState(false);

    // Prevents multiple API calls from rendering multiple times
    useEffect(() => {
        if (!isRetrieved) {
            // Get all upcoming appointments by API
            axios
                .post("http://127.0.0.1:5002/timeslot/get/all", {
                    data: {
                        isAccepted: 0,
                    },
                })
                .then((res) => {
                    const data = res.data.data;

                    // (1) For each dataRow in data,
                    let date_to_time_obj = {};
                    for (const dataRow of data) {
                        // (2) Split the 'timeslot_datetime' field to get date and time
                        let [date, time] = dataRow.timeslot_datetime.split(" ");

                        // (3) If date is already in the object, append the time to the array
                        if (date_to_time_obj[date]) {
                            date_to_time_obj[date].push(time);
                        }
                        // (4) Else, create a new array with time as the first element
                        else {
                            date_to_time_obj[date] = [time];
                        }
                    }
                    console.log(data);
                    console.log(date_to_time_obj);

                    // (5) Save the object to state
                    setDateToTime(date_to_time_obj);
                    console.log(dateToTime);

                    // (6) Set the default selection of date and time, to the first date and time
                    const firstDate = Object.keys(date_to_time_obj)[0];
                    setSelectedDate(firstDate);
                })
                // Empty database
                .catch((error) => {
                    setDateToTime("");
                });
            setIsRetrieved(true);
        }
    }, []);

    async function handleConfirmAppointment() {
        // console.log(selectedDate);
        // console.log(selectedTime);

        if (selectedTime === "") {
            alert("Please select a time slot for your appointment.");
        } else {
            // (1) Prepare payload for API 1
            // - Where timeslot_datetime = selectedDate + selectedTime
            const datetime = selectedDate + " " + selectedTime;
            // console.log(datetime);

            // (2) Get the session_id from API 1
            const session_id = await axios
                .post("http://127.0.0.1:5002/timeslot/get/all", {
                    data: {
                        timeslot_datetime: datetime,
                    },
                })
                .then((res) => {
                    const data = res.data.data[0].id;
                    console.log(data);
                    return data;
                });

            // (3) Make an appointment with API 2
            // - Hardcode patient_id
            await axios
                .post(`http://127.0.0.1:5101/make_appointment/${session_id}`, {
                    patient_id: 1,
                })
                .then((res) => {
                    console.log(res.data);
                });

            // (4) Redirect to homepage, and display the new appointment
            window.location.href = "/homepage";
        }
    }

    return (
        <>
            <Navbar />
            <Hero
                title="Make Appointment"
                description="Book appointments with our doctors here."
                heroImg="doc"
            />
            {/* User Homepage items */}
            <Container>
                <div className="flex flex-row">
                    <div className="basis-5/12">
                        <Container>
                            <h1 className="ml-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                                Make an Appointment
                            </h1>
                            <h3 className="ml-4 text-xl leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight dark:text-white">
                                Select the desired date for your appointment
                                below:
                            </h3>
                        </Container>

                        <div className="flex flex-row">
                            <Container className="basis-1/2">
                                <DatePickerComponent
                                    dateToTime={dateToTime}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    setTimeslotOptions={setTimeslotOptions}
                                    setSelectedTime={setSelectedTime}
                                />
                            </Container>
                        </div>
                    </div>
                    <Container className="basis-7/12">
                        <h1 className="mb-2 text-xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight dark:text-white">
                            Appointment slots available for selected date:
                        </h1>

                        <TimeslotPicker
                            timeslotOptions={timeslotOptions}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        ></TimeslotPicker>
                    </Container>
                </div>

                <button
                    type="button"
                    onClick={handleConfirmAppointment}
                    className="float-right p-3 mx-8 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Confirm Appointment
                </button>
            </Container>

            <div className="container flex justify-center p-4 mx-auto"></div>

            <Footer />
        </>
    );
}
