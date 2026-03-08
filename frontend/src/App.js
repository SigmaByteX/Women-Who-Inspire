import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Story from './pages/Story';
import AddStory from './pages/AddStory';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/story/:id" element={<Story />} />
            <Route path="/add" element={<AddStory />} />
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h2 style={{ fontSize: '3rem' }}>404</h2>
                <p>Page not found</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="footer">
          <p>Made with 💜 to celebrate women everywhere · International Women's Day</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
