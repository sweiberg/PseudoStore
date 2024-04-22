import React, { useState } from 'react';
import { Line } from "react-chartjs-2";
import Button from "../buttons/button"

function Trend2() {
  const name = "Geographical Trends";


  // Either pre-fill the button lists or API sends an array of them
  const dropdown = {
    first: {
      title: "Type",
      list: [{ id: 1, name: 'Membership Growth' }, { id: 2, name: 'Order Distribution' }],
      selected: { id: 1, name: 'Membership Growth' }
    },
    second: {
      title: "Municipality",
      list: [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }, { id: 3, name: 'Test 3' }],
      selected: { id: 1, name: 'Test 1' }
    }
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
  
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: `${dropdown.first.title}: ${selections.first.name}, ${dropdown.second.title}: ${selections.second.name}`,
        backgroundColor: "#FFF",
        borderColor: '#FFF',
        color:  '#FFF',
        data: [0, 20, 5, 22, 30, 40, 55],
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
        </div>
      </div>
      </div>
  );
};

export default Trend2;