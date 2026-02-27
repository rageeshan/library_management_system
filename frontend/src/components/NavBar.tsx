import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">LibraryMS</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-green-400 transition">Books</Link>
          <Link to="/add" className="hover:text-green-400 transition">Add Book</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;