import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HomePage } from './pages/HomePage.js';
import { TopRank } from './pages/Page2.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Global() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/page2" element={<TopRank />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Global />);