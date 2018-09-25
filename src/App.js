import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Input from './components/Input';
import SunTimesChart from './components/SunTimesChart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "2019-01-01",
      endDate: "2019-12-31",
      wakeUpTime: "07:00",
      workStart: "08:30",
      workEnd: "17:30",
      bedTime: "23:00",
      latitude: 0,
      longitude: 0,
      timeModel: "clockChange"
    };
    this.changeStateValue = this.changeStateValue.bind(this);
 }
 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: parseFloat(position.coords.latitude.toFixed(2)),
          longitude: parseFloat(position.coords.longitude.toFixed(2))
        });
      }
    )
  }

  changeStateValue(name, newValue) {
    this.setState({ [name]: newValue });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.timeModel}</h1>
        <Input 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          wakeUpTime={this.state.wakeUpTime}
          workStart={this.state.workStart}
          workEnd={this.state.workEnd}
          bedTime={this.state.bedTime}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          onChange={this.changeStateValue}
          timeModel={this.state.timeModel}/>

        <SunTimesChart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          wakeUpTime={this.state.wakeUpTime}
          workStart={this.state.workStart}
          workEnd={this.state.workEnd}
          bedTime={this.state.bedTime}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          timeModel={this.state.timeModel} />
      </div>
    );
  }
}

export default App;