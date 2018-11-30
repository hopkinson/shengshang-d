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
    eros: {
        beforeAppear(params) {
            if (Object.keys(params).length) {
                this.customSet.errorPage = Object.assign({}, this.customSet.errorPage, params)
            }
        }
    },
    data: () => ({
        customSet: {
            errorPage: {
                button: '回到首页',
                content: '',
                pic: ''
            }
        }
    }),
    methods: {
        wxcResultButtonClicked(e) {
            this.$router.open({
                name: 'home',
                canBack: false
            })
        }
    }
};
</script>
