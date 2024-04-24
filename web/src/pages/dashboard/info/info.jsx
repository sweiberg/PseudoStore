import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faUsers, faDollarSign, faBox } from '@fortawesome/free-solid-svg-icons'

const Info = () => {

    const [info, setInfo] = useState({
        tuples: 0,
        users: 0,
        sales: 0,
        products: 0
    });

    React.useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return; // Exit the function if no token is found
            }

            // Configure the headers for the axios request
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            // Make the axios call with the configured headers
            const response = await axios.get('http://localhost:4300/api/dashboard/stats', config);
            console.log(response.data);
            setInfo({
                tuples: response.data.total_count,
                users: response.data.member_count,
                sales: response.data.order_count,
                products: response.data.product_count
            });
        } catch (error) {
            console.error("Failed to fetch info:", error);
            setInfo({ tuples: 0, users: 0, sales: 0, products: 0 });
        }
    };

    return (
        <div className="flex flex-wrap">
            {info && (
                <>
                    <InfoCard title="TUPLES" value={info.tuples} icon={faLayerGroup} color="bg-red-500" />
                    <InfoCard title="USERS" value={info.users} icon={faUsers} color="bg-orange-500" />
                    <InfoCard title="SALES" value={info.sales} icon={faDollarSign} color="bg-green-500" />
                    <InfoCard title="PRODUCTS" value={info.products} icon={faBox} color="bg-blue-500" />
                </>
            )}
        </div>
    );
};

const InfoCard = ({ title, value, icon, color }) => (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">{title}</h5>
                        <span className="font-semibold text-xl text-blueGray-700">{value.toLocaleString()}</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                        <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${color}`}>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Info;