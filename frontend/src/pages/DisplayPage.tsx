import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function DisplayPage() {
  const navigate = useNavigate();

  const books = [
    { id: 1, title: "React Basics", author: "John Doe", description: "Intro to React" },
    { id: 2, title: "C# Mastery", author: "Jane Smith", description: "Learn advanced C#" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Books</h2>
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Book
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default DisplayPage;