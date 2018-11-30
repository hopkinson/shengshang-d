<template>
<wxc-result type="errorPage" :custom-set="customSet" :show="true" padding-top="232" @wxcResultButtonClicked="wxcResultButtonClicked">
</wxc-result>
</template>

<script>
import {
    WxcResult
} from 'weex-ui';
export default {
    components: {
        WxcResult
    },
    data: () => ({
        customSet: {
            errorPage: {
                button: '返回',
                content: '网络竟然崩溃了...',
                pic: 'bmlocal://assets/err-network.png'
            }
        }
    }),
    methods: {
        wxcResultButtonClicked(e) {
            this.$router.back()
        }
    }
};
</script>
