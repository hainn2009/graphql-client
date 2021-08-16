import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

var dataBar = {
    labels: ['Ngày 1 ', 'Ngày 2', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Số ca mắc',
            data: [12, 19, 3, 5, 2, 30, 60, 54],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const VerticalBar = () => {
    // : { getVNStatus: status } = {}
    const { loading, data: { getVNStatus: status } = {} } = useQuery(gql`
        query {
            getVNStatus {
                Confirmed
                Date
            }
        }
    `);

    // datasets
    dataBar = {
        ...dataBar,
        labels: status.map((i) => new Date(i.Date).toLocaleDateString('vi-VN')),
        datasets: [
            { ...dataBar.datasets[0], data: status.map((i) => i.Confirmed) },
        ],
        //labels: status.map((i) => i.Date),
    };
    console.dir(dataBar);

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <div className="header">
                <h1 className="title">Diễn biến dịch Covid tại Việt Nam</h1>
            </div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Bar data={dataBar} options={options} />
            )}
        </div>
    );
};

export default VerticalBar;
