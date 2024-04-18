import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/category">Category</Link></li>
                    <li><Link to="/product">Product</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>                   
                </ul>
            </nav>

            <Outlet />
        </>
    );
};
 
export default Navbar;