import React from 'react';
import ReactDom from 'react-dom'
import { Input, Switch } from 'antd';


import './barrage.css'
import { constants } from 'buffer';


const { Search } = Input;

export default class BiliBarrage extends React.Component<any, any> {
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
            biliBullet: null,
            renderData: [],
            left: 800,
            socket: null,
            isPaused: true
        }
    }

    componentDidMount() {
        this.initBarrage()

    }

    initBarrage = () => {
        let video = document.getElementById("video")
        let box = document.getElementById("barrage-box")
        this.setState({
            video,
            box
        })
        let { data = [] } = this.state
        let biliBullet;
        let that = this

        let socket = new WebSocket("ws://localhost:3001")
        socket.onopen = function () {
            console.log('onopen-----')
            socket.onmessage = function (e) {
                // 将收到的消息从字符串转换成对象
                let message = JSON.parse(e.data);
                console.log('message---', message)
                if (message.type === "INIT") {

                    that.setState({
                        data: message.data
                    }, () => {
                        let { data = [] } = that.state
                        that.setRoad(data)
                        console.log('11111111111')
                    })
                }


            };
        }
        this.setState({
            socket
        })
    }

    setRoad = (data) => {
        const { isPaused } = this.state
        if (isPaused) return
        let { video, left } = this.state;
        let time = video.currentTime
        let renderData: any = []

        data.forEach((item) => {
            if (item.time <= time) {
                if (item.left === undefined) {
                    item.left = 800
                } else {
                    item.left = item.left - 2
                }
                item.style = {
                    color: "white",
                    fontSize: "23px",
                    fontWeight: 600,
                    top: Math.random() * 400 + "px",
                    left: item.left + "px",
                    transform: `translate3d(${item.left}px,0,0)`,
                    transition: `transform 0s linear 0s`
                }
                renderData.push(item)
            }
        })

        this.setState({
            renderData
        }, () => {
            requestAnimationFrame(this.setRoad.bind(this, data))
        })

    }

    renderItem = () => {
        const { renderData } = this.state


    }

    handlePause = () => {
        this.setState({
            isPaused: true
        })

    }

    handlePlay = () => {
        this.setState({
            isPaused: false
        }, () => {
            const { data } = this.state
            this.setRoad(data)
        })

    }
    handleSwitch = (checked) => {

    }
    handleColorChange = (color) => {

    }
    handleSpeedChange = (speed) => {

    }
    handleSeeked = () => {

    }
    handleSend = (val: any) => {
        if (!val) return

    }

    render() {
        const { renderData, speed, color } = this.state

        return (
            <div className="app">
                <div className="barrage">
                    <video
                        id="video"
                        className="barrage-video"
                        width="800px"
                        height="450px"
                        src={new URL('../static/cheers.mov', import.meta.url).href}
                        controls={true}
                        loop={true}
                        onPause={this.handlePause}
                        onPlay={this.handlePlay}
                        onSeeked={this.handleSeeked}
                    >
                        您的浏览器不支持 video 标签。
                    </video>
                    <div id="barrage-box" className="barrage-box">
                        {renderData.map((item, index) => {
                            return (
                                <div className="danmu-item" key={index + Math.random()} style={item.style}>{item.value}</div>
                            )
                        })
                        }
                    </div>
                    <div className="barrage-send">
                        <span>速度：</span><Input type="range" defaultValue={speed} className="range" max="6" min="2" onChange={this.handleSpeedChange} />
                        <span>颜色：</span><Input type="color" defaultValue={color} className="color" onChange={this.handleColorChange} />
                        <Switch defaultChecked onChange={this.handleSwitch} />
                        <Search
                            placeholder="发个bilibili弹幕吧~"
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
