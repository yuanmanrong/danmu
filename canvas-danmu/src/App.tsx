import React from 'react';
import ReactDom from 'react-dom'
import { Input, Switch } from 'antd';
import CanvasBarrage from "././barrage.js"

import './App.css'
import { stringify } from 'querystring';

const { Search } = Input;

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      speed: "2",
      color: "#ffffff",
      data: [{
        value: "11111",
        speed: 2,
        color: "white",
        time: 10, // 出现时间
      }, {
        value: "22222",
        speed: 2,
        color: "white",
        time: 2, // 出现时间
      },
      {
        value: "33333",
        speed: 2,
        color: "white",
        time: 5, // 出现时间
      }],
      canvasBarrage: null,
      socket: null
    }
  }

  componentDidMount() {
    let socket = new WebSocket("ws://localhost:3001")
    socket.onopen = function () {
      console.log('-----')
      socket.onmessage = function (e) {
        // 将收到的消息从字符串转换成对象
        let message = JSON.parse(e.data);
        console.log('message---', message)
      };
    }
    this.setState({
      socket
    })
    this.initCanvasBarrage()
  }

  initCanvasBarrage = () => {
    let canvas = document.getElementById("barrage")
    let video = document.getElementById("video")
    let { data = [] } = this.state
    let canvasBarrage = new CanvasBarrage(canvas, video, { data })

    this.setState({
      canvasBarrage
    })
  }

  handlePause = () => {
    let { canvasBarrage } = this.state
    canvasBarrage.isPaused = true
  }

  handlePlay = () => {
    let { canvasBarrage } = this.state
    canvasBarrage.isPaused = false
    canvasBarrage.render()
  }
  handleColorChange = (color) => {
    console.log('color---', color)
    this.setState({
      color: color.target.value
    })
  }
  handleSpeedChange = (speed) => {
    console.log('speed---', speed)
    this.setState({
      speed: speed.target.value
    })
  }
  handleSeeked = () => {

  }
  handleSend = (val: any) => {
    if (!val) return
    let { canvasBarrage, color, speed, socket } = this.state
    let video = document.getElementById("video")
    console.log('color, speed ', color, speed)
    let item = {
      value: val,
      time: video.currentTime,
      color,
      speed
    }
    console.log(socket, '00000------')
    socket.send(JSON.stringify(item))
    canvasBarrage.add(item)
  }

  render() {
    const { speed, color } = this.state

    return (
      <div className="app">
        <div className="barrage">
          <video
            id="video"
            className="barrage-video"
            width="800px"
            height="450px"
            src={new URL('./static/cheers.mov', import.meta.url).href}
            controls={true}
            loop={true}
            onPause={this.handlePause}
            onPlay={this.handlePlay}
            onSeeked={this.handleSeeked}
          >
            您的浏览器不支持 video 标签。
          </video>
          <canvas
            id="barrage"
            className="barrage-canvas"
            width="800px"
            height="400px"
          />
          <div className="barrage-send">
            <span>速度：</span><Input type="range" defaultValue={speed} className="range" max="6" min="2" onChange={this.handleSpeedChange} />
            <span>颜色：</span><Input type="color" defaultValue={color} className="color" onChange={this.handleColorChange} />
            <Switch defaultChecked />
            <Search
              placeholder="发个弹幕吧~"
              allowClear
              enterButton="发送弹幕"
              size="large"
              className="search"
              onSearch={this.handleSend}
            />
          </div>
        </div>
      </div>
    )
  }
}
