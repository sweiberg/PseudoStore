import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from './pages/home';
import Product from './pages/product';
import Cart from './pages/cart';
import Panel from './pages/panel/index';

export const Routing = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/panel/index" element={<Panel />} />
            </Routes>
        </Router>
    )
}