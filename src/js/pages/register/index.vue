<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-register__logo {
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 30px;
}

.cs-register__logo--text {
    margin-top: 14px;
    font-size: 40px;
    font-weight: 700;
    color: orange;
}

.cs-register__agree {
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 24px;
    margin-top: 40px;
}

.cs-register__agree--agreement {
    color: orange;
    padding-left: 10px;
}

.cs-register__tel {
    color: grey;
}

.cs-forget--button {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.cs-register__forget {
    text-align: right;
    padding-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
    color: #666;
}
.cs-register__cover {
    width: 250px;
    height: 250px;
}
.cs-register__cell {
    margin-top: 420px;
}
.cs-register--cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 750px;
    height: 420px;
}
</style>

<template>
<div class="cs-register">
    <scroller>
        <!-- <div class="cs-register__logo">
        <image src="bmlocal://assets/logo_mini.png" class="cs-register__cover"></image>
        <text class="cs-register__logo--text">盛商货运</text>
    </div> -->
        <image src="bmlocal://assets/register.jpg" class="cs-register--cover" />
        <div class="cs-register__cell">
            <wxc-cell>
                <c-icon value="&#xe725;" slot="label"></c-icon>
                <input placeholder="请输入手机号" slot="title" type="tel" class="input" v-model="Form.loginName" />
            </wxc-cell>
            <wxc-cell>
                <c-icon value="&#xe82b;" slot="label"></c-icon>
                <input placeholder="请输入密码" slot="title" type="password" class="input" v-model="Form.loginPwd" />
            </wxc-cell>
            <wxc-cell has-top-border>
                <c-icon value="&#xe6c0;" slot="label"></c-icon>
                <input slot="title" placeholder="请输入验证码" class="input" v-model="Form.checkCode" />
                <count-down-btn slot="value" :disabled="!Form.loginName" @click="handleGetCode" />
            </wxc-cell>
        </div>
        <!-- <div class="cs-forget--button">
        <wxc-button text="马上成为盛商货运司机" type="yellow" @wxcButtonClicked="handleregister"></wxc-button>
    </div> -->
        <!-- <text class="cs-register__forget" @click="handleResetPwd">忘记密码</text> -->
        <div class="cs-register__agree">
            <!-- <text>登录即表示你已同意</text>
        <text class="cs-register__agree--agreement">《盛商货运用户协议》</text> -->
            <!-- <text class="cs-register__agree--agreement" @click="go('register')">成为盛商货运司机</text> -->
        </div>
        <c-footer type="static">
            <wxc-button text="马上成为盛商货运司机" type="yellow" @wxcButtonClicked="handleregister"></wxc-button>
            <!-- <text class="cs-register__tel">客户热线：400-888-888</text> -->
        </c-footer>
    </scroller>
</div>
</template>

<script>
import {
    WxcCell,
    WxcButton
}
from 'weex-ui'
import CountDownBtn from './components/CountDownBtn'
import {
    Validator
}
from 'Utils/validator'
export default {
    name: '',
    data: () => ({
        Form: {
            loginName: '', // 15217318875
            checkCode: '', // 000000
            loginPwd: ''
        }
    }),
    computed: {
        userGeo() {
            return this.$storage.getSync('userGeo')
        },
        customGeo() {
            return this.$storage.getSync('customGeo')
        }
    },
    methods: {
        handleregister() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            this.handleVerify(() => {
                this.$router.open({
                    name: 'register.userInfo',
                    params: this.Form
                })
            }, () => {
                this.$notice.toast({
                    message: '你已经注册了用户，请直接登录'
                })
                this.$router.open({
                    name: 'login'
                })
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
        // 验证用户
        handleVerify(callback, error) {
            this.$fetch({
                method: 'POST',
                name: 'user/verify',
                data: this.Form,
                ignore: ['token', 'userId']
            }).then(data => {
                this.Form = Object.assign({}, this.Form, data)
                data.register === '0' ? callback() : error()
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
            validator.add(this.Form.loginPwd, [{
                strategy: 'isNonEmpty',
                errorMsg: '密码不能为空！'
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
        go(name) {
            this.$router.open({
                name: name
            })
        }
    },
    components: {
        WxcCell,
        WxcButton,
        CountDownBtn
    }
}
</script>
