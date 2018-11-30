<!--
@Author: hopkinson
@Date:   2018-04-03T00:34:34+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-25T22:09:46+08:00
-->



<template>
<div></div>
</template>

<script>
// 这个vue的实例我们在app启动的时候就执行并常驻app内存，在app关闭时候销毁，所以data中的数据每次重启都会被初始化
// 而我们在app运行期间都可以任意改变data中的数据，然后推送给订阅者

// 如果想要持久化存储，可以配合storage来完成，每次启动app时候都从本地取数据，当data改变的时候异步的更新一下即可
// 住： 不能再app退出的时候来持久化存储，退出时间很短，无法保证存储成功

// 我们不建议在这里存储大量的数据 这里仅仅希望用作一个中介者 来提供给其他页面实例来通信 他无法替代storage 读取速度也远远慢与storage
var bmPush = weex.requireModule('bmPush')
import {
    getui
} from 'Const/key'
export default {
    data: () => ({
        timer: null
    }),
    methods: {
        // 设备在线 = > 长轮询
        loadOnline() {
            bmPush.getCid(resData => {
                this.$fetch({
                    method: 'POST',
                    name: 'device/online',
                    data: {
                        ...this.userGeo,
                        respType: 1,
                        gtcid: resData.data ? resData.data.cid : ''
                    }
                }).then(data => {
                    this.$event.emit('online-data', data)
                    this.timer = setTimeout(this.loadOnline, 2000)
                }, err => {})
            })
        }
    },
    computed: {
        userGeo() {
            return this.$storage.getSync('userGeo')
        },
        userToken() {
            return this.$storage.getSync('userToken')
        }
    },
    created() {
        bmPush.initPush(getui)
        this.$event.on('load-online', () => {
            if (this.userToken) {
                this.loadOnline()
            } else {
                clearTimeout(this.timer)
            }
        })
    }
}
</script>
