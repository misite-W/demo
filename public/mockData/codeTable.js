import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mock/data' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const querySelectorListMapByTableName = (req)=>{
    let params = JSON.parse(req.body)
    let message = ""
    let tableName = params.tableName
    let result = {}
    if(params.tableName == "education"){
        let list = [{
            code:"111",
            caption: "博士"
        },{
            code:"112",
            caption: "硕士",
            disabled: true
        },{
            code:"113",
            caption: "本科"
        }]
        result = {education: list}
    }

    return {
        result:1,
        msg:message,
        info:result
    }
}

Mock.mock(`${domain}/querySelectorListMapByTableName`, /get|post/i, querySelectorListMapByTableName); // 定义请求链接，类型，还有返回数据
