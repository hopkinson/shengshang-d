<style lang="scss" scoped>
@import 'src/js/css/base';
</style>
<template>
<div class="cs-forget">
    <div class="cs-forget__cell">
        <wxc-cell>
            <wxc-icon name="more" slot="label"></wxc-icon>
            <input slot="title" placeholder="输入旧密码" class="input"/>
        </wxc-cell>
        <wxc-cell>
            <wxc-icon name="more" slot="label"></wxc-icon>
            <input slot="title" placeholder="输入新密码" class="input"/>
        </wxc-cell>
        <wxc-cell>
            <wxc-icon name="more" slot="label"></wxc-icon>
            <input slot="title" placeholder="再次输入新密码" class="input"/>
        </wxc-cell>
    </div>
    <wxc-button text="确定" class="cs-forget--button" slot="value" @wxcButtonClicked="handleConfirm"></wxc-button>
</div>
</template>
<script>
import {
    WxcCell,
    WxcIcon,
    WxcButton
} from 'weex-ui'
export default {
    methods: {
        // 确定找回密码
        handleConfirm() {},
        // 获取验证码
        handleGetCode() {}
    },
    components: {
        WxcCell,
        WxcButton,
        WxcIcon
    }
}
</script>
