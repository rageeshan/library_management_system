import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../services/productApi";
import type { Book } from "../types/Book";

function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book. Check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  
  const openEditModal = () => {
    if (!book) return;
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditDescription(book.description);
    setIsModalOpen(true);
  };


  const handleSave = async () => {
    if (!book) return;
    setSaving(true);
    try {
      const updatedBook = { ...book, title: editTitle, author: editAuthor, description: editDescription };
      await updateBook(book.id, updatedBook);
      setBook(updatedBook);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update book", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">{error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Book not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
            title="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Book Details</h1>
        </div>
        <button
          onClick={openEditModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span>Edit Book</span>
        </button>
      </div>

      {/* Book Details */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">Book Information</h2>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Book ID</label>
            <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">{book.id}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Book Title</label>
            <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">{book.title}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Author</label>
            <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">{book.author}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
            <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 min-h-[100px]">{book.description}</p>
          </div>
        </div>

        {/* Back to List Button - Now inside the card footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to List</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Edit Book</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter book title"
            />

            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Author</label>
            <input
              type="text"
              value={editAuthor}
              onChange={(e) => setEditAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter author name"
            />

            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              placeholder="Enter book description"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;