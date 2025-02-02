import React, { useState } from "react";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold text-black mb-4">Alert</h2>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomAlert;
