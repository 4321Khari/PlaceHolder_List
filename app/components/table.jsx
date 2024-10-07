import React from "react";

export default function Table({ users, key, handleEdit, handleDelete }) {
  return (
    <table className="min-w-full bg-white ">
      <thead className="bg-gray-800 text-white rounded-md">
        <tr>
          <th className="text-left py-3 px-4">Name</th>
          <th className="text-left py-3 px-4">Email</th>
          <th className="text-left py-3 px-4">Phone</th>
          <th className="text-left py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody className=" rounded-md">
        {users.map((user, index) => (
          <tr
            key={user.id}
            className={` text-white ${
              index % 2 === 0 ? "bg-green-700" : " bg-gray-900"
            }  `}
          >
            <td className="py-3 px-4">{user.name}</td>
            <td className="py-3 px-4">{user.email}</td>
            <td className="py-3 px-4">{user.phone}</td>
            <td className="py-3 px-4">
              <button
                className="bg-blue-500 text-white px-4 py-1 mr-2 rounded"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
