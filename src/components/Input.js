import React from 'react';
import SunTimesChart from './SunTimesChart';


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wakeUpTime: "07:00"
        };
       this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { this.setState({wakeUpTime: event.target.value}); }

    render() {
        return (
            <div>
            <form>
                <label>Wakeup time:</label>
                <input type="time" id="wakeUpTime" value={this.state.wakeUpTime} onChange={this.handleChange} required />
            </form>
            <SunTimesChart wakeUpTime={this.state.wakeUpTime}/>
            </div>
        )
    }
}
export default Input;