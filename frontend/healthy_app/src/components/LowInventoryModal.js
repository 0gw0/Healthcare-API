import React from 'react';

const LowInventoryModal = ({ onClose, data }) => {
    const lowInventoryItems = data.filter(item => item.quantity < 13);
  return (

    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-lg font-bold mb-4">Low Inventory Alert</h2>
        <p>Your inventory is running low on the following items:</p>
        <ul>
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
