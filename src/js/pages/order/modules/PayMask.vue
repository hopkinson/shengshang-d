<style lang="css" scoped>
.cs-pay {
  margin-top: 25;
  align-items: center;
  text-align: center;
}
.cs-pay--button{
max-width: 600;
}
.cs-pay__container{
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.cs-pay--text{
  font-size: 28px;
}
.cs-pay__money{
  font-size: 80px;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>
<template>
<div>
    <!-- 支付  -->
    <wxc-mask height="500" duration="500" border-radius="10" :show-close="true" :show="show" @wxcMaskSetHidden="hidePayMask">
        <wxc-cell>
            <div slot="title" class="cs-pay__container">
                <text class="cs-pay--text">支付</text>
                <text class="cs-pay__money">{{fee | filterMoney}}</text>
            </div>
        </wxc-cell>
        <wxc-cell has-arrow :title="Data.choose.title" @wxcCellClicked="handleChoose">
        </wxc-cell>
        <div class="cs-pay">
            <wxc-button class="cs-pay--button" text="确认支付" @wxcButtonClicked="handleConfirmPay"></wxc-button>
        </div>
    </wxc-mask>
    <!-- 选择支付 -->
    <wxc-mask height="800" duration="500" border-radius="10" mask-bg-color="#FFFFFF" :has-overlay="true" :show-close="true" :show="Show.choose" @wxcMaskSetHidden="hidePayMask">
        <wxc-radio :list="Data.way" @wxcRadioListChecked="handleChooseWay"></wxc-radio>
    </wxc-mask>
</div>
</template>
<script>
import {
    WxcCell,
    WxcRadio,
    WxcMask,
    WxcButton
} from 'weex-ui'
export default {
    data: () => ({
        Show: {
            choose: false
        },
        Data: {
            way: [],
            choose: {}
        }
    }),
    props: {
        fee: {
            type: Number,
            default: 0
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.Data.way = [{
            value: 1,
            title: `余额（剩余¥${this.userInfo.money}）`,
            checked: true
        }, {
            value: 2,
            title: `微信支付`
        }]
        this.Data.choose = this.Data.way[0]
    },
    computed: {
        userInfo() {
            return this.$storage.getSync('userInfo')
        }
    },
    watch: {
        'Data.choose' (val) {
            this.Data.way = this.Data.way.map(item => {
                return {
                    ...item,
                    checked: item.value === val.value
                }
            })
        }
    },
    methods: {
        // 关掉支付页面
        hidePayMask() {
            this.Show.pay = false
            this.$emit('update:show', false)
        },
        // 选择支付方式
        handleChoose() {
            this.$emit('update:show', false)
            this.Show.choose = true
        },
        handleChooseWay(e) {
            this.Data.choose = e
            this.Show.choose = false
            this.$emit('update:show', true)
        },
        handleConfirmPay() {
            if (this.Data.choose.title.includes('余额')) {
                this.handleNotEnough()
            } else {
                // this.$emit('pay', this.Data.choose)
            }
        },
        handleNotEnough() {
            if (this.userInfo.money < this.fee) {
                this.$notice.confirm({
                    title: '可用余额不足',
                    message: '请更换另一种支付方式后再试',
                    okTitle: '换卡支付',
                    cancelTitle: '取消',
                    okCallback() {
                        this.Data.way[0].disabled = false
                    }
                })
                return false
            } else {
                // this.$emit('pay', this.Data.choose)
            }
        }
    },
    components: {
        WxcCell,
        WxcRadio,
        WxcButton,
        WxcMask
    }
}
</script>
