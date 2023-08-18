import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

var dataBar = {
    labels: ["Ngày 1 ", "Ngày 2", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "Số ca mắc",
            data: [12, 19, 3, 5, 2, 30, 60, 54],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {};

const VerticalBar = () => {
    // const todayFullTime = new Date(Date.now());
    // const year = todayFullTime.getFullYear();
    // const month = todayFullTime.getMonth();
    // const date = todayFullTime.getDate();
    // const today = new Date(Date.UTC(year, month, date, 0, 0, 0, 0));
    // const days = 6;
    // const to = new Date(today.getTime() - 24 * 60 * 60 * 1000); //yesterday
    // const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);

    return (
        <div style={{ width: "400px", height: "400px" }}>
            <div className="header">
                <h1 className="title">Diễn biến dịch Covid tại Việt Nam</h1>
            </div>
            <Bar data={dataBar} options={options} />
        </div>
    );
};

export default VerticalBar;
