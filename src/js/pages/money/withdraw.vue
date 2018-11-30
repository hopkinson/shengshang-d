<!-- 提现 -->
<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-withdraw {
    margin-top: 20px;
}
.input-number {
    font-size: 50px;
}
.cs-withdraw--wexin {
    width: 100;
    height: 100;
    margin-right: 20;
}
.cs-withdraw-title {
    color: #666;
    margin: 20px;
}
</style>
<template>
<div>
    <scroller>
        <!-- 提现 -->
        <text class="cs-withdraw-title">提现方式</text>
        <wxc-cell :has-arrow="false" has-margin title="微信支付">
            <image class="cs-withdraw--wexin" src="bmlocal://assets/weixin.png" slot="label"></image>
        </wxc-cell>
        <div class="cs-withdraw">
            <wxc-cell>
                <div slot="title">
                    <text>提现金额</text>
                    <input class="input input-number" type="number" autofocus="true" v-model="Params.money" />
                </div>
            </wxc-cell>
            <wxc-cell>
                <text slot="label">可用金额{{userInfo.money}}元</text>
                <wxc-button type="white" text="全部提现" size="medium" @wxcButtonClicked="handleTakeAll"></wxc-button>
            </wxc-cell>
            <c-footer type="static">
                <wxc-button type="yellow" text="确认提现" @wxcButtonClicked="handleLogout"></wxc-button>
            </c-footer>
        </div>
    </scroller>
</div>
</template>
<script>
import {
    WxcCell,
    WxcButton
} from 'weex-ui'
export default {
    data: () => ({
        Params: {
            money: ''
        }
    }),
    computed: {
        userInfo() {
            return this.$storage.getSync('userInfo')
        }
    },
    methods: {
        handleLogout() {
            this.$router.back({
                length: 100000
            })
        },
        handleTakeAll() {
            this.Params.money = this.userInfo.money
        }
    },
    components: {
        WxcCell,
        WxcButton
    }
}
</script>
