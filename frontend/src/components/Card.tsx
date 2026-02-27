import { useNavigate } from "react-router-dom";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

const Card: React.FC<BookCardProps> = ({ id, title, author, description }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-1">Author: {author}</p>
      {description && <p className="text-gray-500 mb-3">{description}</p>}
      <div className="flex gap-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;