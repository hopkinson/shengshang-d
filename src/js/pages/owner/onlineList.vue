<!--
@Author: hopkinson
@Date:   2018-04-13T22:32:13+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-23T00:47:58+08:00
-->



<!-- 司机列表  -->
<style scoped>
.cs-dirver {
    flex: 1;
}

.cs-navbar__item--text {
    font-size: 26px;
}
</style>

<template>
<div class="cs-dirver">
    <c-mini-bar :title="Company.name">
        <am-image slot="right" @click.native="handleShowPop" :image-style="{width: '64px'}" auto-height src="bmlocal://assets/owner-menu.png"></am-image>
        <text class="cs-navbar__item--text" slot="left">{{setTitle}}</text>
    </c-mini-bar>
    <c-scroll-list :emptySet="Empty" emptyType="errorLocation" @refresh="handleRefresh" @loadmore="handleLoadMore" :data="Data.goodsList">
        <owner-list slot-scope="props" :data="props.row" @click="handleClick(props.row)"></owner-list>
    </c-scroll-list>
    <wxc-popover ref="wxc-popover" :buttons="Popover.btns" :position="Popover.position" :arrowPosition="Popover.arrow" @wxcPopoverButtonClicked="handlePopoverMenuClicked"></wxc-popover>
</div>
</template>

<script>
import {
    Company
} from 'Const'
import cache from 'Mixins/cache'
import {
    WxcPopover
} from 'weex-ui'
import {
    AmImage
} from 'weex-amui'
import OwnerList from './components/OwnerList'
import qs from 'qs'
export default {
    mixins: [cache],
    data: () => ({
        Data: {
            goodsList: []
        },
        Company: Company,
        Popover: {
            btns: [{
                text: '扫一扫',
                key: 'scan'
            }, {
                text: '我要拉货',
                key: 'pull'
            }],
            position: {
                x: -20,
                y: 130
            },
            arrow: {
                pos: 'top',
                x: -1
            }
        },
        Params: {
            areaCode: '',
            pageNo: 1,
            pageSize: 10
        },
        Popup: {
            menu: false,
            city: false
        },
        Empty: {
            errorLocation: {
                button: null,
                pic: 'bmlocal://assets/empty-driver.png',
                content: '抱歉，附近没有货主拉货'
            }
        },
        User: {},
    }),
    watch: {
        Params: {
            handler(val) {
                this.$notice.loading.show('加载订单中...')
                this.$fetch({
                    method: 'POST',
                    name: 'd/order/goodsList',
                    data: val
                }).then(data => {
                    this.Data.goodsList = val.pageNo === 1 ? data.goodsList : this.Data.goodsList.concat(data.goodsList)
                    this.$notice.loading.hide()
                })
            },
            deep: true
        }
    },
    computed: {
        setTitle() {
            return this.customGeo ? this.customGeo.areaName : ''
        }
    },
    methods: {
        // 点击订单 =>订单详情
        handleClick(item) {
            this.$router.open({
                name: 'order.detail',
                params: {
                    orderId: item.orderId
                }
            })
        },
        // 我要拉货
        goPull() {
            this.$router.open({
                name: 'product.pull'
            })
        },
        handleLoadMore() {
            this.Params.pageNo++
        },
        handleRefresh(e) {
            this.Params.pageNo = 1
            e.done()
        },
        // 扫一扫
        handleScan() {
            this.$tools.scan().then((text) => {
                this.$router.open({
                    name: 'order.detail',
                    params: Object.assign({}, JSON.parse(text), {
                        fromType: 'scan'
                    })
                })
            })
        },
        //点击 气泡菜单的菜单
        handlePopoverMenuClicked(obj) {
            let type = {
                scan: () => {
                    this.handleScan()
                },
                pull: () => {
                    this.goPull()
                }
            }
            return type[obj.key].call(this)
        },
        handleShowPop() {
            this.$refs['wxc-popover'].wxcPopoverShow()
        }
    },
    mounted() {
        // 用户信息
        this.Params = Object.assign({}, this.Params, {
            areaCode: this.customGeo.value
        })
    },
    components: {
        OwnerList,
        WxcPopover,
        AmImage
    }
}
</script>
