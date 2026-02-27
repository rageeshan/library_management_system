import './App.css'
import { Routes, Route } from 'react-router-dom'
import DisplayPage from './pages/DisplayPage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'


function App() {

  return (
    <div className="min-h-screen bg-slate-100">
    <main className="max-w-6xl mx-auto p-6">
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </main>
  </div>
  )
}

export default App
