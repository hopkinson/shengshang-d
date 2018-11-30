/**
 * @Author: hopkinson
 * @Date:   2018-06-21T04:01:14+08:00
 * @Last modified by:   hopkinson
 * @Last modified time: 2018-11-03T23:32:04+08:00
 */
module.exports = {
    'appName': 'shengshang-d',
    'appBoard': '/config/index.js',
    // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
    'androidIsListenHomeBack': 'true',
    'version': {
        'android': '1.0.0',
        'iOS': '1.0.0'
    },
    'page': {
        'homePage': '/pages/home/index.js',
        'mediatorPage': '/mediator/index.js',
        'navBarColor': '#ffd000',
        'navItemColor': '#333333'
    },
    'url': {
        'image': 'http://up-z2.qiniup.com',
        'bundleUpdate': 'http://localhosts:3001/app/check'
    },
    'zipFolder': {
        'iOS': '/ios/WeexEros/WeexEros',
        'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
    },
    'getui': {
        'enabled': 'true',
        'appId': 'ky1IcqDrBi9N9jabyl6Im9',
        'appKey': 'VmLzog2CZrA7GLrQ0jTIW1',
        'appSecret': '0z6lB5CMCIACroXMWTQpM2'
    },
    'tabBar': {
        'color': '#333333',
        'selectedColor': '#ffd000',
        'backgroundColor': '#fafafa',
        'borderColor': '#dfe1eb',
        'list': [
            {
                'pagePath': '/pages/home/index.js',
                'text': '首页',
                'icon': 'bmlocal://assets/home@2x.png',
                'selectedIcon': 'bmlocal://assets/home_ed@2x.png',
                'navShow': 'true',
                'navTitle': "首页"
            }, {
                'pagePath': '/pages/chat/chat.js',
                'text': '消息',
                'icon': 'bmlocal://assets/chat@2x.png',
                'selectedIcon': 'bmlocal://assets/chat_ed@2x.png',
                'navShow': 'true',
                'navTitle': '消息'
            }, {
                'pagePath': '/pages/order/record.js',
                'text': '订单',
                'icon': 'bmlocal://assets/order@2x.png',
                'selectedIcon': 'bmlocal://assets/order_ed@2x.png',
                'navShow': 'true',
                'navTitle': '订单'
            }, {
                'pagePath': '/pages/user/detail.js',
                'text': '我的',
                'icon': 'bmlocal://assets/user@2x.png',
                'selectedIcon': 'bmlocal://assets/user_ed@2x.png',
                'navShow': 'true',
                'navTitle': '我的'
            }
        ]
    }
}
