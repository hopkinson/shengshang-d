<style lang="scss" scoped>
@import 'src/js/css/base';
</style>
<template>
<div class="cs-userInfo">
    <scroller class="cs-userInfo">
        <div class="cs-userInfo__cell">
            <wxc-cell has-bottom-border has-margin :title="customGeo.areaName" label="所属城市" @wxcCellClicked="handleChooseCity">
            </wxc-cell>
            <wxc-cell  label="姓名">
                <input slot="title" class="input" v-model="Form.realName" />
            </wxc-cell>
            <wxc-cell  has-top-border label="身份证号码">
                <input slot="title" type="number" class="input" v-model="Form.idCard" />
            </wxc-cell>
            <wxc-cell  label="紧急联系人">
                <input slot="title" class="input" v-model="Form.contactName" />
            </wxc-cell>
            <wxc-cell label="紧急联系人电话">
                <input slot="title" type="tel" class="input" v-model="Form.contactMobile" />
            </wxc-cell>
        </div>
        <c-footer type='static'>
            <wxc-button text="下一步" type="yellow" @wxcButtonClicked="handleConfirm"></wxc-button>
        </c-footer>
    </scroller>
</div>
</template>
<script>
import {
    Validator
}
from 'Utils/validator'
import {
    WxcCell,
    WxcButton
} from 'weex-ui'
export default {
    name: '',
    data: () => ({
        Form: {
            realName: '',
            idCard: '',
            contactName: '',
            contactMobile: '',
            areaCode: ''
        },
        customGeo: {}
    }),
    eros: {
        beforeBackAppear(params) {
            this.customGeo = this.$storage.getSync('customGeo')
            this.Form.areaCode = this.customGeo.areaCode
        },
        beforeAppear(params) {
            if (Object.keys(params).length) {
                this.Form = Object.assign({}, this.Form, params)
            }
        },
    },
    methods: {
        // 下一步
        handleConfirm() {
            let errorMsg = this.validator()
            if (errorMsg) {
                this.$notice.toast({
                    message: errorMsg
                })
                return false
            }
            this.$router.open({
                name: 'register.carInfo',
                params: this.Form
            })
        },
        // 选择城市
        handleChooseCity() {
            this.$router.open({
                name: 'city.choose',
                params: {
                    ...this.Form,
                    fromType: 'register'
                }
            })
        },
        validator() {
            let validator = new Validator()
            validator.add(this.Form.areaCode, [{
                strategy: 'isNonEmpty',
                errorMsg: '请选择所属城市！'
            }])
            validator.add(this.Form.realName, [{
                strategy: 'isNonEmpty',
                errorMsg: '真是姓名不能为空！'
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
            validator.add(this.Form.contactName, [{
                strategy: 'isNonEmpty',
                errorMsg: '紧急联系人名称不能为空！'
            }])
            validator.add(this.Form.contactMobile, [{
                strategy: 'isNonEmpty',
                errorMsg: '手机号码不能为空！'
            }, {
                strategy: 'maxLength:11',
                errorMsg: '手机号码长度只能11位！'
            }])
            var errorMsg = validator.start() // 获得效验结果
            return errorMsg // 返回效验结果
        }
    },
    components: {
        WxcCell,
        WxcButton
    }
}
</script>
