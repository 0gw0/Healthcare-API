import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const LowInventoryModal = ({ onClose, data }) => {
  const lowInventoryItems = data.filter(item => item.quantity < 20);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <div className="flex items-center mb-4"> {/* Flex container to align items */}
          <h2 className="text-lg font-bold mr-2">Low Inventory Alert</h2> {/* Added mr-2 for spacing */}
          <FontAwesomeIcon icon={faExclamationCircle} /> {/* Font Awesome icon */}
        </div>
        <p>Your inventory is running low on the following items:</p>
        <ul className="list-disc pl-5">
          {lowInventoryItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-md">Close</button>
      </div>
    </div>
  );
};

export default LowInventoryModal;
