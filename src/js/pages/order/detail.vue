<!--
@Author: hopkinson
@Date:   2018-04-06T11:11:28+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-25T01:12:54+08:00
-->



<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-detail {
    margin-top: 30px;
    margin-bottom: 30px;
}

.cs-detail__product--num {
    color: red;
}

.cs-detail__code--item {
    color: #666;
    font-size: 26px;
    padding: 10px;
}

.cs-detail__product--status {
    font-size: 30px;
}

.cs-detail__code--btn {
    position: absolute;
    right: 0;
    top: 0;
}

.cs-detail__rater {
    align-items: center;
}

.cs-detail__rater--text {
    margin-top: 30px;
    margin-bottom: 40px;
    color: #666;
    font-size: 26px;
}

.cs-detail--icon {
    margin-left: 30px;
    margin-right: 30px;
}

.cs-quote--input {
    font-size: 50px;
    font-weight: 700;
    color: orange;
    padding-left: 0;
}
</style>

<template>
<scroller>
    <div v-if="show">
        <!-- 司机信息 -->
        <block-list :data="owner" hideRight :hasArrow="false" v-if="!statusCancel">
            <div slot="value" class="row">
                <c-icon value="&#xe725;" v-if="!noPay" @click="handleTel" class="cs-detail--icon" />
                <c-icon value="&#xe69b;" @click="handleSendMess" class="cs-detail--icon" />
            </div>
            <!-- <text slot="desc">{{driver.plateNum}}</text> -->
        </block-list>
        <!-- 地方信息 -->
        <place-info class="cs-detail" readOnly :data="Data.detail" />
        <!-- 订单-->
        <wxc-cell label="订单状态">
            <text slot="title" class="cs-detail__product--status">{{Const.Orderstatus[Data.detail.status]}}</text>
        </wxc-cell>
        <wxc-cell label="订单金额" has-margin>
            <text slot="title" class="cs-detail__product--num">{{Data.detail.fee | filterMoney}}</text>
        </wxc-cell>
        <!-- 货品信息 -->
        <wxc-cell label="货品信息" has-margin has-arrow @wxcCellClicked="go('product.detail')">
            <div slot="title">
                <text>{{Data.detail.goodsType | filterDict(dict.goodsType)}}</text>
                <text>{{Data.detail.goodsWeight | filterDict(dict.goodsWeight)}}</text>
            </div>
        </wxc-cell>
        <wxc-cell label="订单车型" :title="Data.detail.carType | filterDict(dict.carType)"></wxc-cell>
        <wxc-cell label="是否本人" has-top-border :title="Data.detail.contactsSelf | filterDict(Const.YesNo)">
            <text v-if="isNotMyself">{{Data.detail.contactsUserName}}{{Data.detail.contactsMobile}}</text>
        </wxc-cell>
        <wxc-cell label="是否跟车" :title="Data.detail.follow | filterDict(Const.YesNo)">
            <text v-if="isFollow">{{Data.detail.followNum | filterFollow}}</text>
        </wxc-cell>
        <wxc-cell label="其他要求" has-margin>
            <text slot="title">{{Data.detail.memo}}</text>
        </wxc-cell>
        <wxc-cell>
            <div slot="label">
                <text class="cs-detail__code--item ">订单号：{{Data.detail.orderCode}}</text>
                <text class="cs-detail__code--item ">创建时间：{{Data.detail.createTime | filterTime}}</text>
                <text class="cs-detail__code--item" v-if="Data.detail.payTime">支付时间：{{Data.detail.payTime | filterTime}}</text>
            </div>
            <wxc-button slot="value" size="small" type="white" text="复制订单号" @wxcButtonClicked="handleCopyCode"></wxc-button>
        </wxc-cell>
        <!-- ========== -->
        <!-- 各 种 操 作 -->
        <!-- ========== -->
        <!-- 报价 -->
        <div class="cs-detail" v-if="statusWaiting">
            <wxc-cell label="我的报价" :has-bottom-border="false">
                <text>元</text>
                <input slot="title" type="number" class="input cs-quote--input" v-model="Form.fee">
            </wxc-cell>
            <div class="footer-center">
                <wxc-button class="cs-detail" text="提交报价" type="yellow" @wxcButtonClicked="handleQuote"></wxc-button>
            </div>
        </div>
        <!-- 已完成 - 未评分（进行评分） -->
        <div class="cs-detail__rater cs-detail" v-if="statusTransport">
            <rater @change="handleRater" :score="0"></rater>
            <text class="cs-detail__rater--text">请对货主进行评分</text>
            <wxc-button text="运输完成" type="yellow" @wxcButtonClicked="handleChangeScore"></wxc-button>
        </div>
        <!-- 已完成 - 已评分（进行评分） -->
        <div class="cs-detail" v-if="visitRater">
            <wxc-cell label="司机评分">
                <rater slot="title" :canChange="false" :score="Data.detail.driverScore"></rater>
            </wxc-cell>
            <wxc-cell label="用户评分">
                <rater slot="title" :canChange="false" :score="Data.detail.userScore"></rater>
            </wxc-cell>
        </div>
        <!-- 待支付 - 支付 -->
        <div class="cs-detail__rater cs-detail">
            <wxc-button v-if="statusTakeGoods" text="扫码接货" type="yellow" @wxcButtonClicked="handleScan" />
            <wxc-button v-if="showAgreeCancelBtn" text="同意取消" type="yellow" @wxcButtonClicked="Show.popover=true" />
        </div>
        <!-- 对话框 -->
        <popover-cancel :show.sync="Show.popover" @change="handleConfirmCancel" />
        <!-- 取消 - 对话框 -->
        <wxc-dialog title="提示" content="若取消订单，需要支付10%订单额外费用" :show="Dialog.cancel" confirm-text="取消订单" cancel-text="放弃" @wxcDialogCancelBtnClicked="Dialog.cancel = false" @wxcDialogConfirmBtnClicked="Show.popover = true" />
    </div>
