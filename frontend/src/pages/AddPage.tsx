import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/productApi";

function AddPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBook({ title, author, description });
      alert("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to add book", error);
      alert("Failed to add book. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with back button */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center">
        <button onClick={handleCancel} className="mr-4 text-gray-600 hover:text-gray-800 transition-colors">
          {/* SVG back arrow */}
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">Book Information</h2>
          <p className="text-sm text-gray-500 mt-1">Enter the details of the new book below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter book description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-y"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Add Book</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPage;