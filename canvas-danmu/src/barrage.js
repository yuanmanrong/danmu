class Barrage {
    constructor(obj, ctx){
      this.value = obj.value
      this.time = obj.time
      this.obj = obj
      this.ctx = ctx
    }
    init() {
        this.color = this.obj.color || this.ctx.color
        this.speed = this.obj.speed || this.ctx.speed
        this.fontSize = this.obj.fontSize || this.ctx.fontSize

        // 求自己的宽度，来判断是否还需要再绘制
        let span = document.createElement("span")
        span.innerText = this.value
        span.style.font = this.fontSize + "px 'Microsoft YaHei'"
        span.style.position = "absolute"
        document.body.appendChild(span)
        this.width = span.clientWidth
        this.height = span.clientHeight
        document.body.removeChild(span)
        // 确定初始位置
        this.x = this.ctx.canvas.width
        this.y = this.ctx.canvas.height * Math.random()
        if(this.y < this.fontSize) {
            this.y = this.fontSize
        }       
    }

    render() {
        this.ctx.context.font = this.fontSize + "px 'Microsoft YaHei'"
        this.ctx.context.fillStyle = this.color
        this.ctx.context.fillText(this.value,this.x,this.y)
    }
}
class CanvasBarrage {
    constructor(canvas, video, options = {}){
        if(!canvas || !video) return
        this.canvas = canvas
        // canvas上下文
        this.context = canvas.getContext('2d')  
        this.video = video
        // canvas的宽高赋值
        this.canvas.width = video.clientWidth
        this.canvas.height = video.clientHeight - 80 
        let defaultOptions = {
            color: "#ffffff",
            speed: 2,
            fontSize: 20,
            data: []
        }
        Object.assign(this, defaultOptions, options) // 对象合并，将属性全部挂载到实例上
        this.isPaused = true // 是否暂停,默认暂停
        // 存放每条弹幕的内容
        this.barrages = this.data.map (obj => {
           return new Barrage(obj, this) // 初始化逐条弹幕
        })
        // 渲染画布
        this.render() 
    }

    render() {
        // 先清空
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        // 再渲染弹幕
        this.renderBarrage()
        if(this.isPaused === false) {
            requestAnimationFrame(this.render.bind(this))
        }
    }

    renderBarrage() {
        // 判断视频的时间和弹幕的时间，吻合才渲染
        this.barrages.forEach(ele => {
            if(!ele.flag && this.video.currentTime >= ele.time) {
                if(!ele.isInited) {
                    ele.init()
                    ele.isInited = true
                } 
                ele.x -= ele.speed
                ele.render()
                if(ele.x <= -ele.width) {
                    ele.flag = true
                }     
            }
        })
    }

    add(item) {
        this.barrages.push(new Barrage(item, this))
    }

    reset() {
        this.ctx.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.barrages.forEach(ele => {
            ele.flag = false // 还没有完成
            if (this.video.currentTime <= ele.time) {
               ele.isInited = false // 重新初始化一下  
            } else {
               ele.isInited = true
            }
        })
    }

}

export default CanvasBarrage;