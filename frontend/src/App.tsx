// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64"> {/* Add left margin for larger screens */}
        <Routes>
          {/* <Route path="/" element={
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold mb-4">React FastAPI Sample Project</h1>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Click me
              </button>
            </div>
          } /> */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
