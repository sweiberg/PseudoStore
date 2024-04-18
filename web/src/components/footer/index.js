import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="relative block py-4 mt-24">
                <div className="mx-auto px-4">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4">
                            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Created by <Link to="/about" className="link-button">Group 04</Link> - CIS4301 Spring 2024
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
 
export default Footer;