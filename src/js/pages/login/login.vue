<!--
@Author: hopkinson
@Date:   2018-04-04T17:18:03+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-26T00:52:05+08:00
-->



<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-login__logo {
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 30px;
}

.cs-login__logo--text {
    margin-top: 14px;
    font-size: 40px;
    font-weight: 700;
    color: orange;
}

.cs-login__agree {
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 24px;
    margin-top: 40px;
}

.cs-login__agree--agreement {
    color: orange;
    padding-left: 10px;
    font-size: 30px;
}

.cs-login__tel {
    color: grey;
}

.cs-forget--button {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.cs-login__forget {
    text-align: right;
    padding-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
    color: #666;
}
.cs-login__cover {
    width: 250px;
    height: 250px;
}
</style>

<template>
<div class="cs-login">
    <scroller>
        <div class="cs-login__logo">
            <image src="bmlocal://assets/logo_mini.png" class="cs-login__cover" />
            <text class="cs-login__logo--text">{{Company.name}}</text>
        </div>
        <div class="cs-login__cell">
            <wxc-cell>
                <c-icon value="&#xe725;" slot="label"></c-icon>
                <input placeholder="请输入手机号" slot="title" type="tel" class="input" v-model="Form.loginName" />
            </wxc-cell>
            <wxc-cell>
                <c-icon value="&#xe82b;" slot="label"></c-icon>
                <input placeholder="请输入密码" slot="title" type="password" class="input" v-model="Form.loginPwd" />
            </wxc-cell>
            <wxc-cell has-margin has-top-border>
                <c-icon value="&#xe6c0;" slot="label"></c-icon>
                <input slot="title" placeholder="请输入验证码" class="input" v-model="Form.checkCode" />
                <count-down-btn slot="value" :disabled="!Form.loginName" @click="handleGetCode" />
            </wxc-cell>
        </div>
        <div class="cs-forget--button">
            <wxc-button text="进入盛商" type="yellow" @wxcButtonClicked="handleLogin"></wxc-button>
        </div>
        <text class="cs-login__forget" @click="handleResetPwd">忘记密码</text>
        <div class="cs-login__agree">
            <!-- <text>登录即表示你已同意</text>
        <text class="cs-login__agree--agreement">《盛商货运用户协议》</text> -->
            <text class="cs-login__agree--agreement" @click="go('register')">成为盛商货运司机</text>
        </div>
        <c-footer>
            <text class="cs-login__tel" @click="handleTel(Data.tel)">客户热线：{{Data.tel}}</text>
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
import {
    Company
} from 'Const'
import {
    gaode_android_key,
    gaode_ios_key,
    getui
} from 'Const/key'
import CountDownBtn from './components/CountDownBtn'
import {
    Validator
} from 'Utils/validator'
import finishapp from 'Mixins/finishapp'
import cache from 'Mixins/cache'
var amap = weex.requireModule('amap')
var bmPush = weex.requireModule('bmPush')
export default {
    data: () => ({
        Form: {
            loginName: '',
            checkCode: '',
            loginPwd: '',
            gtcid: ''
        },
        Data: {
            tel: ''
        },
        Company: Company
    }),

    beforeCreate() {
        bmPush.initPush(getui)
    },
    created() {
        bmPush.getCid(resData => {
            this.Form.gtcid = resData.data ? resData.data.cid : ''
        })
        // 获取热线
        this.loadTel()
        // 加载storage里的电话
        if (this.loginName) {
            this.Form.loginName = this.loginName
        }
        // 如果存在storage => 清除
        if (this.userToken) {
            this.$storage.delete('userToken')
        }
        if (this.userInfo) {
            this.$storage.delete('userInfo')
        }

        // 初始化地图
        if (weex.config.env.platform === 'iOS') {
            amap.initAmap(gaode_ios_key)
        } else {
            amap.initAmap(gaode_android_key)
        }
        // 获取地理位置
        this.$geo.get().then(
            data => {
                let {
                    locationLng,
                    locationLat
                } = data
                let geo = {
                    x: locationLng,
                    y: locationLat
                }
                this.$storage.setSync('userGeo', geo)
            },
            error => {
                this.$notice.toast({
                    message: '获取位置失败'
                })
                this.wxcMaskSetHidden()
            }
        )
    },
    mixins: [cache, finishapp],
    methods: {
        handleLogin() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            // 3. 登录
            this.$notice.loading.show('正在登录中')
            bmPush.getCid(resData => {
                this.Form = Object.assign({}, this.Form, this.userGeo, {
                    gtcid: resData.data ? resData.data.cid : ''
                })
            })
            this.$fetch({
                method: 'POST',
                name: 'user/login',
                data: this.Form,
                ignore: ['userId', 'token']
            }).then(data => {
                this.$storage.setSync('loginName', this.Form.loginName)
                //  用户存储到本地
                this.$storage.setSync('userToken', data)
                // 打开相关页面 => 如果有userGeo 则跳去主页，否则选择城市
                this.$router.open({
                    canBack: false,
                    name: this.customGeo ? 'home' : 'city.choose'
                });
                this.customGeo && this.$router.setHomePage('/pages/home/index.js')
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
        handleResetPwd() {
            this.$router.open({
                name: 'login.forget'
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
        go(name) {
            this.$router.open({
                name: name
            })
        },
        // 获取投诉电话
        loadTel() {
            this.$fetch({
                method: 'POST',
                name: 'sys/hotline',
                ignore: ['token', 'userId']
            }).then(data => {
                this.Data.tel = data.globalTel
            })
        },
        handleTel(tel) {
            this.$coms.call(tel)
        }
    },
    components: {
        WxcCell,
        WxcButton,
        CountDownBtn
    }
}
</script>
