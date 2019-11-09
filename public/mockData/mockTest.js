import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData=[]
const postData = function(req) {
    // 随机生成文章数据
    // let posts = [] // 用于存放文章数据的数组
    for (let i = 0; i < 10; i++) {
        let post = {
            id: i,
            name: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            deptName: Random.csentence(10, 25),
            keys: Random.cname(), // 随机生成名字
            time: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{list:listData}
    }
}
Mock.mock(`${domain}/posts`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

//删除数据
const list = function (options) {
    let rtype = options.type.toLowerCase(); //获取请求类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let id = parseInt(JSON.parse(options.body).id) //获取删除的id
            listData = listData.filter(function(val){
                return val.id!=id;//把这个id对应的对象从数组里删除
            });
            break;
        default:
    }
    return {
        code,
        info:{list:listData}
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/deletes`,/get|post/i, list);//删除数据

