<style lang="css" scoped>
</style>
<template>
<div class="cs-topNav">
    <wxc-minibar background-color="#ffd000">
        <text slot="left" @click="handleChoosePlace">中山市</text>
        <text slot="middle">晟商货运</text>
        <text slot="right" @click="handleChooseSeq">{{Data.orderBy.title}}</text>
    </wxc-minibar>
</div>
</template>
<script>
import {
    OrderBy
} from 'Const'
import {
    WxcMinibar,
    WxcPopup,
    WxcRadio
} from 'weex-ui'
export default {
    data: () => ({
        OrderBy: OrderBy,
        Data: {
            orderBy: {}
        },
        Show: {
          seq: false,
          city: false
        }
    }),
    created() {
        this.Data.orderBy = OrderBy[0]
    },
    methods: {
        // 选择筛选条件
        handleChooseSeq() {
            this.$emit('showSeq')
        },
        handleChoosePlace() {
          this.$emit('showCity')
        }
    },
    components: {
        WxcMinibar,
        WxcPopup,
        WxcRadio
    }
}
</script>
