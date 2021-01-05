import React, { Component } from "react";

const URL = 'https://api.jobtread.com/healthz';

class BarChart extends Component {
  constructor() {
    super()
    this.timesArray = [];
  }

  render() {
    this.fillArray();
    const sortedArray = [...this.timesArray];
    sortedArray.sort((a, b) => a - b);
    return <div className='container'>
        <div className='meter' style={{width: sortedArray[sortedArray.length - 1]/10 + '%'}}>
          <div>0</div>
          <div style={{marginLeft: '25%'}}>{sortedArray[2]}</div>
          <div style={{marginLeft: '50%'}}>{sortedArray[4]}</div>
          <div style={{marginLeft: '75%'}}>{sortedArray[7]}</div>
          <div style={{marginLeft: '100%'}}>{sortedArray[9]}</div>
        </div>
        {this.timesArray.map(el => <div className='data' style={{width: el/10 + '%', backgroundColor: 'red', height: 50, marginBottom: 10}}></div>)}
      </div>
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
