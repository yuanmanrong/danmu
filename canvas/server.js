const WebSocket = require("ws")
const redis = require("redis")

//process.setMaxListeners(0)

let wsPool = []

let client = redis.createClient(6379, "127.0.0.1",{}) // key value类型

//错误监听？
client.on("error", function (err) {
    console.log("Error " + err);
});

let wss = new WebSocket.Server({
    port:3001
})

// 客户端连接的请求
wss.on("connection",function(ws){
    console.log('connection------')
    wsPool.push(ws)
    client.lrange("barrages", 0, -1, function(err,applies) {
        applies = applies.map(item => JSON.parse(item))
        ws.send(
            JSON.stringify({
                type: "INIT",
                data: applies
            })
        );
    })
    ws.on("message",function(data){
        console.log('message----')
        client.rpush("barrages", data, redis.print)
        wsPool.forEach((item) => {
            item.send(
                JSON.stringify({
                    type: "ADD",
                    data: JSON.parse(data)
                })
            );
        })

    })
})