import femaleDocImg from "../../public/doc1.jpeg";
import maleDocImg from "../../public/doc2.jpeg";
import Image from "next/image";

import { useState } from "react";
import axios from "axios";

// Hardcoded Doctor name
const doctor_name = "Dr. Michael Scott";

LOCAL_URL = "localhost";
PEER_URL = "172.20.10.8";
URL_TO_USE = PEER_URL;

const UpcomingAppt = () => {
    const [upcomingAppts, setUpcomingAppts] = useState([]);
    const [isRetrieved, setIsRetrieved] = useState(false);

    // Prevents multiple API calls from rendering multiple times
    if (!isRetrieved) {
        reloadTable();
        setIsRetrieved(true);
    }

    function reloadTable() {
        // Get all upcoming appointments by API
        axios
            .post(`http://${URL_TO_USE}:8080/appointment/v1/all`, {
                data: {
                    patient_id: 1,
                    isCompleted: 0,
                },
            })
            .then((res) => {
                const Appts = res.data.data;
                console.log(Appts);

                setUpcomingAppts(Appts);
            })
            // Empty database
            .catch((error) => {
                setUpcomingAppts([]);
            });
    }

    return (
        <div className="flex flex-col items-center px-5 pb-5 bg-gray-200 lg:col-span-2 xl:col-auto dark:bg-gray-700 rounded-2xl">
            {/* No appointment */}
            {upcomingAppts.length === 0 && (
                <div className="flex flex-col justify-between h-full px-5 py-5 mt-5 bg-white w-96 rounded-2xl dark:bg-trueGray-800">
                    <div className="text-xl font-semibold text-center">
                        No upcoming appointments
                    </div>
                </div>
            )}

            {upcomingAppts.map((appt) => (
                <div key={appt.id}>
                    <Avatar
                        id={appt.id}
                        image={maleDocImg}
                        name={doctor_name}
                        datetime={appt.timeslot_datetime}
                        duration_minutes={appt.duration_minutes}
                        reloadTable={reloadTable}
                    />
                </div>
            ))}
        </div>
    );
};

function Avatar(props) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleCancel(id) {
        setIsLoading(true);
        // console.log(id);

        // Use API to cancel
        await axios
            .put(`http://${URL_TO_USE}:8080/booking/v1/cancel/${id}`)
            .then((res) => {
                console.log(res.data);
            });
        props.reloadTable();

        setIsLoading(false);
    }
    return (
        <div className="flex flex-col justify-between h-full px-5 py-5 mt-5 bg-white w-96 rounded-2xl dark:bg-trueGray-800">
            <div className="flex items-center space-x-3 justify-evenly">
                <div>
                    <div className="text-xl font-semibold">{props.name}</div>
                    <div className="mt-1 text-lg">
                        {props.datetime.slice(0, -3)}
                    </div>
                    <div className="mt-1 text-lg">
                        Duration: {props.duration_minutes} minutes
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex-shrink-0 overflow-hidden rounded-full w-14">
                        <Image
                            src={props.image}
                            width="100"
                            height="100"
                            alt="Avatar"
                            placeholder="blur"
                        />
                    </div>
                    <button
                        onClick={() => handleCancel(props.id)}
                        disabled={isLoading}
                        className="px-4 py-1 mt-1 text-white bg-red-500 rounded-xl hover:bg-red-900"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpcomingAppt;
