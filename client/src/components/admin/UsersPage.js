import React from 'react';

const BarGraph = ({ data }) => {
  // Calculate the maximum value in the data for scaling
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Bar Graph</h2>
      <div className="flex flex-col">
        {data.map(item => (
          <div key={item.label} className="flex items-center mb-2">
            <div className="w-24 font-semibold">{item.label}</div>
            <div className="relative bg-gray-300 h-8 rounded-md overflow-hidden flex-grow">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="ml-2">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UsersPage = () => {
  // Dummy data for the bar graph
  const graphData = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 20 },
    { label: 'Mar', value: 15 },
    { label: 'Apr', value: 25 },
    { label: 'May', value: 30 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Bar Graph */}
      <BarGraph data={graphData} />

      {/* Users List (Dummy Data) */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">User List</h2>
        <ul>
          <li>John Doe - Age: 25</li>
          <li>Jane Smith - Age: 30</li>
          <li>Alice Johnson - Age: 28</li>
          {/* Add more users as needed */}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;
