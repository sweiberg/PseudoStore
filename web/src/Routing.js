import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Category from './pages/category'
import Product from './pages/product';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard/index';
import Login from './pages/login';
import Register from './pages/register';

export const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}