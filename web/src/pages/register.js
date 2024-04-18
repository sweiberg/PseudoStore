import React from 'react';
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
                <div className="px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/" className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">Pseudo Store</Link>
                    </div>
                </div>
            </nav>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full" style={{backgroundImage: 'url("https://demos.creative-tim.com/notus-nextjs/img/register_bg_2.png")'}}></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                    <div className="flex-auto px-4 lg:px-10 py-10">
                                        <div className="text-blueGray-400 text-center mb-3 font-bold"><small>Sign up with your credentials</small></div>
                                        <form>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="username">Username</label>
                                                <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="username" type="text" placeholder="Username" />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">Email</label>
                                                <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="email" type="text" placeholder="Email" />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="password">Password</label>
                                                <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="password" type="password" placeholder="Password" />
                                            </div>
                                            <div className="text-center mt-6">
                                                <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button">Create Account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6 relative">
                                    <div className="w-1/2">
                                        <Link to="/" className="text-blueGray-200"><small>Return to Pseudo Store</small></Link>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link to="/login" className="text-blueGray-200"><small>Already have an account?</small></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-20"><Footer /></div>
                </section>
            </main>
        </div>
    );
};
 
export default Register;