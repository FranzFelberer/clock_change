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
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 24
                    }
                }]
            }
        }
    }

    render() {
        return <Line data={this.calculateData} options={this.options} />;
    }

    // at Lyon (France) for the year 2019
    calculateData() {
        const latidute = this.props.latitude,
              longitude = this.props.longitude,
              startDate = new Date(this.props.startDate),
              endDate = new Date(this.props.endDate),
              wakeUpTime = Number.parseInt(this.props.wakeUpTime.split(':')[0])
                         + Number.parseInt(this.props.wakeUpTime.split(':')[1])/ 60,
              bedTime = Number.parseInt(this.props.bedTime.split(':')[0])
                + Number.parseInt(this.props.bedTime.split(':')[1]) / 60,
              timeModel = this.props.timeModel;

        let dt = new Date(startDate);
        let sunRiseSeries = [],
            wakeUpSeries = [],
            sunSetSeries = [],
            bedTimeSeries = [];

        while (dt <= endDate) {
            let sunRise;
            let sunSet;
            let sunTimes = SunCalc.getTimes(dt, latidute, longitude);

            switch (timeModel) {
                case 'clockChange':
                    sunRise = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 60;
                    break;
                case 'alwaysSummerTime':
                    sunRise = sunTimes.sunrise.getUTCHours() + 2 + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() + 2 + sunTimes.sunset.getMinutes() / 60;
                    break;
                case 'alwaysWinterTime':
                    sunRise = sunTimes.sunrise.getUTCHours() + 1 + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() + 1 + sunTimes.sunset.getMinutes() / 60;
                    break;
            }

            sunRiseSeries.push({ t: new Date(dt), y: sunRise});
            sunSetSeries.push({ t: new Date(dt), y: sunSet });
            wakeUpSeries.push({ t: new Date(dt), y: wakeUpTime});
            bedTimeSeries.push({ t: new Date(dt), y: bedTime });

            dt.setDate(dt.getDate() + 1);
        }

        return {
            datasets: [
                {   label: "sunRise",
                    data: sunRiseSeries,
                    borderColor: 'rgba(244, 241, 66, 1)'
                },
                {   label: "wakeUp",
                    data: wakeUpSeries,
                    fill: false
                },
                {   label: "sunSet",
                    data: sunSetSeries,
                    fill: 'end',
                    borderColor: 'rgba(244, 187, 65, 1)'
                },
                {
                    label: "bedTime",
                    data: bedTimeSeries,
                    fill: false
                }
            ]
        }
    }
}

export default SunTimesChart;