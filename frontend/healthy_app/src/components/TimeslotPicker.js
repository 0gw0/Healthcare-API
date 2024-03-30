"use client";

import { useEffect } from "react";

const TimeslotPicker = ({ timeslotOptions, selectedTime, setSelectedTime }) => {
    // console.log(timeslots);

    // Hardcoded for testing
    // const timeslots = [
    //     "09:00 - 10:00",
    //     "10:00 - 11:00",
    //     "11:00 - 12:00",
    //     "13:00 - 14:00",
    //     "14:00 - 15:00",
    //     "15:00 - 16:00",
    //     "16:00 - 17:00",
    //     "17:00 - 18:00",
    // ];

    function addThirtyMinutes(timeString) {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = timeString.split(":").map(Number);

        // Convert hours and minutes into total minutes
        const totalMinutes = hours * 60 + minutes;

        // Add 30 minutes
        const newTotalMinutes = totalMinutes + 30;

        // Calculate new hours and minutes
        const newHours = Math.floor(newTotalMinutes / 60);
        const newMinutes = newTotalMinutes % 60;

        // Format new time string
        function padZero(time) {
            return String(time).padStart(2, "0");
        }

        const newTimeString = `${padZero(newHours)}:${padZero(
            newMinutes
        )}:${padZero(seconds)}`;

        return newTimeString;
    }
    return (
        <div className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col justify-between w-3/4 h-full px-4 py-4 bg-gray-100 rounded-2xl dark:bg-trueGray-800">
                <div className="flex-row items-center mb-4">
                    {timeslotOptions &&
                        timeslotOptions.map((data) => (
                            <div key={data}>
                                <input
                                    id={data}
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="w-8 h-4 "
                                    onChange={(e) => {
                                        setSelectedTime(e.target.id);
                                    }}
                                />
                                <label
                                    htmlFor={data}
                                    className="text-lg font-medium text-gray-900 ms-2 dark:text-gray-300"
                                >
                                    {data} - {addThirtyMinutes(data)}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
export default TimeslotPicker;
