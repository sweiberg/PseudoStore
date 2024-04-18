import React, { useState } from "react";
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import Side from './side/side.js';
import Trend1 from "./trend/trend1.js";
import Trend2 from "./trend/trend2.js";
import Trend3 from "./trend/trend3.js";
import Trend4 from "./trend/trend4.js";
import Trend5 from "./trend/trend5.js";
import Info1 from "./info/info1.js"
import Info2 from "./info/info2.js"
import Info3 from "./info/info3.js"
import Info4 from "./info/info4.js"
import Footer from '../../components/footer'

Chart.register(CategoryScale);

const Dashboard = () => {
    const [currentTrend, setCurrentTrend] = useState('Trend 1');

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
                <div className="relative md:ml-64 bg-blueGray-100">
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
                    <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
                        <div className="px-4 md:px-10 mx-auto w-full">
                            <div>
                                <div className="flex flex-wrap">
                                    <Info1 />
                                    <Info2 />
                                    <Info3 />
                                    <Info4 />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        {trends.find(t => t.name === currentTrend).component}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;