import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Starfield from './Starfield';
import Cards from './components/Cards'; // Maths
import Science from './components/Science';
import English from './components/English';
import Sinhala from './components/Sinhala';
import About from './components/About';  // Import About component

const Home = () => {
  return (
    <>
      <div className="default-background">
        <nav className="navbar">
          <div className="studybuddy">
            Study<span>Budy</span>
            <ul className="nav-links">
              
            </ul>
          </div>
        </nav>
      </div>

      <Starfield />

      <div className="subject-buttons">
        <Link className="galaxy-button" to="/Cards">Maths</Link>
        <Link className="galaxy-button" to="/Science">Science</Link>
        <Link className="galaxy-button" to="/Sinhala">Sinhala</Link>
        <Link className="galaxy-button" to="/English">English</Link>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />  {/* Add About route */}
        <Route path="/Cards" element={<Cards subject="Maths" />} />
        <Route path="/Science" element={<Science />} />
        <Route path="/English" element={<English />} />
        <Route path="/Sinhala" element={<Sinhala />} />
      </Routes>
    </Router>
  );
};

export default App;
