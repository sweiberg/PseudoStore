import React, { useState } from "react";
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import Side from './side/side.jsx';
import Trend1 from "./trend/trend1.jsx";
import Trend2 from "./trend/trend2.jsx";
import Trend3 from "./trend/trend3.jsx";
import Trend4 from "./trend/trend4.jsx";
import Trend5 from "./trend/trend5.jsx";
import Info1 from "./info/info.jsx"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);

const Dashboard = () => {
    const [currentTrend, setCurrentTrend] = useState('Trend 1');
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const trends = [
        { name: 'Trend 1', component: <Trend1 /> },
        { name: 'Trend 2', component: <Trend2 /> },
        { name: 'Trend 3', component: <Trend3 /> },
        { name: 'Trend 4', component: <Trend4 /> },
        { name: 'Trend 5', component: <Trend5 /> }
    ];

    return (
        <>
            <div>
                <Side trends={trends} setCurrentTrend={setCurrentTrend} currentTrend={currentTrend} />
                <div className="h-dvh relative md:ml-64 bg-blueGray-100">
                    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                            <span className="text-white text-sm uppercase hidden lg:inline-block font-semibold">Dashboard</span>
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <span className="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full mr-2">
                                    <img alt="..." className="w-full rounded-full align-middle border-none shadow-lg" src="https://demos.creative-tim.com/notus-nextjs/img/team-1-800x800.jpg" />
                                </span>
                                <span className="text-white text-sm uppercase hidden lg:inline-block font-semibold">Administrator</span>
                            </ul>
                        </div>
                    </nav>
                    <div className="h-fit relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                        <div className="px-4 md:px-10 mx-auto w-full">
                            <div>
                                <Info1 />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        {trends.find(t => t.name === currentTrend).component}
                    </div>
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
                </div>
            </div>
        </>
    );
};

export default Dashboard;