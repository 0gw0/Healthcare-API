"use client"; // This is a client component
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (date) => {
        setSelectedDate(date);
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
                selected={selectedDate}
                onChange={handleChange}
                minDate={new Date()}
                className="px-3 py-2 pb-2 font-medium text-gray-700 bg-white border border-b border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
};

export default DatePickerComponent;
