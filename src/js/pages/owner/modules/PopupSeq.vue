<style lang="css" scoped>
</style>
<template>
<wxc-popup class="cs-popup" :show="show" @wxcPopupOverlayClicked="handleClose" pos="top" height="200">
    <wxc-radio :list="item" @wxcRadioListChecked="handleChooseSeq"></wxc-radio>
</wxc-popup>
</template>
<script>
import {
    WxcPopup,
    WxcRadio
} from 'weex-ui'

export default {
    data: () => ({
        text: {}
    }),
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: String
        },
        item: {
          type: [Array]
        }
    },
    created() {
    },
    methods: {
        handleClose() {
            this.$emit('update:show', false)
        },
        handleChooseSeq(e) {
            this.$emit('change', e)
        }
    },
    components: {
        WxcPopup,
        WxcRadio
    }
}
</script>
