import React, { useState } from 'react';

const Menu = () => {
  // Dummy data for menu items
  const dummyMenu = [
    {
      id: 1,
      itemName: 'Burger',
      description: 'Juicy beef patty with fresh vegetables',
      price: 9.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      itemName: 'Pizza',
      description: 'Delicious pizza with assorted toppings',
      price: 12.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      itemName: 'Salad',
      description: 'Fresh salad with greens and dressings',
      price: 7.99,
      image: 'https://via.placeholder.com/150',
    },
  ];

  // State to store menu items and editing status
  const [menuItems, setMenuItems] = useState(dummyMenu);
  const [editItemId, setEditItemId] = useState(null);

  // Function to delete an item from the menu
  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    setEditItemId(null); // Reset editing status if item is deleted
  };

  // Function to save changes made to an item
  const saveChanges = (id, updatedItem) => {
    setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
    setEditItemId(null); // Reset editing status after saving changes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* List of menu items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="border border-gray-300 rounded-md p-4 flex flex-col relative">
            {editItemId === item.id ? (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div className="bg-gray-200 p-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Item Name"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    value={item.itemName}
                    onChange={(e) => saveChanges(item.id, { ...item, itemName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    value={item.description}
                    onChange={(e) => saveChanges(item.id, { ...item, description: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    value={item.price}
                    onChange={(e) => saveChanges(item.id, { ...item, price: parseFloat(e.target.value) })}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    value={item.image}
                    onChange={(e) => saveChanges(item.id, { ...item, image: e.target.value })}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => saveChanges(item.id, item)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setEditItemId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img src={item.image} alt={item.itemName} className="mb-4" />
                <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-semibold">${item.price}</p>
                {/* Edit and Delete buttons */}
                <div className="mt-auto flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setEditItemId(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemsPage = () => {
  return (
    <div className="text-black">
      <Menu />
    </div>
  );
};

export default ItemsPage;
