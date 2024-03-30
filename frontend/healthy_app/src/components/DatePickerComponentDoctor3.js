"use client"; // This is a client component
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
    unavailableStartDate,
    selectedEndDate,
    setSelectedEndDate,
}) => {
    const handleChange = (date) => {
        // Format the date to YYYY-MM-DD
        date = date.toISOString().split("T")[0];

        setSelectedEndDate(date);

        // Will display previously selected time
        // Cuz its a component state
        // console.log(selectedEndDate);
    };

    return (
        <div className="flex flex-col">
            <label
                htmlFor="date-picker"
                className="mb-2 font-medium text-gray-700"
            >
                Select Date:
            </label>
            <DatePicker
                selected={selectedEndDate}
                onChange={handleChange}
                minDate={unavailableStartDate}
                className="px-3 py-2 pb-2 font-medium text-gray-700 bg-white border border-b border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
};

export default DatePickerComponent;
