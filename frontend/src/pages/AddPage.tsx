import React, { useState } from "react";

function AddPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, author, description });
    alert("Book submitted (dummy)");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add a Book</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white shadow-md rounded-xl p-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddPage;