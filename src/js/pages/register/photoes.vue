<style lang="css" scoped>
.cs-photo{
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
<template>
<div>
    <scroller class="cs-photo">
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.idCardPhoto1'>
            <text>身份证照片（正面）</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.idCardPhoto2'>
            <text>手持身份证</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.driverLicense'>
            <text>驾驶证照片</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.driverPermit'>
            <text>行驶证照片</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.carInsurance'>
            <text>车保险照片</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.carPhoto'>
            <text>车辆45°角侧面照片</text>
        </c-upload-pic>
        <c-footer>
            <wxc-button text="确定提交" type="yellow" @wxcButtonClicked="handleConfirm"></wxc-button>
        </c-footer>
    </scroller>
</div>
</template>
<script>
import {
    WxcButton
} from 'weex-ui'
import {
    Validator
}
from 'Utils/validator'
export default {
    data: () => ({
        Form: {
            idCardPhoto1: '',
            idCardPhoto2: '',
            driverLicense: '',
            driverPermit: '',
            carInsurance: '',
            carPhoto: ''
        }
    }),
    created() {},
    eros: {
        beforeAppear(params) {
            if (Object.keys(params).length) {
                this.Form = Object.assign({}, this.Form, params)
            }
        }
    },
    methods: {
        handleConfirm() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            // 3. 登录
            this.$notice.loading.show('正在注册中')
            this.Form = Object.assign({}, this.Form, this.userGeo)
            this.$fetch({
                method: 'POST',
                name: 'user/register',
                data: this.Form,
                ignore: ['token', 'userId']
            }).then(data => {
                //  用户存储到本地
                // this.$storage.setSync('userInfo', data)
                // 获取更详细的用户信息
                // this.$event.emit('load-userInfo', data)
                // 打开相关页面 => 如果有userGeo 则跳去主页，否则选择城市
                this.$router.open({
                    name: 'verified.finish'
                })
            })
        },
        validator() {
            let validator = new Validator()
            validator.add(this.Form.idCardPhoto1, [{
                strategy: 'isNonEmpty',
                errorMsg: '身份证正面照片不能为空！'
            }])
            validator.add(this.Form.idCardPhoto2, [{
                strategy: 'isNonEmpty',
                errorMsg: '手持身份证照片不能为空！'
            }])
            validator.add(this.Form.driverLicense, [{
                strategy: 'isNonEmpty',
                errorMsg: '驾驶证照片不能为空！'
            }])
            validator.add(this.Form.driverPermit, [{
                strategy: 'isNonEmpty',
                errorMsg: '行驶证照片不能为空！'
            }])
            validator.add(this.Form.carInsurance, [{
                strategy: 'isNonEmpty',
                errorMsg: '车保险照片不能为空！'
            }])
            validator.add(this.Form.carPhoto, [{
                strategy: 'isNonEmpty',
                errorMsg: '车侧面照片不能为空！'
            }])
            var errorMsg = validator.start() // 获得效验结果
            return errorMsg // 返回效验结果
        }
    },
    components: {
        WxcButton
    }
}
</script>
