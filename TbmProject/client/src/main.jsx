import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from '../src/components/Menu';
import ListeUser from '../src/components/Favori/listeUser';
import ProfileInfo from '../src/components/Favori/profileInfo';
import BusScreen from '../src/components/voirBus/busScreen.jsx';
import axios from 'axios';
import '../src/assets/Css/index.css';
import '../src/assets/Css/App.css';

// axios.defaults.baseURL = 'https://tbm-theta.vercel.app';
axios.defaults.baseURL = 'http://localhost:4000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1> TbHESS </h1>
    <Router>
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route path="/profile/:profile" element={<ProfileInfo />} />
        <Route path="/profiles/" element={<ListeUser />} />
        <Route path="/voir-horaires/" element={<BusScreen />} />
        <Route path="/profile/:profile/voir-horaires/" element={<BusScreen />} />
      </Routes>
    </Router>
    <p>V1.1</p>
  </React.StrictMode>
);