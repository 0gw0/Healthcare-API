import Link from "next/link";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Hardcoded data, for demo purposes
const patient_name = "Mr. Dwight Schrute";

LOCAL_URL = "localhost";
PEER_URL = "172.20.10.8";
URL_TO_USE = PEER_URL;

const TodayAppt = () => {
    // Appointment data
    const [appointmentData, setAppointmentData] = useState([]);

    const [isRetrieved, setIsRetrieved] = useState(false);

    // Prevents multiple API calls from rendering multiple times
    useEffect(() => {
        if (!isRetrieved) {
            // Get all doctor appointment by API
            // - Hardcode doctor_id to 1
            // - Currently only one doctor
            axios
                .post(`http://${URL_TO_USE}:8080/appointment/v1/all`, {
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
        <div className="flex flex-col items-center gap-5 px-5 py-5 bg-gray-200 lg:col-span-2 xl:col-auto dark:bg-gray-700 rounded-2xl">
            {/* Display Avatar for each appointment */}
            {appointmentData.map((appointment) => (
                <div
                    key={appointment.id}
                    className="h-full p-5 bg-white rounded-2xl dark:bg-trueGray-800"
                >
                    <Avatar
                        name={patient_name}
                        datetime={appointment.timeslot_datetime}
                        id={appointment.id}
                    />
                </div>
            ))}
        </div>
    );
};

function Avatar(props) {
    return (
        <div className="flex flex-row items-center">
            <div className="min-w-52">
                <div className="text-xl font-semibold">{props.name}</div>
                <div>{props.datetime}</div>
            </div>
            <div className="text-lg">
                <div className="text-lg">
                    <div>
                        <button
                            type="button"
                            className="w-20 px-3 py-1 text-sm text-white border border-gray-200 rounded-lg focus:outline-none bg-blue-950 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 " // Added styles for positioning
                        >
                            <Link href={`/medical-certificate?id=${props.id}`}>
                                Begin Consult
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodayAppt;