</scroller>
</template>

<script>
import {
    WxcCell,
    WxcButton,
    WxcDialog,
    WxcPopup,
    Utils
} from 'weex-ui'
import {
    Orderstatus,
    YesNo,
    WxPayResult
} from 'Const'
import {
    wxpay
} from 'Const/key'
import BlockList from 'Pages/driver/components/BlockList'
import PlaceInfo from 'Pages/map/modules/PlaceInfo'
import Rater from './components/Rater'
import PopoverCancel from './modules/Cancel'
import Map from './modules/Map'
import status from 'Mixins/status'
import cache from 'Mixins/cache'
var bmWXPay = weex.requireModule('bmWXPay')

export default {
    mixins: [status, cache],
    data: () => ({
        show: false,
        Data: {
            detail: {}
        },
        Const: {
            Orderstatus: Orderstatus,
            YesNo: YesNo
        },
        Show: {
            popover: false,
            mask: false,
            rater: false
        },
        Dialog: {
            cancel: false
        },
        Params: {
            orderId: ''
        },
        Form: {
            score: 0,
            fee: ''
        }
    }),
    watch: {
        Params: {
            handler(val) {
                this.$notice.loading.show('加载中...')
                this.$fetch({
                    method: 'POST',
                    name: 'd/order/detail',
                    data: val
                }).then(data => {
                    this.$set(this.Data, 'detail', data)
                    this.$notice.loading.hide()
                    this.setRightNav(data.status)
                    this.show = true
                })
            },
            deep: true
        }
    },
    eros: {
        beforeAppear(params, options) {
            if (Object.keys(params).length) {
                this.Params = params
                if (params.fromType === 'scan') {
                    this.handleDelivery(params)
                }
            }
        }
    },
    filters: {
        filterFollow(val) {
            return `（${val}人跟车）`
        }
    },
    computed: {
        owner() {
            return this.Data.detail.user ? this.Data.detail.user : {}
        },
        // 是否本人
        isNotMyself() {
            return this.Data.detail.contactsSelf === '0'
        },
        // 是否跟车
        isFollow() {
            return this.Data.detail.follow === '0'
        },
        ownerGEO() {
            if (this.owner) {
                return [Number(this.owner.x), Number(this.owner.y)] || []
            }
        },
        mapHeight() {
            return Utils.env.getPageHeight() / 2
        },
        // 显示“同意取消”
        // => 订单状态为订单中 + cacelStatus为1:待货主确认
        showAgreeCancelBtn() {
            return this.Data.detail.cacelStatus === '0' && this.statusCanceling
        },
        // 能否评分 （为1才可以）
        canRater() {
            return this.statusTransport && this.Data.detail.canScore === '1'
        },
        visitRater() {
            return this.statusFinish && this.Data.detail.canScore === '0'
        }
    },
    created() {
        // 初始化微信SDK
        bmWXPay.initWX(wxpay.appId)
    },
    methods: {
        //  对司机评分
        handleRater({
            score
        }) {
            this.Form.score = score
        },
        //  完成订单
        //  => 改变评分
        handleChangeScore() {
            this.$fetch({
                method: 'POST',
                name: 'd/order/finish',
                data: {
                    ...this.Params,
                    score: this.Form.score
                }
            }).then(data => {
                this.$router.finish()
                this.$router.open({
                    name: 'order.finish',
                    navShow: true,
                    navTitle: '完成订单',
                    params: {
                        content: '恭喜你，完成订单！',
                        pic: 'bmlocal://assets/order-finish.png'
                    }
                })
            })
        },
        // 复制账单
        handleCopyCode() {
            this.$tools.copyString(this.Data.detail.orderCode).then(resData => {
                this.$notice.toast({
                    message: '复制成功'
                })
            }, error => {
                this.$notice.toast({
                    message: '复制'
                })
            })
        },
        // 拨打电话
        handleTel() {
            this.$coms.call(this.owner.mobile)
        },
        // 发送信息
        handleSendMess() {
            this.$router.open({
                name: 'chat.chat',
                navShow: true,
                navTitle: this.owner.userName,
                params: {
                    otherUserId: this.owner.userId
                }
            })
        },
        // 扫一扫 => 订单接货确认
        handleScan() {
            this.$tools.scan().then(({
                text
            }) => {
                this.handleDelivery(JSON.parse(text))
            })
        },
        // 订单接货确认
        handleDelivery(params) {
            this.$fetch({
                method: 'POST',
                name: 'd/order/delivery',
                data: params
            }).then(data => {
                this.$router.finish()
                this.$router.open({
                    name: 'order.finish',
                    navShow: true,
                    navTitle: '接货订单',
                    params: {
                        content: '恭喜你，订单接货成功!',
                        pic: 'bmlocal://assets/order-finish.png'
                    }
                })
            })
        },
        // 待支付 直接取消 => 显示popover
        // 待接货订单20分钟内可随时取消 => 显示popover
        // 待接货订单20分钟之后，提示用户需要扣款10%的订单费用
        handleCancelOrder() {
            let getMins = Number(this.Data.detail.payTimeLen) / 60
            if (getMins > 20) {
                this.Dialog.cancel = true
                return
            }
            this.Show.popover = true
        },
        // 选择好取消原因 => 确认取消订单
        handleConfirmCancel(e) {
            this.$fetch({
                method: 'POST',
                name: 'd/order/cancel',
                data: {
                    ...this.Params,
                    resonType: e.value
                }
            }).then(data => {
                let result = {
                    0: () => {
                        this.$router.finish()
                        this.$router.open({
                            name: 'order.finish',
                            navShow: true,
                            navTitle: '取消订单',
                            params: {
                                content: '成功取消订单...',
                                pic: 'bmlocal://assets/order-cancel.png'
                            }
                        })
                    },
                    1: (data) => {
                        // 判断是否安装微信app
                        var result = bmWXPay.isInstallWXApp()
                        if (result) {
                            this.payWechat(data)
                        } else {
                            this.$notice.alert({
                                title: '错误',
                                message: '使用微信支付前，请安装微信'
                            })
                        }
                    },
                    '-1': () => {
                        this.$notice.toast({
                            message: '取消失败'
                        })
                    }
                }

                return result[data.result](data)
            })
        },
        // 报价
        // => 报价成功后跳转成功页面
        handleQuote() {
            if (!this.Form.fee) {
                this.$notice.toast({
                    message: '请输入报价'
                })
                return
            }
            this.$fetch({
                method: 'POST',
                name: 'd/order/submitFee',
                data: {
                    ...this.Params,
                    ...this.Form
                }
            }).then(data => {
                this.$router.finish()
                this.$router.open({
                    name: 'order.finish',
                    navShow: true,
                    navTitle: '订单报价成功',
                    params: {
                        content: '恭喜你!订单报价成功，请耐心等待货主的答复...',
                        pic: 'bmlocal://assets/order-finish.png'
                    }
                })
            })
        },
        // （运输完成）完成订单
        handleFinish() {
            this.Show.rater = true
        },
        // 跳转
        go(name) {
            this.$router.open({
                name: name,
                params: {
                    ...this.Data.detail,
                    fromType: 'order.detail'
                },
            })
        },
        // 设置右边导航菜单
        // 订单状态为0（即待接单）
        setRightNav(status) {
            this.$navigator.setRightItem({
                text: (this.statusTakeGoods || this.statusPay) ? '取消订单' : '',
                textColor: '#333'
            }, () => {
                this.handleCancelOrder()
            })
        },
        /**
         * ============
         *  微 信 支 付
         * ============
         */
        // 获取微信支付参数
        loadWxConfig(callback) {
            this.$fetch({
                method: 'POST',
                name: 'pay/weixin/getPayOrder',
                data: this.Params
            }).then(data => {
                callback(data)
            })
        },
        // 1.使用微信支付
        handleUseWxPay() {
            // 判断是否安装微信app
            var result = bmWXPay.isInstallWXApp()
            if (result) {
                this.loadWxConfig(config => {
                    this.payWechat(config)
                })
            } else {
                this.$notice.alert({
                    title: '错误',
                    message: '使用微信支付前，请安装微信'
                })
            }
        },
        // 2.支付
        payWechat(item) {
            bmWXPay.pay(item, res => {
                if (!WxPayResult[res.status]) {
                    this.$router.finish()
                    this.$router.open({
                        name: 'order.finish',
                        navShow: true,
                        navTitle: '支付成功',
                        params: {
                            content: '已支付所需费用',
                            button: '回到首页',
                            pic: 'bmlocal://assets/order-pay.png'
                        }
                    })
                } else {
                    this.$notice.toast({
                        message: WxPayResult[res.status]
                    })
                }
            })
        }
    },
    components: {
        WxcCell,
        WxcButton,
        BlockList,
        Rater,
        WxcPopup,
        Map,
        PlaceInfo,
        WxcDialog,
        PopoverCancel
    }
}
</script>
