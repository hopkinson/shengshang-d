<style lang="css" scoped>

</style>

<template>
<div class="cs-setting">
    <div>
        <wxc-cell label="合作伙伴" has-arrow @wxcCellClicked="handleGo('other.partner')"></wxc-cell>
        <wxc-cell label="投诉电话" has-margin has-arrow @wxcCellClicked="handleGo('other.tel')"></wxc-cell>
        <wxc-cell label="关于我们"  has-arrow @wxcCellClicked="handleGo('other.about')"></wxc-cell>
    </div>
    <wxc-dialog title="是否退出登录" :show="Show.dialog" @wxcDialogCancelBtnClicked="Show.dialog = false" @wxcDialogConfirmBtnClicked="handleLogout" />
    <c-footer>
        <wxc-button text="退出登录" @wxcButtonClicked="handleShowDialog"></wxc-button>
    </c-footer>
</div>
</template>

<script>
import {
    WxcCell,
    WxcButton,
    WxcDialog
} from 'weex-ui'
export default {
    data: () => ({
        Show: {
            dialog: false
        }
    }),
    methods: {
        handleShowDialog() {
            this.Show.dialog = true
        },
        handleLogout() {
            this.$notice.loading.show('正在退出中...')
            this.$fetch({
                method: 'POST',
                name: 'user/logout'
            }).then(resData => {
                this.Show.dialog = false
                this.$storage.delete('userToken')
                this.$storage.delete('userInfo')
                this.$storage.delete('customGeo')
                this.$notice.loading.hide()
            })
        },
        handleGo(name) {
            this.$router.open({
                name: name
            })
        },
    },
    components: {
        WxcCell,
        WxcDialog,
        WxcButton
    }
}
</script>
