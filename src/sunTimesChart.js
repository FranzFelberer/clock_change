import React from 'react';
import { Line } from 'react-chartjs-2';
import SunCalc from 'suncalc';


class SunTimesChart extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            scales: {
                xAxes: [{
                    type: 'time'
                }]
            }
        }
    }

    render() {
        return <Line data={this.calculateData} options={options}/>;
    }

    // at Lyon (France) for the year 2019
    calculateData() {
        const latidute = 45.75,
              longitude = 4.85,
              startDate = new Date('2019-01-01T00:00:00'),
              endDate = new Date('2019-12-31T00:00:00');

        let dt = new Date(startDate);
        let data = [];
        while (dt.getFullYear() === 2019) {
            let sunTimes = SunCalc.getTimes(dt, latidute, longitude);
            let sunRise = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes()/60;
            data.push({ t: new Date(dt), y: sunRise});
            dt.setDate(dt.getDate() + 1);
        }

        console.log(data);

        return {
            datasets: [
                { data: data }
            ]
        }
    }
}

export default SunTimesChart;

const options = {
    scales: {
        xAxes: [{
            type: 'time'}]}}