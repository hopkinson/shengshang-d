<!-- 我要拉货 -->
<style lang="scss" scoped>
@import 'src/js/css/base';
</style>

<template>
<div class="cs-pull">
    <wxc-cell>
        <c-icon slot="label" value="&#xe6e0;"></c-icon>
        <input slot="title" class="input" placeholder="常跑路径" v-model="Form.pathMemo">
    </wxc-cell>
    <wxc-cell>
        <c-icon slot="label" value="&#xe71b;"></c-icon>
        <input slot="title" class="input" placeholder="里程要求" v-model="Form.distanceMemo">
    </wxc-cell>
    <wxc-cell has-top-border>
        <c-icon slot="label" value="&#xe839;"></c-icon>
        <input slot="title" class="input" placeholder="货物要求" v-model="Form.goodsMemo">
    </wxc-cell>
    <wxc-cell>
        <c-icon slot="label" value="&#xe69f;"></c-icon>
        <input slot="title" class="input" placeholder="空车留言" v-model="Form.leaveMsg">
    </wxc-cell>
</div>
</template>

<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({
        Form: {
            pathMemo: '',
            goodsMemo: '',
            leaveMsg: '',
            distanceMemo: ''
        }
    }),
    created() {
        // 获取拉货信息
        this.loadInfo()
        // 右边导航条
        this.$navigator.setRightItem({
            text: '保存',
            textColor: '#333'  
        }, () => {
            this.handleConfirm()
        })
    },
    methods: {
        handleConfirm() {
            this.$notice.loading.show("正在设置拉货信息...")
            this.$fetch({
                method: 'POST',
                name: 'd/setting/update',
                data: this.Form
            }).then(data => {
                this.$notice.loading.hide()
                this.$notice.toast({
                    message: '设置拉货信息成功'
                })
                setTimeout(() => {
                    this.$router.back()
                }, 600)
            })
        },
        // 获取拉货信息
        loadInfo() {
            this.$fetch({
                method: 'POST',
                name: 'd/setting'
            }).then(data => {
                this.Form = Object.assign({}, this.Form, data)
            })
        }
    },
    components: {
        WxcCell
    }
}
</script>
