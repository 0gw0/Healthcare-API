import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const LOCAL_URL = "localhost";
const PEER_URL = "172.20.10.8";
const URL_TO_USE = PEER_URL;

const LowInventoryModal = ({ onClose, data }) => {
    const lowInventoryItems = data.filter((item) => item.quantity < 20);
    const amountToRestock = 30;

    // Update inventory
    const handleRestock = async () => {
        // For each item in low inventory, restock to amountToRestock

        for (const item of lowInventoryItems) {
            // Get amount to add
            const amountToAdd = amountToRestock - item.quantity;

            console.log(amountToAdd, amountToRestock, item.quantity);

            // Call API to restock
            await axios
                .put(
                    `http://${URL_TO_USE}:8080/inventory/v1/update/${item.id}`,
                    {
                        quantity_change: amountToAdd,
                    }
                )
                .then((res) => {
                    console.log(res);
                    console.log(
                        `Restocking (${item.id}) ${item.name}, from ${item.quantity} to ${amountToRestock}`
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        onClose();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-md">
                <div className="flex items-center mb-4">
                    {" "}
                    {/* Flex container to align items */}
                    <h2 className="mr-2 text-lg font-bold">
                        Low Inventory Alert
                    </h2>{" "}
                    {/* Added mr-2 for spacing */}
                    <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                    {/* Font Awesome icon */}
                </div>
                <p>YATA inventory is running low on the following items:</p>
                <ul className="pl-5 list-disc">
                    {lowInventoryItems.map((item) => (
                        <li key={item.id}>
                            <b>{item.name}</b> - Qty: {item.quantity}
                        </li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className="flex justify-start gap-3">
                    <button
                        onClick={handleRestock}
                        className="px-4 py-2 mt-4 text-white rounded-md bg-blue-950"
                    >
                        Restock to 30
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mt-4 text-white rounded-md bg-blue-950"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LowInventoryModal;
