import React, {useEffect, useState} from 'react'
import {Line} from "react-chartjs-2"
import numeral from 'numeral'
    const options1 = {
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format("+0,0");
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
              },
            },
          ],
        },
    };




function LineGraph() {
    const [data, setData]= useState({})

    const buildChartData = (casesData) => {
        const chartData =[];
        let lastDataPoint;
        for (let date in casesData){
            if(lastDataPoint){
                let newDataPoint ={
                    x:date,
                    y:casesData[date]-lastDataPoint,
                };
                chartData.push(newDataPoint)
            }
            lastDataPoint =casesData[date]
        }
        return chartData
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            await  fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
             .then((response) => {
                 return response.json()
                })
              .then(data =>{
                  const rawCases=(data['cases'])
             let chartData = buildChartData(rawCases);
             setData(chartData)
             
        })
    }; 
    fetchData()
    }, []) 

    return (
        <div>
            {data?.length >0 &&(
            <Line
            options={options1}
            data={{
                datasets: [
                    {
                        data:data,
                        borderColor:"rgba(20, 16, 2, 0.5)",
                        backgroundColor: "rgb(10,290,30)"
                    },
                ]
            }}
            />
            )} 
        </div>
    )
}

export default LineGraph
