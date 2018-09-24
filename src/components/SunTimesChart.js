import React from 'react';
import { Line } from 'react-chartjs-2';
import SunCalc from 'suncalc';


class SunTimesChart extends React.Component {
    constructor(props) {
        super(props);
        this.calculateData =  this.calculateData.bind(this);
        this.options = {
            scales: {
                xAxes: [{
                    type: 'time'
                }]
            }
        }
    }

    render() {
        return <Line data={this.calculateData} options={this.options} />;
    }

    // at Lyon (France) for the year 2019
    calculateData() {
        const latidute = 45.75,
              longitude = 4.85,
              startDate = new Date('2019-01-01T00:00:00'),
              endDate = new Date('2019-12-31T00:00:00'),
              wakeUpTime = Number.parseInt(this.props.wakeUpTime.split(':')[0])
                         + Number.parseInt(this.props.wakeUpTime.split(':')[1])/60;

        let dt = new Date(startDate);
        let data = [];
        let wakeUp = [];
        while (dt.getFullYear() === 2019) {
            let sunTimes = SunCalc.getTimes(dt, latidute, longitude);
            let sunRise = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes()/60;
            data.push({ t: new Date(dt), y: sunRise});
            wakeUp.push({ t: new Date(dt), y: wakeUpTime});
            dt.setDate(dt.getDate() + 1);
        }

        return {
            datasets: [
                {   label: "sunrise",
                    data: data },
                {   label: "wakeup",
                    data: wakeUp }
            ]
        }
    }
}

export default SunTimesChart;