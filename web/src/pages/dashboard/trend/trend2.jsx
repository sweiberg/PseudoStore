import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";
import Button from "../buttons/button"

function MonthPicker({ value, minDate, maxDate, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative inline-block text-left mr-4">
        <input className="justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="month" value={value} min={minDate} max={maxDate} onChange={handleChange} />
    </div>
  );
}


function Trend2() {
  const name = "Geographical Trends";
  const [graphData, setGraphData] = useState([]);
  const [lowDate, setLowDate] = useState('2017-01');
  const [highDate, setHighDate] = useState('2018-01');
  const minLowDate = '2015-01'
  const maxHighDate = '2022-12'

  // Either pre-fill the button lists or API sends an array of them
  const dropdown = {
    first: {
      title: "Municipality",
      list: [
        { id: 1, name: 'Sumatera Barat' },
        { id: 2, name: 'Jakarta Raya' },
        { id: 3, name: 'Nusa Tenggara Barat' },
        { id: 4, name: 'Kalimantan Timur' },
        { id: 5, name: 'Kalimantan Selatan' },
        { id: 6, name: 'Kepulauan Riau' },
        { id: 7, name: 'Bengkulu' },
        { id: 8, name: 'Jawa Barat' },
        { id: 9, name: 'Nusa Tenggara Timur' },
        { id: 10, name: 'Yogyakarta' },
        { id: 11, name: 'Jawa Timur' },
        { id: 12, name: 'Jawa Tengah' },
        { id: 13, name: 'Sulawesi Tenggara' },
        { id: 14, name: 'Lampung' },
        { id: 15, name: 'Bangka Belitung' },
        { id: 16, name: 'Maluku' },
        { id: 17, name: 'Sulawesi Utara' },
        { id: 18, name: 'Kalimantan Barat' },
        { id: 19, name: 'Kalimantan Tengah' },
        { id: 20, name: 'Bali' },
        { id: 21, name: 'Sulawesi Barat' },
        { id: 22, name: 'Jambi' },
        { id: 23, name: 'Sumatera Utara' },
        { id: 24, name: 'Papua Barat' },
        { id: 25, name: 'Riau' },
        { id: 26, name: 'Sulawesi Selatan' },
        { id: 27, name: 'Maluku Utara' },
        { id: 28, name: 'Banten' },
        { id: 29, name: 'Papua' },
        { id: 30, name: 'Sulawesi Tengah' },
        { id: 31, name: 'Sumatera Selatan' },
        { id: 32, name: 'Aceh' },
        { id: 33, name: 'Gorontalo' }
      ],
      selected: { id: 1, name: 'Sumatera Barat' }
    },
  };
  
  const handleSelectionChange = (identifier, item) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [identifier]: item
    }));
  };
  
  const [selections, setSelections] = useState({
    first: dropdown.first.selected
  });
  
  useEffect(() => {
    fetchData();
  }, [selections, selections.first, lowDate, highDate]);

  const fetchData = async () => {
    const payload = {
        municipality: selections.first.name,
        low_date: lowDate,
        high_date: highDate
    };

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        console.log(payload);
        const response = await axios.post('http://localhost:4300/api/dashboard/trend/2', payload, config);

        if (!response.data || !response.data.data) {
          console.error('No data received from server');
          return;
        }

        setGraphData(response.data.data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
  };

  const data = {
    labels: graphData ? graphData.map(item => item.OrderMonth) : [],
    datasets: [
      {
        label: 'Result',
        backgroundColor: "#FFF",
        borderColor: '#FFF',
        color: '#FFF',
        data: graphData ? graphData.map(item => item.OrderCountGrowthRate) : [],
      },
    ],
  };
  
  const options = {
    plugins: {
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            color: "#FFF",
          }
        }
      },
    maintainAspectRatio: false,
    scales: {
      y: {
        border: {
          dash: [4, 4],
          display: false,
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
          tickBorderDash: [4, 4],
          drawTicks: true,
          drawOnChartArea: true
        },
        ticks: {
            color: "rgba(255,255,255,0.75)",
            stepSize: 5
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false
        },
        ticks: {
            color: 'rgba(255,255,255,0.75)',
            stepSize: 5
        }
      }
    }
  };

  return (
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Graph</h6>
                <h2 className="text-white text-xl font-semibold">{name}</h2>
            </div>
            <div className="p-4 flex-auto"><div className="relative h-650-px"><Line data={data} options={options} /></div></div>
          </div>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">SQL</h6>
                          <h2 className="text-blueGray-700 text-xl font-semibold">{name}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-auto"><div className="relative h-650-px">Test</div></div>
              </div>
          </div>
          <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          {Object.entries(dropdown).map(([key, { title, list, selected }]) => (
            <Button key={key}
              title={title}
              list={list}
              onSelectionChange={(item) => handleSelectionChange(key, item)}
            />
          ))}
            <MonthPicker label="Low Date" value={lowDate} minDate={minLowDate} maxDate={highDate} onChange={setLowDate} />
            <MonthPicker label="High Date" value={highDate} minDate={lowDate} maxDate={maxHighDate} onChange={setHighDate} />
        </div>
      </div>
      </div>
  );
};

export default Trend2;