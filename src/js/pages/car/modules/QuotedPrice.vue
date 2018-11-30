<!-- 报价 -->
<style lang="css" scoped>
.cs-quoted {
    flex-direction: row;
    justify-content: space-between;
  }
</style>
<template>
<wxc-mask :show="show" @wxcMaskSetHidden="handleHidden">
    <block-list :data="data" class="cs-emptyInfo-driver"></block-list>
    <c-slider :data="data.carPhoto"></c-slider>
    <div class="cs-quoted--btn">
        <text>报价：{{data.racePrice}}</text>
        <c-icon value="&#xe69b;" size="40px" color="orange" @click="handleChat"></c-icon>
    </div>
    <div class="cs-quoted--btn">
        <wxc-button text="拒绝" type="white" size="big" @wxcButtonClicked="handleReject"></wxc-button>
        <wxc-button text="接受" type="yellow" size="big" @wxcButtonClicked="handleAccept"></wxc-button>
    </div>
</wxc-mask>
</template>
<script>
import BlockList from 'Pages/driver/components/BlockList'
export default {
    data: () => ({

    }),
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 聊天
        handleChat() {
            this.$emit('chat', this.data)
        },
        // 拒绝
        handleReject() {
            this.$notice.confirm({
                message: '确认拒绝司机的报价？',
                okCallback() {
                    this.$emit('reject', this.data)
                },
                cancelCallback() {}
            })
        },
        // 通过
        handleAccept() {
            this.$emit('accept', this.data)
        },
        // 隐藏mask
        handleHidden() {
            this.$emit('update:show', false)
        }
    },
    components: {
        BlockList
    }
}
</script>
