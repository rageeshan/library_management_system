import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyBooks = [
  { id: "1", title: "React Basics", author: "John Doe", description: "Intro to React" },
  { id: "2", title: "C# Mastery", author: "Jane Smith", description: "Advanced C# concepts" },
  { id: "3", title: "Tailwind CSS", author: "Mike Johnson", description: "Styling with Tailwind" },
];

function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = dummyBooks.find((b) => b.id === id);

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");

  if (!book) {
    return <p className="text-red-500">Book not found</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, title, author, description });
    alert("Book updated (dummy)");
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Edit Book</h2>

      <form onSubmit={handleSubmit} className="max-w-md bg-white shadow-md rounded-xl p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditPage;