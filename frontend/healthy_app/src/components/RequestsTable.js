import React from "react";
import { useState } from "react";
import Container from "./container";

import axios from "axios";

// Hardcoded data, for demo purposes
const doctor_name = "Dr. Michael Scott";
const patient_name = "Mr. Dwight Schrute";

const LOCAL_URL = "localhost";
const PEER_URL = "172.20.10.8";
const URL_TO_USE = PEER_URL;

const SlotsTable = ({ data, setRequestData }) => {
    // Use state for loading buttons
    const [isLoading, setIsLoading] = useState(false);

    async function handleApprove(session_id) {
        setIsLoading(true);

        // console.log(item);
        // Use API to approve
        await axios
            .post(
                `http://${URL_TO_USE}:8080/cancellation/v1/request/${session_id}`
            )
            .then((res) => {});
        reloadTable();

        setIsLoading(false);
    }

    async function handleDecline(session_id) {
        setIsLoading(true);

        // Use API to decline
        await axios
            .delete(
                `http://${URL_TO_USE}:8080/notification/v1/delete/${session_id}`
            )
            .then((res) => {
                console.log(res.data);
            });
        reloadTable();

        setIsLoading(false);
    }

    async function reloadTable() {
        // Use API to get new data
        await axios
            .get(`http://${URL_TO_USE}:8080/notification/v1/all`)
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
            // Empty database
            .catch((error) => {
                setRequestData([]);
            });
    }

    return (
        <Container>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="text-white bg-blue-950">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Session
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Doctor
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Patient
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider uppercase"
                                        >
                                            Datetime
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider uppercase"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((item) => (
                                        <tr
                                            key={item.session_id}
                                            className="text-gray-900"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap ">
                                                {item.session_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                {item.doctor_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                {item.patient_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                {item.timeslot_datetime}
                                            </td>
                                            <td className="flex items-center justify-center px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            item.session_id
                                                        )
                                                    }
                                                    className="px-4 py-2 m-2 text-lg text-white bg-blue-500 rounded-xl basis-1/4 hover:bg-blue-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDecline(
                                                            item.session_id
                                                        )
                                                    }
                                                    disabled={isLoading}
                                                    className="px-4 py-2 m-2 text-lg text-white bg-indigo-700 rounded-xl basis-1/4 hover:bg-indigo-900"
                                                >
                                                    Decline
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SlotsTable;
