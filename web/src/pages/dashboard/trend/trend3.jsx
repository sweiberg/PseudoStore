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

function Trend3() {
  const name = "Promotion Effectiveness";
  const [graphData, setGraphData] = useState([]);
  const [lowDate, setLowDate] = useState('2017-01');
  const [highDate, setHighDate] = useState('2018-01');
  const minLowDate = '2015-01'
  const maxHighDate = '2022-12'


  // Either pre-fill the button lists or API sends an array of them
  const dropdown = {
    first: {
      title: "Low Age",
      list: [{ id: 15, name: 15 }, { id: 25, name: 25 }, { id: 35, name: 35 }, { id: 45, name: 45 }, { id: 55, name: 55 }, { id: 65, name: 65 }, { id: 75, name: 75 }],
      selected: { id: 25, name: 25 }
    },
    second: {
      title: "High Age",
      list: [{ id: 15, name: 15 }, { id: 25, name: 25 }, { id: 35, name: 35 }, { id: 45, name: 45 }, { id: 55, name: 55 }, { id: 65, name: 65 }, { id: 75, name: 75 }],
      selected: { id: 35, name: 35 }
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
    second: dropdown.second.selected
  });

  useEffect(() => {
    fetchData();
  }, [selections, lowDate, highDate]);

  const fetchData = async () => {
    const payload = {
        low_date: lowDate,
        high_date: highDate,
        low_age: selections.first.name,
        high_age: selections.second.name,
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
        const response = await axios.post('http://localhost:4300/api/dashboard/trend/3', payload, config);
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

  const paymentMonths = graphData ? [...new Set(graphData.map(item => item.PaymentMonth))] : [];
  if (paymentMonths.length > 0) {
    paymentMonths.pop();
  }

  const WithPromotion = graphData ? graphData.filter(item => item.PromotionStatus === 'With Promotion').map(item => item.TotalPayments): [];
  if (WithPromotion.length > 0) {
    WithPromotion.pop();
  }


  const WithoutPromotion = graphData ? graphData.filter(item => item.PromotionStatus === 'Without Promotion').map(item => item.TotalPayments): [];
  if (WithoutPromotion.length > 0) {
    WithoutPromotion.pop();
  }


  const data = {
    labels: paymentMonths,
    datasets: [
      {
        label: `With Promotion`,
        backgroundColor: "#FFF",
        borderColor: '#FFF',
        color:  '#FFF',
        data: WithPromotion,
      },
      {
        label: `Without Promotion`,
        backgroundColor: "#FF6961",
        borderColor: '#FF6961',
        color:  '#FF6961',
        hidden: true,
        data: WithoutPromotion,
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
                          WITH PaymentPromotion AS (<br />
                            <span className="pl-4 inline-block">SELECT</span><br />
                              <span className="pl-8 inline-block">TO_CHAR(p.created_at, 'YYYY-MM') AS payment_month,</span><br />
                              <span className="pl-8 inline-block">CASE</span><br />
                                <span className="pl-12 inline-block">WHEN p.promotion_value &gt; 0 THEN 'With Promotion'</span><br />
                                <span className="pl-12 inline-block">ELSE 'Without Promotion'</span><br />
                              <span className="pl-8 inline-block">END AS promotion_status,</span><br />
                              <span className="pl-8 inline-block">COUNT(*) AS payment_count</span><br />
                            <span className="pl-4 inline-block">FROM</span><br />
                              <span className="pl-8 inline-block">Payments p</span><br />
                              <span className="pl-8 inline-block">INNER JOIN Members m ON p.member_id = m.id</span><br />
                            <span className="pl-4 inline-block">WHERE</span><br />
                              <span className="pl-8 inline-block">p.created_at BETWEEN TO_DATE(<strong>'{lowDate}'</strong>, 'YYYY-MM') AND TO_DATE(<strong>'{highDate}'</strong>, 'YYYY-MM')</span><br />
                              <span className="pl-8 inline-block">AND EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM m.birthdate) BETWEEN <strong>{selections.first.name}</strong> AND <strong>{selections.second.name}</strong></span><br />
                            <span className="pl-4 inline-block">GROUP BY</span><br />
                              <span className="pl-8 inline-block">TO_CHAR(p.created_at, 'YYYY-MM'),</span><br />
                              <span className="pl-8 inline-block">CASE</span><br />
                                <span className="pl-12 inline-block">WHEN p.promotion_value &gt; 0 THEN 'With Promotion'</span><br />
                                <span className="pl-12 inline-block">ELSE 'Without Promotion'</span><br />
                              <span className="pl-8 inline-block">END</span><br />
                          )<br />
                          SELECT<br />
                            <span className="pl-4 inline-block">payment_month,</span><br />
                            <span className="pl-4 inline-block">promotion_status,</span><br />
                            <span className="pl-4 inline-block">SUM(payment_count) AS total_payments</span><br />
                          FROM<br />
                            <span className="pl-4 inline-block">PaymentPromotion</span><br />
                          GROUP BY<br />
                            <span className="pl-4 inline-block">payment_month, promotion_status</span><br />
                          ORDER BY<br />
                            <span className="pl-4 inline-block">payment_month, promotion_status;</span><br />
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

export default Trend3;