<style lang="scss" scoped>
@import 'src/js/css/base';
</style>
<template>
<div class="cs-carInfo">
    <scroller>
        <div class="cs-carInfo__cell">
            <wxc-cell label="车牌颜色" :title="Form.plateColor | filterDict(dict.plateColor)" has-arrow @wxcCellClicked="go('car.color')">
            </wxc-cell>
            <wxc-cell label="车辆号码">
                <input slot="title" class="input" v-model="Form.plateNum" />
            </wxc-cell>
            <wxc-cell label="车辆类型" has-arrow :title="Form.carType | filterDict(dict.carType)" @wxcCellClicked="go('car.choose')">
            </wxc-cell>
        </div>
        <c-footer>
            <wxc-button text="下一步" type="yellow" class="cs-carInfo--button" @wxcButtonClicked="handleConfirm"></wxc-button>
        </c-footer>
    </scroller>
</div>
</template>
<script>
import {
    WxcCell,
    WxcButton
} from 'weex-ui'
import {
    Validator
} from 'Utils/validator'
export default {
    data: () => ({
        Form: {
            carType: '',
            plateNum: '',
            plateColor: ''
        },
        Data: {
            carType: '',
            plateColor: ''
        }
    }),
    computed: {
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    eros: {
        beforeAppear(params) {
            if (Object.keys(params).length) {
                this.Form = Object.assign({}, this.Form, params)
            }
        },
        beforeBackAppear(params, options) {
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
            this.$router.open({
                name: 'register.photoes',
                params: this.Form
            })
        },
        // 选择车
        go(name) {
            this.$router.open({
                name: name,
                params: this.Form
            })
        },
        validator() {
            let validator = new Validator()
            validator.add(this.Form.carType, [{
                strategy: 'isNonEmpty',
                errorMsg: '请选择车型！'
            }])
            validator.add(this.Form.plateColor, [{
                strategy: 'isNonEmpty',
                errorMsg: '车牌颜色不能为空！'
            }])
            validator.add(this.Form.plateNum, [{
                strategy: 'isNonEmpty',
                errorMsg: '车牌号不能为空！'
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
