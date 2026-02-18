import React from "react";

export const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="text-gray-200 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center">Book Website</h1>

        <div className="mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Book title..."
            className="border-2 p-1 mx-2 rounded-lg hover:border-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Release date"
            className="border-2 p-1 mx-2 rounded-lg hover:border-indigo-500 transition"
          />
          <button className="bg-indigo-700 px-4 py-1.5 rounded-lg hover:scale-105 transition transition-300 active:bg-indigo-400">
            Add book
          </button>
        </div>
      </div>
    </div>
  );
};
