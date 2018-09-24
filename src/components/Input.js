import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onChange(name, value);
    }

    render() {
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        const wakeUpTime = this.props.wakeUpTime;
        const workStart = this.props.workStart;
        const workEnd = this.props.workEnd;
        const bedTime = this.props.bedTime;
        const latitude = this.props.latitude;
        const longitude = this.props.longitude;
        const timeModel = this.props.timeModel;

        return (
            <form>
                <label>Start date:</label>
                <input id="startDate" name="startDate" type="date" value={startDate} onChange={this.handleChange} required />
                <label>End date:</label>
                <input id="endDate" name="endDate" type="date" value={endDate} onChange={this.handleChange} required />
                <label>Wakeup time:</label>
                <input id="wakeuptime" name="wakeUpTime" type="time"  value={wakeUpTime} onChange={this.handleChange} required />
                <label>Work start: </label>
                <input id="workstart" name= "workStart" type="time" value={workStart} onChange={this.handleChange} required />
                <label>Word end: </label>
                <input id="workend" name="workEnd" type="time" value={workEnd} onChange={this.handleChange}  required />
                <label>Bed time: </label>
                <input id="bedtime" type="time" name="bedTime" value={bedTime} onChange={this.handleChange} required />
                <label>Latitude: </label>
                <input id="latitude" type="number" step="0.05" name="latitude" value={latitude} onChange={this.handleChange} required />
                <label>Longitude: </label>
                <input id="longitude" type="number" step="0.05" name="longitude" value={longitude} onChange={this.handleChange} required />
                <label>Time model: </label>
                <input id="timeModel" type="number" step="0.05" name="longitude" value={longitude} onChange={this.handleChange} required />
                <label htmlFor="timeModel">Time model:</label>
                <select name="timeModel" id="timeModel" value={timeModel} onChange={this.handleChange}>
                    <option value="clockChange">Clock change</option>
                    <option value="alwaysSummerTime">Always summer time</option>
                    <option value="alwaysWinterTime">Always winter time</option>
                </select>  
            </form>
        )
    }
}
export default Input;