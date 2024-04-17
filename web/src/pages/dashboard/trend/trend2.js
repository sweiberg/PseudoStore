import React from "react";
import { Line } from "react-chartjs-2";

const name = "Trend 2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "#FFF",
      borderColor: '#FFF',
      color:  '#FFF',
      data: [0, 5, 15, 0, 30, 20, 15],
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

const Trend2 = () => {
  return (
    <div className="px-4 md:px-10 mx-auto w-full -m-24">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Graph</h6>
                <h2 className="text-white text-xl font-semibold">{name}</h2>
            </div>
            <div className="p-4 flex-auto"><div className="relative h-350-px"><Line data={data} options={options} /></div></div>
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
                  <div className="p-4 flex-auto"><div className="relative h-350-px">Test</div></div>
              </div>
          </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          Test
        </div>
      </div>
    </div>
  );
};

export default Trend2;