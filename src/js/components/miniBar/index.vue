<template>
<wxc-minibar background-color="#ffd000">
    <div slot="left">
        <slot name="left"></slot>
    </div>
    <div slot="right">
        <slot name="right"></slot>
    </div>
    <text class="cs-title" slot="middle">{{title}}</text>
</wxc-minibar>
</template>

<script>
import {
    WxcMinibar
} from 'weex-ui'
export default {
    components: {
        WxcMinibar
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.cs-title {
    font-size: 36px;
    font-weight: 600;
    color: #333;
}
</style>
