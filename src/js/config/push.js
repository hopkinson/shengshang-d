/**
 * @Author: hopkinson
 * @Date:   2018-04-03T00:34:34+08:00
 * @Last modified by:   hopkinson
 * @Last modified time: 2018-11-26T00:33:08+08:00
 */
const globalEvent = weex.requireModule('globalEvent')
var notification = weex.requireModule('notification')
import {
    loadUserInfo,
    go
} from 'Mixins/notification'
let TYPE = {
    // (1)用户注册后后台审核通过时会发送通知，发送的通知会显示在手机通知栏
    userinfo: item => {
        loadUserInfo(() => {
            go('user.info')
        })
    },
    // (2)在货主下单后，后台向同城所有司机发送通知，发送的通知会显示在手机通知栏
    // (4)在货主支付成功时，后台会向车主发送通知，发送的通知会显示在手机通知栏
    orderdetail: item => {
        go('order.detail', item)
    }
}
/**
 * 消息推送
 * options 客户端个推推送的所有消息
 */
globalEvent.addEventListener('pushMessage', options => {
    let alert = JSON.parse(options.aps.alert)
    notification.show({
        duration: '3000',
        avatar: alert.pushicon,
        title: alert.title,
        content: alert.content,
        time: alert.pushtime
    }, str => {
        TYPE[alert.page](alert)
    })
})
