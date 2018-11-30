<!-- 修改名称 -->
<style lang="scss" scoped>
@import 'src/js/css/base';
</style>
<template>
<div class="cs-editName">
    <wxc-cell>
        <input slot="title" class="input" v-model="userInfo.userName" />
    </wxc-cell>
</div>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({
        userInfo: {
            userName: ''
        }
    }),
    eros: {
        beforeAppear(params) {
            this.$navigator.setRightItem({
                text: '保存',
                textColor: '#333'
            }, () => {
                this.$tools.resignKeyboard()
                this.hanldeConfirm()
            })
            if (Object.keys(params).length !== 0) {
                this.userInfo = Object.assign({}, this.userInfo, params)
            }
        }
    },
    methods: {
        hanldeConfirm() {
            this.$fetch({
                method: 'POST',
                name: 'user/info/update',
                data: this.userInfo
            }).then(data => {
                this.$storage.setSync('userInfo', this.userInfo)
                this.$router.setBackParams(this.userInfo)
                this.$router.back()
            })
        },
    },
    components: {
        WxcCell
    }
}
</script>
