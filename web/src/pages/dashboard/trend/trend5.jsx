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

function Trend5() {
  const name = "Seasonal Payment Processing";
  const [graphData, setGraphData] = useState([]);
  const [lowDate, setLowDate] = useState('2017-01');
  const [highDate, setHighDate] = useState('2022-01');
  const minLowDate = '2015-01'
  const maxHighDate = '2022-12'

  // Either pre-fill the button lists or API sends an array of them
  const dropdown = {
    first: {
      title: "Season",
      list: [{ id: 1, name: 'Fall' }, { id: 2, name: 'Summer' }, { id: 3, name: 'Winter' }, { id: 4, name: 'Spring' }],
      selected: { id: 1, name: 'Fall' }
    },
    second: {
      title: "Product Category",
      list: [
        { id: 1, name: 'Apparel' }, 
        { id: 2, name: 'Accessories' }, 
        { id: 3, name: 'Footwear' },
        { id: 4, name: 'Personal Care' },
        { id: 5, name: 'Free Items' },
        { id: 6, name: 'Sporting Goods' },
        { id: 7, name: 'Home' }
    ],
      selected: { id: 1, name: 'Apparel' }
    },
    third: {
      title: "Item Count",
      list: [
        { id: 1, name: 1 }, 
        { id: 2, name: 2 }, 
        { id: 3, name: 3 }, 
        { id: 4, name: 4 }, 
        { id: 5, name: 5 }, 
        { id: 6, name: 6 }, 
        { id: 7, name: 7 }, 
        { id: 8, name: 8 }, 
        { id: 9, name: 9 }, 
        { id: 10, name: 10 }, 
        { id: 11, name: 11 }, 
        { id: 12, name: 12 }, 
        { id: 13, name: 13 }, 
        { id: 14, name: 14 }, 
        { id: 15, name: 15 }, 
        { id: 16, name: 16 }, 
        { id: 17, name: 17 }, 
        { id: 18, name: 18 }, 
        { id: 19, name: 19 }, 
        { id: 20, name: 20 }, 
      ],
      selected: { id: 3, name: 3 }
    },
  };
  
  const handleSelectionChange = (identifier, item) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [identifier]: item
    }));
  };
  
  const [selections, setSelections] = useState({
    first: dropdown.first.selected,
    second: dropdown.second.selected,
    third: dropdown.third.selected
  });

  useEffect(() => {
    fetchData();
  }, [selections, lowDate, highDate]);

  const fetchData = async () => {
    const payload = {
        season: selections.first.name,
        category_name: selections.second.name,
        low_date: lowDate,
        high_date: highDate,
        item_count: selections.third.name
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
      const response = await axios.post('http://localhost:4300/api/dashboard/trend/5', payload, config);
      console.log(response.data.data)
      if (!response.data || !response.data.data) {
        console.error('No data received from server');
        return;
      }

      setGraphData(response.data.data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
  };


  const Time = graphData ? [...new Set(graphData.map(item => item.OrderMonth))] : [];
  if (Time.length > 0) {
    Time.pop();
  }

  const Debit = graphData ? graphData.filter(item => item.Method === 'Debit Card').map(item => item.MultiCount): [];
  const Credit = graphData ? graphData.filter(item => item.Method === 'Credit Card').map(item => item.MultiCount): [];
  const OVO = graphData ? graphData.filter(item => item.Method === 'OVO').map(item => item.MultiCount): [];
  const LinkAja = graphData ? graphData.filter(item => item.Method === 'LinkAja').map(item => item.MultiCount): [];
  const Gopay = graphData ? graphData.filter(item => item.Method === 'Gopay').map(item => item.MultiCount): [];
 

  const data = {
    labels: Time,
    datasets: [
      {
        label: 'Debit Card',
        backgroundColor: "#FFF",
        borderColor: '#FFF',
        color:  '#FFF',
        data: Debit,
      },
      {
        label: 'Credit Card',
        backgroundColor: "#fea3aa",
        borderColor: '#fea3aa',
        color:  '#fea3aa',
        data: Credit,
        hidden: true,
      },
      {
        label: 'OVO',
        backgroundColor: "#faf884",
        borderColor: '#faf884',
        color:  '#faf884',
        data: OVO,
        hidden: true,
      },
      {
        label: 'LinkAja',
        backgroundColor: "#baed91",
        borderColor: '#baed91',
        color:  '#baed91',
        data: LinkAja,
        hidden: true,
      },
      {
        label: 'Gopay',
        backgroundColor: "#b2cefe",
        borderColor: '#b2cefe',
        color:  '#b2cefe',
        data: Gopay,
        hidden: true,
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
                  <div className="p-4 flex-auto">
                    <div className="relative h-650-px overflow-y-scroll">
                      <code className="block whitespace-pre-wrap">
                        SELECT<br /> 
                          <span className="pl-4 inline-block">TO_CHAR(o.created_at, 'YYYY-MM') AS Order_Month,</span><br />
                          <span className="pl-4 inline-block">pm.Method, COUNT(DISTINCT o.ID) AS Multi_Count</span><br />
                        FROM<br /> 
                          <span className="pl-4 inline-block">orders o</span><br />
                        JOIN<br /> 
                          <span className="pl-4 inline-block">Products p ON c.ID = p.Category_ID</span><br />
                        JOIN<br /> 
                          <span className="pl-4 inline-block">Payments pm ON o.ID = pm.Order_ID</span><br />
                        JOIN<br /> 
                          <span className="pl-4 inline-block">Categories c ON p.Category_ID = c.ID</span><br />
                        WHERE<br /> 
                          <span className="pl-4 inline-block">Line_Number &gt; <strong>{selections.third.name}</strong></span><br />
                        AND<br /> 
                          <span className="pl-4 inline-block">p.Season = <strong>'{selections.first.name}'</strong></span><br />
                        AND<br /> 
                          <span className="pl-4 inline-block">c.Name = <strong>'{selections.second.name}'</strong></span><br />
                        AND<br /> 
                          <span className="pl-4 inline-block">o.Created_At BETWEEN TO_DATE(<strong>'{lowDate}'</strong>, 'YYYY-MM') AND TO_DATE(<strong>'{highDate}'</strong>, 'YYYY-MM')</span><br />
                        GROUP BY<br /> 
                          <span className="pl-4 inline-block">pm.Method,</span><br />
                          <span className="pl-4 inline-block">TO_CHAR(o.created_at, 'YYYY-MM'), pm.Method</span><br />
                        ORDER BY<br /> 
                          <span className="pl-4 inline-block">Order_Month, Multi_Count DESC</span><br />
                      </code>
                    </div>
                  </div>
              </div>
          </div>
          <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          {Object.entries(dropdown).map(([key, { title, list }]) => (
            <Button 
              key={key}
              title={title}
              list={list}
              selected={selections[key]}
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

export default Trend5;