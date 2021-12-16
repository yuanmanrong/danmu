let danmuBox = document.getElementById("danmu-box");  // 获取弹幕区域
let boxWidth = danmuBox.offsetWidth; // 弹幕区域宽
let boxHeight = danmuBox.offsetHeight; // 弹幕区域高
let barrageList = ["我是使用定时器的弹幕1~~~~~~~~","我是使用定时器的弹幕2~~~~~~~~","我是使用定时器的弹幕3~~~~~~~~","我是使用定时器的弹幕4~~~~~~~~",]; // 所有弹幕内容
let danmuItem = document.getElementById("danmu-item");
let left = 0

// html+css+js弹幕方式
initBarrage();
setInterval(moveLeft,200);


// 发送弹幕
function send() {
    let iptVal = document.getElementById("danu-ipt");  // 获取发送的弹幕值
    initDanmu(iptVal.value)
    iptVal.value = "";
}

// 初始弹幕
function initBarrage() {
 if(barrageList.length > 0) {
    barrageList.forEach(item => {
        initDanmu(item)
    })
   }
// danmuItem.style.transform = `translateX(${left}px)`
// left = left - 10
// console.log( danmuItem.style.transform,'-----')
}

// 初始化弹幕的属性----left
function initDanmu(value) {
    let span = document.createElement('span');
    span.innerText = value;
   // span.className = "danmu-item"
   danmuBox.appendChild(span);
    span.style.width = "fit-content";
    let spanWidth = span.clientWidth;
    let spanHeight = span.clientHeight;
    span.style.position = "absolute";
    span.style.left = boxWidth + 'px' // 弹幕的初始位置
    span.style.top = Math.random() * (boxHeight - spanHeight) + 'px'; // 随机的高度
    span.speed = Math.random() * 20 + 5; // 5-10的随机速度范围
}
// 使用改变left的方式移动
function moveLeft() {
   spanList = danmuBox.children;
   if (spanList.length > 0) {
       Array.from(spanList).forEach((ele,index) => {
           // 移动到可视区域外
           if(parseInt(ele.style.left) - ele.speed < -ele.offsetWidth) {
            ele.style.display = "none";
           } else {
            ele.style.left = parseInt(ele.style.left) - ele.speed + 'px';
           }
       })
   }
}