<template>
<wxc-result type="errorPage" :custom-set="customSet" :show="true" padding-top="232" @wxcResultButtonClicked="wxcResultButtonClicked"></wxc-result>
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
                button: '登录使用',
                content: '您已提交实名认证资料，请耐心等待审核...',
                pic: 'bmlocal://assets/ver-ing.png'
            }
        }
    }),
    methods: {
        wxcResultButtonClicked(e) {
            this.$router.setHomePage('/pages/login/login.js')
        }
    }
};
</script>
