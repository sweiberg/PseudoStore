import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faHome, faImage, faUserPlus, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import './side.css'

const Side = ({ trends, setCurrentTrend, currentTrend }) => {
    return (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
            <Link to="/" className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">Pseudo Store</Link>
            <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
                <hr className="my-4 md:min-w-full" />
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Trend Queries</h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    {trends.map(trend => (
                        <li className="items-center">
                            <button key={trend.name} onClick={() => setCurrentTrend(trend.name)} className={`link-button${currentTrend === trend.name ? " active" : ""} text-xs uppercase py-3 font-bold block`}><FontAwesomeIcon icon={faChartLine} className="fas fa-tools mr-2 text-sm text-blueGray-300 min-w-5" />{trend.name}</button>
                        </li>
                    ))}
                </ul>
                <hr className="my-4 md:min-w-full" />
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Store Features</h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    <li className="items-center">
                        <Link to="/" className="link-button text-xs uppercase py-3 font-bold block"><FontAwesomeIcon icon={faImage} className="fas fa-tools mr-2 text-sm text-blueGray-300 min-w-5" />Add Product Image</Link>
                    </li>
                    <li className="items-center">
                        <Link to="/" className="link-button text-xs uppercase py-3 font-bold block"><FontAwesomeIcon icon={faPiggyBank} className="fas fa-tools mr-2 text-sm text-blueGray-300 min-w-5" />Add Promotion</Link>
                    </li>
                    <li className="items-center">
                        <Link to="/" className="link-button text-xs uppercase py-3 font-bold block"><FontAwesomeIcon icon={faUserPlus} className="fas fa-tools mr-2 text-sm text-blueGray-300 min-w-5" />Create New User</Link>
                    </li>
                </ul>
                <hr className="my-4 md:min-w-full" />
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Site Directory</h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    <li className="items-center">
                        <Link to="/" className="link-button text-xs uppercase py-3 font-bold block"><FontAwesomeIcon icon={faHome} className="fas fa-tools mr-2 text-sm text-blueGray-300 min-w-5" />Return Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Side;