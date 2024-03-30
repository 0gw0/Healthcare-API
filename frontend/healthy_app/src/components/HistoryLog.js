import React from "react";

// Hardcoded data, for demo purposes
const doctor_name = "Dr. Michael Scott";
const mc_issued = "Yes";

const HistoryLog = ({ data }) => {
    // Get now date, YYYY-MM-DD
    const now = new Date();
    const now_date = now.toISOString().split("T")[0];

    // If timeslot_datetime minus now > 1 days, 'Yes' for delivered
    function dateDiffInDays(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        const firstDate = new Date(date1);
        const secondDate = new Date(date2);

        const diffDays = Math.round(
            Math.abs((firstDate - secondDate) / oneDay)
        );

        return diffDays;
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="text-white bg-blue-950">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                    >
                                        Datetime
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                    >
                                        Duration (min)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                    >
                                        Doctor Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                    >
                                        MC Issued
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                    >
                                        Medicine Delivered
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item) => (
                                    <tr key={item.id} className="text-gray-900">
                                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap ">
                                            {item.timeslot_datetime}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                            {item.duration_minutes}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                            {doctor_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                            {mc_issued}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                            {/* If timeslot_datetime minus now > 1 days, Yes */}
                                            {dateDiffInDays(
                                                item.timeslot_datetime,
                                                now_date
                                            ) > 1
                                                ? "Yes"
                                                : "No"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryLog;
