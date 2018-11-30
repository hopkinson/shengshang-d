<!-- 取消订单 -->
<template>
<div>
    <am-picker :show="show" title="请选择取消原因" :data="dict['resonType-D']" v-model="Data.choose" @ok="handleConfirm" @hide="handleHidden" />
</div>
</template>

<script>
import {
    AmPicker
} from 'weex-amui'
export default {
    data: () => ({
        Data: {
            list: [],
            choose: []
        }
    }),
    created() {
        this.Data.list = this.dict['resonType-D'].map(item => {
            return {
                value: item.value,
                label: item.label
            }
        })
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array
        }
    },
    methods: {
        handleHidden() {
            this.$emit('update:show', false)
        },
        handleConfirm() {
            this.$emit('change', this.Data.choose)
            this.handleHidden()
        }
    },
    computed: {
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    components: {
        AmPicker
    }
}
</script>
