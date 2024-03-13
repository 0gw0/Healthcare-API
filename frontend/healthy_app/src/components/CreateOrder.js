"use client"; // This is a client component

//import React from 'react'
import React, { useState } from "react";

const CreateOrder = () => {
  const [dateReceived, setDateReceived] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [manufacturer, setManufacturer] = useState("");

  const handleClearForm = () => {
    // Clear form fields
    setDateReceived("");
    setName("");
    setQuantity(0);
  };
  return (
    <div>
      <div className="bg-gray-200 dark:bg-gray-700 shadow-md rounded-lg px-8 py-5 mx-6 my-8">
        <form onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* Prevent default form submission */}
          <div className="mb-4">
            <label
              htmlFor="dateReceived"
              className="block text-sm font-medium mb-2"
            >
              Date Received
            </label>
            <input
              type="date"
              id="dateReceived"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={dateReceived}
              onChange={(e) => setDateReceived(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(e.parseInt(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="manufacturer"
              className="block text-sm font-medium mb-2"
            >
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              required
            />
          </div>
          <button
            type="button" // Change to button type
            className="w-full  p-3 text-xl font-medium text-white focus:outline-none bg-blue-950 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleClearForm}
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
