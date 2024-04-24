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

function Trend1() {
  const name = "Product Preferences";
  const [graphData, setGraphData] = useState([]);
  const [lowDate, setLowDate] = useState('2017-01');
  const [highDate, setHighDate] = useState('2022-01');
  const minLowDate = '2015-01'
  const maxHighDate = '2022-12'

  const categorySubcategories = {
    Apparel: [
      { id: 1, name: 'Apparel Set' },
      { id: 2, name: 'Bottomwear' },
      { id: 3, name: 'Dress' },
      { id: 4, name: 'Innerwear' },
      { id: 5, name: 'Loungewear and Nightwear' },
      { id: 6, name: 'Saree' },
      { id: 7, name: 'Topwear' }
    ],
    Accessories: [
      { id: 1, name: 'Bags' },
      { id: 2, name: 'Belts' },
      { id: 3, name: 'Cufflinks' },
      { id: 4, name: 'Eyewear' },
      { id: 5, name: 'Gloves' },
      { id: 6, name: 'Headwear' },
      { id: 7, name: 'Jewellery' },
      { id: 8, name: 'Mufflers' },
      { id: 9, name: 'Scarves' },
      { id: 10, name: 'Shoe Accessories' },
      { id: 11, name: 'Socks' },
      { id: 12, name: 'Sports Accessories' },
      { id: 13, name: 'Stoles' },
      { id: 14, name: 'Ties' },
      { id: 15, name: 'Umbrellas' },
      { id: 16, name: 'Wallets' },
      { id: 17, name: 'Watches' },
      { id: 18, name: 'Water Bottle' }
    ],
    Footwear: [
      { id: 1, name: 'Flip Flops' },
      { id: 2, name: 'Sandal' },
      { id: 1, name: 'Shoes' }
    ],
    "Personal Care": [
      { id: 1, name: 'Bath and Body' },
      { id: 2, name: 'Beauty Accessories' },
      { id: 3, name: 'Eyes' },
      { id: 4, name: 'Fragrance' },
      { id: 5, name: 'Hair' },
      { id: 6, name: 'Lips' },
      { id: 7, name: 'Makeup' },
      { id: 8, name: 'Nails' },
      { id: 9, name: 'Perfumes' },
      { id: 10, name: 'Skin' },
      { id: 11, name: 'Skin Care' }
    ],
    "Free Items": [
      { id: 1, name: 'Free Gifts' },
      { id: 2, name: 'Vouchers' }
    ],
    "Sporting Goods": [
      { id: 1, name: 'Sports Equipment' },
      { id: 2, name: 'Wristbands' }
    ],
    "Home": [
      { id: 1, name: 'Home Furnishing' }
    ]
  };

  const dropdown = {
    first: {
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
    second: {
      title: "Product Subcategory",
      list: [],
      selected: { id: 1, name: 'Apparel Set' }
    },
    third: {
      title: "Low Age",
      list: [{ id: 15, name: 15 }, { id: 25, name: 25 }, { id: 35, name: 35 }, { id: 45, name: 45 }, { id: 55, name: 55 }, { id: 65, name: 65 }, { id: 75, name: 75 }],
      selected: { id: 25, name: 25 }
    },
    fourth: {
      title: "High Age",
      list: [{ id: 15, name: 15 }, { id: 25, name: 25 }, { id: 35, name: 35 }, { id: 45, name: 45 }, { id: 55, name: 55 }, { id: 65, name: 65 }, { id: 75, name: 75 }],
      selected: { id: 35, name: 35 }
    },
    fifth: {
      title: "Gender",
      list: [{ id: 1, name: 'M' }, { id: 2, name: 'F' }],
      selected: { id: 1, name: 'M' }
    },
    sixth: {
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
    }
  };

  const [selections, setSelections] = useState({
    first: dropdown.first.selected,
    second: dropdown.second.selected,
    third: dropdown.third.selected,
    fourth: dropdown.fourth.selected,
    fifth: dropdown.fifth.selected,
    sixth: dropdown.sixth.selected
  });

  const [subcategories, setSubcategories] = useState(categorySubcategories[dropdown.first.selected.name]);

  useEffect(() => {
    setSubcategories(categorySubcategories[selections.first.name]);
    // Update the selected subcategory when category changes
    setSelections(prevSelections => ({
      ...prevSelections,
      second: categorySubcategories[selections.first.name][0]
    }));
  }, [selections.first]);

  useEffect(() => {
    fetchData();
  }, [selections, selections.first, lowDate, highDate]);

  const handleSelectionChange = (identifier, item) => {
    setSelections(prevSelections => {
      const newSelections = { ...prevSelections, [identifier]: item };
      if (identifier === 'first') {
        setSubcategories(categorySubcategories[item.name]);
        newSelections.second = categorySubcategories[item.name][0];
      }
      return newSelections;
    });
  };

  const fetchData = async () => {
    const payload = {
        category: selections.first.name,
        subcategory: selections.second.name,
        low_age: selections.third.name,
        high_age: selections.fourth.name,
        gender: selections.fifth.name,
        municipality: selections.sixth.name,
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
        const response = await axios.post('http://localhost:4300/api/dashboard/trend/1', payload, config);

        if (!response.data || !response.data.data) {
          console.error('No data received from server');
          return;
        }

        setGraphData(response.data.data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
  };

  const Time = graphData ? graphData.map(item => item.OrderMonth) : [];
  if (Time.length > 0) {
    Time.pop();
  }
  const data = {
    labels: Time,
    datasets: [
      {
        label: 'Result',
        backgroundColor: "#FFF",
        borderColor: '#FFF',
        color: '#FFF',
        data: graphData ? graphData.map(item => item.TotalOrders) : [],
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
      <div className="flex flex-wrap" >
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
                            <span className="pl-4 inline-block">TO_CHAR(o.CREATED_AT, 'YYYY-MM') AS OrderMonth,</span><br />
                            <span className="pl-4 inline-block">COUNT(*) AS TotalOrders</span><br />
                            FROM<br /> 
                                <span className="pl-4 inline-block">ORDERS o</span><br />
                                <span className="pl-4 inline-block">INNER JOIN MEMBERS m ON o.MEMBER_ID = m.ID</span><br />
                                <span className="pl-4 inline-block">INNER JOIN PRODUCTS p ON o.PRODUCT_ID = p.ID</span><br />
                                <span className="pl-4 inline-block">INNER JOIN CATEGORIES c ON p.CATEGORY_ID = c.ID</span><br />
                                <span className="pl-4 inline-block">INNER JOIN SUBCATEGORIES s ON p.SUBCATEGORY_ID = s.ID</span><br />
                            WHERE<br /> 
                                <span className="pl-4 inline-block">c.NAME = <strong>'{selections.first.name}'</strong> AND</span><br />
                                <span className="pl-4 inline-block">s.NAME = <strong>'{selections.second.name}'</strong> AND</span><br />
                                <span className="pl-4 inline-block">TRUNC(MONTHS_BETWEEN(SYSDATE, m.BIRTHDATE) / 12) BETWEEN <strong>{selections.third.name}</strong> AND <strong>{selections.fourth.name}</strong> AND</span><br />
                                <span className="pl-4 inline-block">m.GENDER = <strong>'{selections.fifth.name}'</strong> AND</span><br />
                                <span className="pl-4 inline-block">m.MUNICIPALITY = <strong>'{selections.sixth.name}'</strong> AND</span><br />
                                <span className="pl-4 inline-block">o.CREATED_AT BETWEEN TO_DATE(<strong>'{lowDate}'</strong>, 'YYYY-MM') AND </span><br />
                                <span className="pl-4 inline-block">TO_DATE(<strong>'{highDate}'</strong>, 'YYYY-MM')</span><br /> 
                            GROUP BY<br /> 
                                <span className="pl-4 inline-block">TO_CHAR(o.CREATED_AT, 'YYYY-MM')</span><br />
                            ORDER BY<br /> 
                                <span className="pl-4 inline-block">OrderMonth;</span><br />
                        </code>
                    </div>
                </div>
              </div>
          </div>
          <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          {Object.entries(dropdown).map(([key, { title, list }]) => (
            <Button
              key={key === 'first' ? `${key}_${selections.name}` : `${key}_${selections.first.name}`}
              title={title}
              list={key === 'second' ? subcategories : list}
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

export default Trend1;