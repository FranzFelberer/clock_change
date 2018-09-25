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
                        max: 24,
                        stepSize: 2
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
              workStart = Number.parseInt(this.props.workStart.split(':')[0])
                + Number.parseInt(this.props.workStart.split(':')[1]) / 60,
              workEnd = Number.parseInt(this.props.workEnd.split(':')[0])
                + Number.parseInt(this.props.workEnd.split(':')[1]) / 60,
              bedTime = Number.parseInt(this.props.bedTime.split(':')[0])
                + Number.parseInt(this.props.bedTime.split(':')[1]) / 60,
              timeModel = this.props.timeModel;
        
        // get the normal time difference between local time and UCT
        const refWinterTime = new Date('2019-12-21')  // winter start => no DST
        const winterTimeDiff = refWinterTime.getTimezoneOffset() / 60;

        const refSummerTime = new Date('2019-06-21')  // summer start =>  DST
        const summerTimeDiff = refSummerTime.getTimezoneOffset() / 60;

        let dt = new Date(startDate),
            sunRiseSeries = [],
            wakeUpSeries = [],
            workStartSeries = [],
            workEndSeries = [],
            bedTimeSeries = [],
            sunSetSeries = [],
            duskSeries = [],
            dawnSeries = [];

        while (dt <= endDate) {
            let dawn,
                sunRise,
                sunSet,
                dusk,
                sunTimes = SunCalc.getTimes(dt, latidute, longitude);

            switch (timeModel) {
                case 'clockChange':
                    dawn = sunTimes.dawn.getHours() + sunTimes.dawn.getMinutes() / 60;
                    dusk = sunTimes.dusk.getHours() + sunTimes.dusk.getMinutes() / 60;
                    sunRise = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 60;
                    break;
                case 'alwaysSummerTime':
                    sunRise = sunTimes.sunrise.getUTCHours() - summerTimeDiff + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() - summerTimeDiff + sunTimes.sunset.getMinutes() / 60;
                    break;
                case 'alwaysWinterTime':
                    sunRise = sunTimes.sunrise.getUTCHours() - winterTimeDiff + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() - winterTimeDiff + sunTimes.sunset.getMinutes() / 60;
                    break;
            }
            dawnSeries.push({ t: new Date(dt), y: dawn });
            sunRiseSeries.push({ t: new Date(dt), y: sunRise});
            wakeUpSeries.push({ t: new Date(dt), y: wakeUpTime });
            workStartSeries.push({ t: new Date(dt), y: workStart });
            workEndSeries.push({ t: new Date(dt), y: workEnd });
            sunSetSeries.push({ t: new Date(dt), y: sunSet });
            duskSeries.push({ t: new Date(dt), y: dusk });
            bedTimeSeries.push({ t: new Date(dt), y: bedTime });

            dt.setDate(dt.getDate() + 1);
        }

        return {
            datasets: [
                {   label: "dawn",
                    data: dawnSeries,
                    borderColor: 'rgba(0, 241, 66, 1)'
                },
                {   label: "sunRise",
                    data: sunRiseSeries,
                    borderColor: 'rgba(244, 241, 66, 1)'
                },
                {   label: "wakeUp",
                    data: wakeUpSeries,
                    fill: false
                },
                {   label: "workStart",
                    data: workStartSeries,
                    fill: false
                },
                {
                    label: "workEnd",
                    data: workEndSeries,
                    fill: false
                },
                {   label: "sunSet",
                    data: sunSetSeries,
                    fill: 'end',
                    borderColor: 'rgba(244, 187, 65, 1)'
                },
                {   label: "dusk",
                    data: duskSeries,
                    fill: 'end',
                    borderColor: 'rgba(244, 187, 65, 1)'
                },
                {   label: "bedTime",
                    data: bedTimeSeries,
                    fill: false
                }
            ]
        }
    }
}

export default SunTimesChart;