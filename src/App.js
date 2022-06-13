import { Routes, Route, Router, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main">
        <Routes>
          <Route path="/" element={< Home/ >} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
