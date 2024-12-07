import React, { useState } from "react";

// Cart Component
const AdminCart = ({ title, items, onRemove, onClear, actionLabel, onAction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full ">
      {/* Cart Header */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>

      {items.length > 0 ? (
        <div className="space-y-4">
          {/* Item List */}
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2 mb-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  <span className="text-gray-700">{item.alt}</span>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClear}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Clear All
            </button>
            <button
              onClick={onAction}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No items selected.</p>
      )}
    </div>
  );
};

// Admin Gallery Page
const AdminGallery = () => {
  const [cart1Items, setCart1Items] = useState([
    { src: "/Profile.png", alt: "Image 1" },
    { src: "/images/item2.jpg", alt: "Image 2" },
  ]);


  const removeFromCart1 = (index) => {
    setCart1Items((prev) => prev.filter((_, i) => i !== index));
  };


  const clearCart1 = () => setCart1Items([]);

  const performAction1 = () => alert("Performing action for Cart 1 items");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Gallery</h1>

      {/* Cart Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart 1 */}
        <AdminCart
          title="Selected Images for Approval"
          items={cart1Items}
          onRemove={removeFromCart1}
          onClear={clearCart1}
          actionLabel="Approve"
          onAction={performAction1}
        />
     
      </div>
    </div>
  );
};

export default AdminGallery;
