import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HomePage } from './pages/HomePage.js';
import { TopRank } from './pages/Page2.js';
import { FavorisPage } from "./pages/FavorisPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";

export default function Global() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/page2" element={<TopRank />}></Route>
                <Route path="/favoris" element={<FavorisPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Global />
    </Provider>);