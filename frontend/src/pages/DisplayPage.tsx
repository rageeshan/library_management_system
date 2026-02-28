import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types/Book';
import { getBooks, deleteBook } from '../services/productApi';

const DisplayPage: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from backend
  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        if (isMounted) setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setError("Failed to fetch books. Check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  // Navigate to Details page
  const handleView = (id: number) => {
    navigate(`/display/${id}`);
  };

  // Delete book with confirmation
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      console.error("Failed to delete book", err);
      alert("Failed to delete book. Check backend connection.");
    }
  };

  const handleAddBook = () => {
    navigate('/add');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-gray-600">
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Book Collection</h1>

        <button
          onClick={handleAddBook}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>Add New Book</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                  <p className="truncate">{book.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    {/* View/Edit */}
                    <button
                      onClick={() => handleView(book.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View/Edit"
                    >
                      View
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total books: {books.length}
      </div>
    </div>
  );
};

export default DisplayPage;