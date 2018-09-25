import React from 'react';
import { Line } from 'react-chartjs-2';
import SunCalc from 'suncalc';
import { defaults } from 'react-chartjs-2';



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
        defaults.global.elements.point.radius = 0
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
            nightEndSeries = [],
            nauticalDawnSeries = [],
            dawnSeries = [],
            sunRiseSeries = [],
            wakeUpSeries = [],
            workStartSeries = [],
            workEndSeries = [],
            bedTimeSeries = [],
            sunSetSeries = [],
            duskSeries = [],
            nauticalDuskSeries = [],
            nightSeries = [];


        while (dt <= endDate) {
            let nightEnd,
                nauticalDawn,
                dawn,
                sunRise,
                sunSet,
                dusk,
                nauticalDusk,
                night,
                sunTimes = SunCalc.getTimes(dt, latidute, longitude);

            switch (timeModel) {
                case 'clockChange':
                    nightEnd = sunTimes.nightEnd.getHours() + sunTimes.nightEnd.getMinutes() / 60;
                    nauticalDawn = sunTimes.nauticalDawn.getHours() + sunTimes.nauticalDawn.getMinutes() / 60;
                    dawn = sunTimes.dawn.getHours() + sunTimes.dawn.getMinutes() / 60;
                    sunRise = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 60;
                    dusk = sunTimes.dusk.getHours() + sunTimes.dusk.getMinutes() / 60;
                    nauticalDusk = sunTimes.nauticalDusk.getHours() + sunTimes.nauticalDusk.getMinutes() / 60;
                    night = sunTimes.night.getHours() + sunTimes.night.getMinutes() / 60;
                    break;
                case 'alwaysSummerTime':
                    nightEnd = sunTimes.nightEnd.getUTCHours() - summerTimeDiff + sunTimes.nightEnd.getMinutes() / 60;
                    nauticalDawn = sunTimes.nauticalDawn.getUTCHours() - summerTimeDiff + sunTimes.nauticalDawn.getMinutes() / 60;
                    dawn = sunTimes.dawn.getUTCHours() - summerTimeDiff + sunTimes.dawn.getMinutes() / 60;
                    sunRise = sunTimes.sunrise.getUTCHours() - summerTimeDiff + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() - summerTimeDiff + sunTimes.sunset.getMinutes() / 60;
                    dusk = sunTimes.dusk.getUTCHours() - summerTimeDiff + sunTimes.dusk.getMinutes() / 60;
                    nauticalDusk = sunTimes.nauticalDusk.getUTCHours() - summerTimeDiff + sunTimes.nauticalDusk.getMinutes() / 60;
                    night = sunTimes.night.getUTCHours() - summerTimeDiff + sunTimes.night.getMinutes() / 60;
                    break;
                case 'alwaysWinterTime':
                    nightEnd = sunTimes.nightEnd.getUTCHours() - winterTimeDiff + sunTimes.nightEnd.getMinutes() / 60;
                    nauticalDawn = sunTimes.nauticalDawn.getUTCHours() - winterTimeDiff + sunTimes.nauticalDawn.getMinutes() / 60;
                    dawn = sunTimes.dawn.getUTCHours() - winterTimeDiff + sunTimes.dawn.getMinutes() / 60;
                    sunRise = sunTimes.sunrise.getUTCHours() - winterTimeDiff + sunTimes.sunrise.getMinutes() / 60;
                    sunSet = sunTimes.sunset.getUTCHours() - winterTimeDiff + sunTimes.sunset.getMinutes() / 60;
                    dusk = sunTimes.dusk.getUTCHours() - winterTimeDiff + sunTimes.dusk.getMinutes() / 60;
                    nauticalDusk = sunTimes.nauticalDusk.getUTCHours() - winterTimeDiff + sunTimes.nauticalDusk.getMinutes() / 60;
                    night = sunTimes.night.getUTCHours() - winterTimeDiff + sunTimes.night.getMinutes() / 60;
                    break;
            }
            nightEndSeries.push({ t: new Date(dt), y: nightEnd });
            nauticalDawnSeries.push({ t: new Date(dt), y: nauticalDawn });
            dawnSeries.push({ t: new Date(dt), y: dawn });
            sunRiseSeries.push({ t: new Date(dt), y: sunRise});
            wakeUpSeries.push({ t: new Date(dt), y: wakeUpTime });
            workStartSeries.push({ t: new Date(dt), y: workStart });
            workEndSeries.push({ t: new Date(dt), y: workEnd });
            sunSetSeries.push({ t: new Date(dt), y: sunSet });
            duskSeries.push({ t: new Date(dt), y: dusk });
            nauticalDuskSeries.push({ t: new Date(dt), y: nauticalDusk });
            bedTimeSeries.push({ t: new Date(dt), y: bedTime });
            nightSeries.push({ t: new Date(dt), y: night });
            dt.setDate(dt.getDate() + 1);
        }

        return {
            datasets: [
                // lines to be replaces with https://github.com/chartjs/chartjs-plugin-annotation
                {   label: "wakeUp",
                    data: wakeUpSeries,
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,1)",
                    backgroundColor: "rgba(0,0,0,1)",
                    fill: false
                },
                {   label: "workStart",
                    data: workStartSeries,
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,1)",
                    backgroundColor: "rgba(0,0,0,1)",
                    fill: false
                },
                {   label: "workEnd",
                    data: workEndSeries,
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,1)",
                    backgroundColor: "rgba(0,0,0,1)",
                    fill: false
                },
                {   label: "bedTime",
                    data: bedTimeSeries,
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,1)",
                    backgroundColor: "rgba(0,0,0,1)",
                    fill: false
                },
                {   label: "nightEnd",
                    data: nightEndSeries,
                    borderWidth: 0,
                    fill: 'start',
                    backgroundColor: "rgba(48, 69, 77, 0.8)"
                },
                {   label: "auticalDawn",
                    data: nauticalDawnSeries,
                    borderWidth: 0,
                    fill: "-1",
                    backgroundColor: "rgba(89, 106, 112, 0.8)"
                },
                {   label: "dawn",
                    data: dawnSeries,
                    borderWidth: 0,
                    fill: "-1",
                    backgroundColor: "rgba(112, 143, 153, 0.8)"
                },
                {   label: "sunRise",
                    data: sunRiseSeries,
                    borderColor: 'rgb(223, 208, 86)',
                    fill: "-1",
                    backgroundColor: 'rgba(151, 187, 200,0.8)'
                },
                {   label: "sunSet",
                    data: sunSetSeries,
                    fill: "-1",
                    borderColor: 'rgba(247, 183, 99, 1)',
                    backgroundColor: "rgba(177, 218, 231, 0.8)"
                },
                {   label: "dusk",
                    data: duskSeries,
                    fill: "-1",
                    backgroundColor: 'rgba(151, 187, 200,0.8)'
                },
                {   label: "nauticalDusk",
                    data: nauticalDuskSeries,
                    fill: "-1",
                    backgroundColor: "rgba(112, 143, 153, 0.8)"
                },
                {
                    label: "night",
                    data: nightSeries,
                    fill: false,
                    backgroundColor: "rgba(89, 106, 112, 0.8)"
                }
            ]
        }
    }
}

export default SunTimesChart;