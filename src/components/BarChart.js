import { BarChart } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

function Chart() {

    const [chartData, setChartData] = useState({});
    const [activity, setActivity] = useState([]);
    const [duration, setDuration] = useState([]);

    useEffect(() => {
        getChartData();
    },[])

        const getChartData = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setChartData(data))
            .catch(err => console.error(err))
        }
        console.log(chartData)

        return(
            <div>
                <Bar
                    data={{
                        labels: [activity, duration],
                        datasets: [
                            {
                             data: chartData
                            }
                        ]
                    }}
                />
            </div>
        )

    }

export default Chart;



