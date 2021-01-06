import React, { Component } from "react";

const URL = 'https://api.jobtread.com/healthz';

class BarChart extends Component {
  constructor() {
    super()
    this.timesArray = [];
    this.state = {
      timesArray: []
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fillArray(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className='container'>
      <table>
        {this.state.timesArray.map(el => <tr><td>{el + 'ms'}</td><td className='data'><div style={{width: el/10 + '%', backgroundColor: 'red', height: 50, marginBottom: 10}}></div></td>
        </tr>)}
        </table>
      </div>
  }

  fillArray() {
    const time = this.getRequestTimeInMilliseconds();
    this.timesArray.push(time)
    if (this.timesArray.length === 11) {
      this.timesArray = this.timesArray.slice(1);
    }
    this.setState({
      timesArray: this.timesArray
    });
  }

  getRequestTimeInMilliseconds() {
    const startTime = Date.now();
    let endTime = 0;
    const request = this.sendRequest();
    if (request.status === 200) {
      endTime = Date.now();
    }
    return endTime - startTime;
  }

  sendRequest() {
    const request = new XMLHttpRequest();
    request.open('GET', URL, false);
    request.send();
    return request;
  }
}


export default BarChart;
