const MAX_DM_COUNT = 6;
const CHANNEL_COUNT = 10;

class Barrage {
    constructor({
            wrapper,
            sameSpeed = false,
            speedTime = '7s',
            speed = 100
        }) {
        // 用于缓存60个dom的dom池
        this.domPool = []
        // 所有的弹幕obj的弹幕池
        this.danmuPool = []
        // 存储通道是否可用
        this.hasPosition = []
        // 初始化外层容器的信息
        this.wrapper = wrapper
        this.wrapperWidth = ''
        this.wrapperHeight = ''
        this.itemHeight = 0
        this.initWrapper()
        // 初始化dom池和初始化通道情况
        this.initBarragesPool()
        this.timer = null
        this.sameSpeed = sameSpeed
        this.speedTime = speedTime
        this.speed = speed
    }
    // setInterval查找有没有新的数据
    intervalInsert() {
        this.timer = setInterval(() => {
            let channel = this.getChannel()
            if (this.danmuPool.length && channel !== -1) {
                let dom = this.domPool[channel].shift()
                let danmu = this.danmuPool.shift()
                this.shoot(dom, danmu, channel)
            }
        }, 1)
    }
    // 初始化外层容器wrapper
    initWrapper() {
        // if (this.wrapper.style.position == '' || this.wrapper.style.position == 'static') {
        //     this.wrapper.style.position = 'relative'
        // }
        this.wrapper.style.overflow = 'hidden'
        const rectObj = this.wrapper.getBoundingClientRect()
        this.wrapperWidth = rectObj.width
        this.wrapperHeight = rectObj.height
        this.itemHeight = this.wrapperHeight/(CHANNEL_COUNT+1.0)
        // 初始化之后就可以查有没有弹幕了
        this.intervalInsert()
    }
    // 初始化弹幕dom
    initDom(i) {
        let dom = document.createElement('div')
        dom.style.cssText = `
            position: absolute;
            top: ${i*this.itemHeight+10}px;
            visibility: hidden;
            white-space: nowrap;
            transform: translateX(${this.wrapperWidth}px);
            color: #fff;
        `
        return dom
    }
    // 初始化弹幕dom池
    initBarragesPool() {
        // 先缓存60个dom结点，不断复用，提高性能，动画完又设到右上角
        for (let i = 0; i < CHANNEL_COUNT; i++) {
            let doms = []
            for (let j = 0; j < MAX_DM_COUNT; j++) {
                // 创建dom元素并放到右边
                let dom = this.initDom(i)
                this.wrapper.appendChild(dom)
                doms.push(dom)
                dom.addEventListener('transitionend', () => {
                    dom.style.cssText = `
            position: absolute;
            top: ${i*this.itemHeight+10}px;
            visibility: hidden;
            white-space: nowrap;
            transform: translateX(${this.wrapperWidth}px);
            color: #fff;
          `
                })
            }
            this.domPool[i] = doms
            // 初始化通道
            this.hasPosition[i] = true
        }
    }
    // 看有没有可以用的通道
    getChannel() {
        for (let i = 0; i < CHANNEL_COUNT; i++) {
            if (this.hasPosition[i] && this.domPool[i].length) {
                return i
            }
        }
        return -1
    }
    // 输入弹幕数组
    insertBarrages(arr) {
        if (arr && arr.length > 0) {
            this.danmuPool = this.danmuPool.concat(arr)
        }
    }
    // 发送单个弹幕
    shoot(dom, barrage, channel) {
        dom.innerText = barrage.text
        let domRect = dom.getBoundingClientRect()
        let speed = this.sameSpeed
            ? `${Math.ceil((Number(this.wrapperWidth) + Number(domRect.width)) / this.speed)}s`
            : this.speedTime
        dom.style.cssText = `
      top: ${channel*this.itemHeight}px;
      position: absolute;
      white-space: nowrap;
      user-select: none;
      transition: transform ${speed} linear;
      color: #fff;
    `
        dom.style.transform = `translateX(${-domRect.width}px)`
        this.hasPosition[channel] = false
        // 弹幕全部显示之后 才能开始下一条弹幕
        // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
        let time = domRect.width < 50 ? domRect.width * 70 : domRect.width * 15
        setTimeout(() => {
            this.hasPosition[channel] = true
        }, time)
    }
    // 清除定时器
    clearTimer() {
        clearInterval(this.timer)
        this.timer = null
    }
}

export default Barrage