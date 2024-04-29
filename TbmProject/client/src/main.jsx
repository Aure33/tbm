import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from '@/components/Menu';
import BusScreen from '@/components/voirBus/busScreen.jsx';
import axios from 'axios';
import '@/assets/Css/index.css';
import '@/assets/Css/App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from '@/context/authContext';
import NavBar from '@/components/NavBar.jsx';
import ListFavoris from "@/components/listeFavori/listFavoris.jsx";
import store from '@/store/index';
import { Provider } from 'react-redux';
import '../../serveur/config.js';

//axios.defaults.baseURL = 'https://tbm-theta.vercel.app';
axios.defaults.baseURL = 'http://localhost:4000';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NavBar />
    <h1> TbHESS </h1>
    <Router>
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route path="/voir-horaires/" element={<BusScreen />} />
        <Route path="/favoris" element={<ListFavoris />} />
      </Routes>
    </Router>
    <p>V1.2</p>
    </AuthContextProvider>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);