<!-- 实名认证 -->
<style lang='scss' scoped>
@import 'src/js/css/base';
.cs-vertified__images {
    margin-top: 40px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
<template>
<div class='cs-vertified'>
    <div class='cs-vertified__info'>
        <wxc-cell label='姓名' :has-margin='true'>
            <input type='text' class='input' slot='title' :autofocus="true" v-model='Form.realName' ref='realName'>
        </wxc-cell>
        <wxc-cell label='身份证号码' :has-margin='true'>
            <input type='text' class='input' slot='title' v-model='Form.idCard' ref='idCard'>
        </wxc-cell>
    </div>
    <div class='cs-vertified__images'>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.idCardPhoto1'>
            <text>身份证照片（正面）</text>
        </c-upload-pic>
        <c-upload-pic :maxCount="1" :width="250" :height="250" :src.sync='Form.idCardPhoto2'>
            <text>手持身份证</text>
        </c-upload-pic>
    </div>

    <c-footer>
        <wxc-button text='确认提交' @wxcButtonClicked='handleConfirm'></wxc-button>
    </c-footer>
</div>
</div>
</template>
<script>
import {
    Validator
} from 'Utils/validator'
import {
    WxcCell,
    WxcButton
} from 'weex-ui'
export default {
    data: () => ({
        Form: {
            idCardPhoto1: '',
            idCardPhoto2: '',
            idCard: '',
            realName: ''
        }
    }),
    computed: {
        userInfo() {
            return this.$storage.getSync('userInfo')
        }
    },
    methods: {
        //   实名认证∫
        handleConfirm() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            this.$fetch({
                method: 'POST',
                name: 'user/info/verify',
                data: this.Form
            }).then(resData => {
                this.$storage.setSync('userInfo', Object.assign({}, this.userInfo, {
                    isVerify: '2'
                }))
                this.$router.open({
                    name: 'verified.finish'
                })
            })
        },
        validator() {
            let validator = new Validator()
            validator.add(this.Form.realName, [{
                    strategy: 'isNonEmpty',
                    errorMsg: '真实姓名不能为空'
                },
                {
                    strategy: 'maxLength:10',
                    errorMsg: '名字长度不能大于10位'
                }
            ])
            validator.add(this.Form.idCardPhoto1, [{
                strategy: 'isNonEmpty',
                errorMsg: '请上传身份证相关图片'
            }])
            validator.add(this.Form.idCardPhoto2, [{
                strategy: 'isNonEmpty',
                errorMsg: '请上传手持身份证相关图片'
            }])
            validator.add(this.Form.idCard, [{
                    strategy: 'isNonEmpty',
                    errorMsg: '身份证号码不能为空'
                },
                {
                    strategy: 'isIDCard',
                    errorMsg: '请输入正确身份证号码'
                }
            ])
            var errorMsg = validator.start() // 获得效验结果
            this.$notice.toast({
                message: errorMsg
            })
            return errorMsg // 返回效验结果
        }
    },
    components: {
        WxcCell,
        WxcButton
    }
}
</script>
