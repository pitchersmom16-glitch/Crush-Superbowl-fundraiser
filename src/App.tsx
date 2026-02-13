import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Landing } from './pages/Landing';
import { Board } from './pages/Board';
import { Admin } from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/board" element={<Board />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
