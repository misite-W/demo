import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mock/data' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const handleLogins = (req)=>{
    let parems = JSON.parse(req.body)
    let message = "用户名或密码错误"
    let accessToken = Random.uuid()
    let Authorization = Random.cparagraph()
    let state = 0
    if(parems.userName && parems.userName=="test"){
        message = "登录成功"
    }else{
        state = 1
    }
    if(parems.userPwd && parems.userPwd=="111111"){
        message = "登录成功"
    }else{
        state = 2
    }

    return {
        code,
        msg:message,
        info:{state,accessToken,Authorization}
    }
}

Mock.mock(`${domain}/handleLogins`, /get|post/i, handleLogins); // 定义请求链接，类型，还有返回数据
