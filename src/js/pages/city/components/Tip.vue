<template>
<wxc-cell label="当前城市：" :title="data" :has-arrow="false" :cell-style="cellStyle">
</wxc-cell>
</template>

<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({
        cellStyle: {
            backgroundColor: '#FFF3CD',
            height: 50
        }
    }),
    props: {
        data: {
            type: String,
            default: ''
        },
    },
    components: {
        WxcCell
    }
}
</script>

<style scoped>
.red {
    color: #C3413D;
}
</style>
