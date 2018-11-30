<style lang="scss" scoped>
@import 'src/js/css/base';
</style>
<template>
<div class="cs-forget">
    <c-footer>
        <wxc-button text="确定" class="cs-forget--button" type="yellow" @wxcButtonClicked="handleConfirm"></wxc-button>
    </c-footer>
    <div class="cs-forget__cell">
        <wxc-cell has-top-border>
            <c-icon value="&#xe725;" slot="label"></c-icon>
            <input slot="title" class="input" placeholder="输入手机号码" v-model="Form.loginName" />
        </wxc-cell>
        <wxc-cell>
            <c-icon value="&#xe6c0;" slot="label"></c-icon>
            <input slot="title" class="input" placeholder="输入验证码" v-model="Form.checkCode" />
            <count-down-btn slot="value" @click="handleGetCode" />
        </wxc-cell>
        <wxc-cell>
            <c-icon value="&#xe82b;" slot="label"></c-icon>
            <input slot="title" class="input" placeholder="输入新密码" v-model="Form.newPwd" />
        </wxc-cell>
        <wxc-cell>
            <c-icon value="&#xe82b;" slot="label"></c-icon>
            <input slot="title" class="input" placeholder="再次输入新密码" v-model="Form.confirmPwd" />
        </wxc-cell>
    </div>
</div>
</template>
<script>
import {
    WxcCell,
    WxcIcon,
    WxcButton
} from 'weex-ui'
import CountDownBtn from './components/CountDownBtn'
import {
    Validator
}
from 'Utils/validator'
export default {
    data: () => ({
        Form: {
            loginName: '',
            checkCode: '',
            newPwd: '',
            confirmPwd: ''
        }
    }),
    methods: {
        // 确定找回密码
        handleConfirm() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            if (this.Form.newPwd !== this.Form.confirmPwd) {
                this.$notice.toast({
                    message: '输入的密码不一致'
                })
                return
            }
            this.$fetch({
                method: 'POST',
                name: 'user/pwd/update',
                data: this.Form,
                ignore: ['userId', 'token']
            }).then(data => {
                this.$router.back()
            })
        },
        // 获取验证码
        handleGetCode() {
            this.$fetch({
                method: 'POST',
                name: 'sys/sms/send',
                data: {
                    mobile: this.Form.loginName
                },
                ignore: ['token', 'userId']
            }).then(data => {
                this.$notice.toast({
                    message: '验证码已发送'
                })
            })
        },
        validator() {
            let validator = new Validator()
            validator.add(this.Form.loginName, [{
                strategy: 'isNonEmpty',
                errorMsg: '手机号码不能为空！'
            }, {
                strategy: 'maxLength:11',
                errorMsg: '手机号码长度只能11位！'
            }])
            validator.add(this.Form.checkCode, [{
                strategy: 'isNonEmpty',
                errorMsg: '校验码不能为空！'
            }, {
                strategy: 'maxLength:6',
                errorMsg: '校验码长度不能大于6位！'
            }])
            var errorMsg = validator.start() // 获得效验结果
            return errorMsg // 返回效验结果
        },
    },
    components: {
        WxcCell,
        WxcButton,
        WxcIcon,
        CountDownBtn
    }
}
</script>
