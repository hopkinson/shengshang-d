/**
 * @Author: hopkinson
 * @Date:   2018-04-03T00:34:34+08:00
 * @Last modified by:   hopkinson
 * @Last modified time: 2018-11-23T09:16:26+08:00
 */



import Widget from 'eros-widget'
import apis from './apis'
import routes from './routes'
import './push'
import Custom from 'Components'
import {
    Utils
} from 'weex-ui'
import * as filters from 'Utils/filters.js'
var modal = weex.requireModule('bmModal')
Vue.use(Custom)
/**
 * 过滤器 filters
 */
let errStatus = {
    201: () => {
        Vue.prototype.$router.setHomePage('/pages/login/login.js')
    },
    104: () => {
        Vue.prototype.$router.open({
            name: 'other.guide'
        })
    }
}
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
new Widget({
    router: {
        /**
         * 路由配置表
         */
        routes
    },
    ajax: {
        // http://api.51xunfei.com:8080/ssapp/api/
        // http://hy.zhhlzzs.com/mock/api/
        baseUrl: 'http://api.51xunfei.com:8080/ssapp/api/',
        /**
         * 接口别名
         */
        apis,

        // 接口超时时间
        timeout: 30000,
        /**
         * 请求发送统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * next
         */
        requestHandler(request, next) {
            let commonData = {
                timestamp: Date.now(),
                seed: Number(Math.random().toString().slice(2, 12))
            }
            var device = Vue.prototype.$storage.getSync('device') || {}
            var userInfo = Vue.prototype.$storage.getSync('userToken') || {}
            /**
             *  ============
             *  设  备  信  息
             *  ============
             */
            if (device) {
                commonData = Object.assign(commonData, {
                    appId: device.appid || '',
                    clientId: device.clientId || '',
                    version: device.version || '',
                    dictVersion: device.dictVersion || '',
                    secretKey: device.secretKey || ''
                })
            }
            /**
             *  ============
             *  用  户  信  息
             *  ============
             */
            if (userInfo) {
                commonData = Object.assign(commonData, {
                    userId: userInfo.userId || '',
                    token: userInfo.token || ''
                })
            }
            /**
             *  ============
             *  忽略的参数配置
             *  ============
             */
            // 3.1忽略指定公公参数
            if (Array.isArray(request.ignore)) {
                for (let i = 0; i < request.ignore.length; i++) {
                    delete commonData[request.ignore[i]]
                }
            }
            // // 3.2忽略所有公公参数
            if (request.ignore === 'all') {
                commonData = {}
            }
            /**
             *  ============
             *  requset.data
             *  ============
             */
            request.data = Object.assign({}, commonData, request.data)
            // header设置 - content-type: form
            request.header = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            next()
        },
        /**
         * 请求返回统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * resData 服务器端返回的所有数据
         * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
         * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
         */
        responseHandler(options, resData, resolve, reject) {
            const {
                status,
                errorMsg,
                data
            } = resData
            modal.hideLoading()
            if (status === 200) {
                if (data.code !== '0') {
                    if (errStatus[data.code]) {
                        errStatus[data.code].call(null)
                    } else {
                        modal.toast({
                            message: data.msg
                        })
                    }
                    reject(resData)
                } else {
                    resolve(data.data)
                }
            } else {
                // Vue.prototype.$router.open({
                //     name: 'other.errNetWork'
                // })
                modal.toast({
                    message: '网络不稳定...' // 展示内容
                })
            }
        }
    }
})
