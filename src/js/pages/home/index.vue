<!--
@Author: hopkinson
@Date:   2018-04-06T11:14:37+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-25T20:58:22+08:00
-->



<template>
<div>
    <wxc-tab-bar :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" :duration="0" ref="tab" @wxcTabBarCurrentTabSelected="handleTabSelected" />
    <c-status-bar></c-status-bar>
    <div :style="contentStyle">
        <component :is="currentComp"></component>
    </div>
    <mask-ad :imgUrl="imgUrl" :show="showMask" @onLoad="onLoad" @jump="handleGoIndex"></mask-ad>
    <map-geo :show.sync="ShowGeo"></map-geo>
</div>
</template>

<script>
import {
    WxcTabBar,
    Utils
} from 'weex-ui'
import Config from './modules/config'
import PageOwner from 'Pages/owner/onlineList'
import PageOrder from 'Pages/order/record.vue'
import PageMess from 'Pages/chat/messages.vue'
import PageUser from 'Pages/user/detail.vue'
import MaskAd from './modules/MaskAdvan'
import MapGeo from 'Pages/map/geo'
import launch from 'Mixins/launch'
import cache from 'Mixins/cache'
import finishapp from 'Mixins/finishapp'
// 加载的组件
const components = ['PageOwner', 'PageMess', 'PageOrder', 'PageUser']
export default {
    components: {
        WxcTabBar,
        PageOwner,
        PageOrder,
        PageMess,
        MapGeo,
        MaskAd,
        PageUser
    },
    data: () => ({
        tabTitles: Config.tabTitles,
        tabStyles: Config.tabStyles,
        contentStyle: {},
        currentComp: '',
        showMask: false,
        ShowGeo: false,
        index: 0
    }),
    mixins: [launch, cache, finishapp],
    eros: {
        // app 前后台相关 start
        appActive() {
            this.showMask = true
        },
        // ！！！！！这里请不要去掉
        beforeBackAppear(params) {},
        beforeDisappear() {}
    },
    mounted() {
        this.$nextTick(() => {
            // 每个tab页内容区的高度
            const tabPageHeight = weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750
            this.contentStyle = {
                height: tabPageHeight - this.tabStyles.height - weex.config.eros.statusBarHeight
            }
        })
    },
    created() {
        if (!this.device) {
            this.loadDevice(() => {
                this.loadDict()
                this.loadIndex()
            })
        } else {
            this.loadDict()
            this.loadIndex()
        }
    },
    methods: {
        loadIndex() {
            this.login() // 隐式登录
            this.loadUserInfo(() => {
                this.ShowGeo = !this.userGeo
                this.currentComp = 'PageOwner'
                // 一直获取online信息
                this.$event.emit('load-online')
                // 获取“我的信息”的角标
                this.$event.on('online-data', data => {
                    this.tabTitles = this.tabTitles.map(item => {
                        return {
                            ...item,
                            badge: item.title === '消息' ?
                                data.myMsgNum : 0
                        }
                    })
                })
                // 选择首页tab
                this.$event.on('choose-home-tab', tabs => {
                    this.currentComp = tabs
                })
            })
        },
        handleGoIndex() {
            this.showMask = false
        },
        handleTabSelected(e) {
            this.index = e.page
            if (this.currentComp !== components[this.index]) {
                this.currentComp = ''
                setTimeout(() => {
                    this.currentComp = components[this.index]
                }, 250)
            }
            this.$event.emit('tab-page', e.page)
        }
    }
};
</script>
