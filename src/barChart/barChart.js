import React, { Component } from "react";

const URL = 'https://api.jobtread.com/healthz';

class BarChart extends Component {
  constructor() {
    super()
    this.timesArray = [];
  }

  render() {
    this.fillArray();
    return <div>{this.timesArray.map(el => <div className='data' style={{width: el, backgroundColor: 'red', height: 50, marginBottom: 10}}></div>)}</div>
  }

  fillArray() {
    const time = this.getRequestTimeInMilliseconds()
    this.timesArray.push(time)
    if (this.timesArray.length === 11) {
      this.timesArray = this.timesArray.slice(1);
    }
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
