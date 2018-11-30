<style lang="css" scoped>
</style>
<template>
<wxc-button type="white" size="medium" :disabled="disabled" :text="text" @wxcButtonClicked="run" />
</template>
<script>
import {
    WxcButton
} from 'weex-ui'
export default {
    data: () => ({
        time: 0,
        text: '获取验证码',
        disabled: false
    }),
    props: {
        second: {
            type: Number,
            default: 60
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        run() {
            if (!this.disabled) {
                this.time = this.second
                this.timer()
                this.$emit('click')
            }
        },
        timer() {
            if (this.time > 1) {
                this.time--;
                this.text = this.time + 's 后重新获取'
                this.disabled = true
                setTimeout(this.timer, 1000)
            } else {
                this.disabled = false
                this.text = '获取验证码'
                clearTimeout(this.timer)
            }
        }
    },
    components: {
        WxcButton
    }
}
</script>
