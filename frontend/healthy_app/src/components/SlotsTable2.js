import React from "react";
import Container from "./container";

const SlotsTable2 = ({ data }) => {
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
                                            Session Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Accepted Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Duration
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Patient Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                        >
                                            Appointment Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="text-gray-900"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap ">
                                                {item.timeslot_datetime}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                {item.time_accepted}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                {item.duration_minutes}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                Mr. Dwight Schrute
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                Teleconsult
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

export default SlotsTable2;
