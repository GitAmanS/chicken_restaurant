import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Menu = () => {

  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [editItemId, setEditItemId] = useState(null); // State to store the id of the item being edited


  useEffect(()=>{
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const data = await response.data;
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // Function to delete an item from the menu
  const deleteItem = async(id) => {
    try{
      const response = await axios.delete(`http://localhost:5000/api/items/${id}`);
      console.log(response)
      setMenuItems(menuItems.filter(item => item._id !== id));
    }
    catch(error){
      console.log(error)
    }

    
  };

  // Function to save changes made to an item
  const saveChanges = async(id, updatedItem) => {
    try{
      const response = await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
      console.log(response)
      setMenuItems(menuItems.map(item => (item._id === id ? updatedItem : item)));
      setEditItemId(null); // Reset editItemId state after saving changes
      setIsModalOpen(false); // Close the modal after adding item
      setNewItem({}); // Reset newItem state
      setImageFile(null); // Reset imageFile state
    }
    catch(error){
      console.log(error)
    }

  };

  // Function to handle adding a new item
const handleAddItem = async () => {
  console.log(newItem)
  try {
    // Prepare the request payload with the new item's data
    const newItemData = {
      title: newItem.title,
      description: newItem.description,
      image: "https://media.istockphoto.com/id/452813985/photo/plate-of-fried-chicken-on-blue-plaid-towel.jpg?s=2048x2048&w=is&k=20&c=oC549B7Y6bM4XKxntrS7ErhT7RTBZNx3j_rFv1zEPgs=",
      price: newItem.price,
      inStock: true // Assuming the default value is true
    };

    console.log(newItemData)

    // Make the POST request to add the new item
    const response = await axios.post('http://localhost:5000/api/items', newItemData);
    const newItemFromServer = response.data; // Get the newly added item from the server response
    console.log(newItemFromServer)
    // Update the menuItems state with the newly added item
    setMenuItems([...menuItems, newItemFromServer]);

    setIsModalOpen(false); // Close the modal after adding item
    setNewItem({}); // Reset newItem state
    setImageFile(null); // Reset imageFile state
  } catch (error) {
    console.error('Error adding new item:', error);
  }
};




  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setNewItem({ ...newItem, image: URL.createObjectURL(file) });
  };

  // Function to handle editing an item
  const editItem = async(item) => {

    setEditItemId(item._id);
    setNewItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* Button to open modal */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => {
          setEditItemId(null); // Reset editItemId state when adding a new item
          setIsModalOpen(true);
        }}
      >
        Add New Item
      </button>

      {/* Modal for adding/editing an item */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">{editItemId ? 'Edit Item' : 'Add New Item'}</h2>
            <input
              type="text"
              placeholder="Item Name"
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              value={newItem.title || ''}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              value={newItem.description || ''}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              value={newItem.price || ''}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
            {/* Drag and drop file input for image */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Item Preview" className="mb-4 max-w-full h-auto" />
            )}
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={editItemId ? () => saveChanges(editItemId, newItem) : handleAddItem}
              >
                {editItemId ? 'Save' : 'Add'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditItemId(null); // Reset editItemId state when cancelling
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of menu items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <div key={item._id} className="border border-gray-300 rounded-md p-4 flex flex-col relative">
            <img src={item.image} alt={item.title} className="mb-4" />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-semibold">${item.price}</p>
            {/* Edit and Delete buttons */}
            <div className="mt-auto flex">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => editItem(item)} // Pass item to editItem function
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
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
