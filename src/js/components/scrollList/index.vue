<style lang="css" scoped>
.cs-list{
  width: 750px;
  flex:1;
}
</style>
<template>
<div class="cs-list">
    <list ref="list" class="cs-list" :showRefresh="true" @refresh="handleFresh" @loadmore="loadmore">
        <cell v-for="(item,index) in data" :key="index">
            <slot :row="item">
            </slot>
        </cell>
    </list>
    <wxc-result :custom-set="emptySet" :type='emptyType' @wxcResultButtonClicked="handleClick" :show="isShow"></wxc-result>
</div>
</template>
<script>
import {
    WxcResult
} from 'weex-ui'
export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        emptySet: {
            type: Object,
            default: () => ({})
        },
        emptyType: {
            type: String,
            default: 'noGoods'
        }
    },
    data: () => ({
        isShow: false
    }),
    watch: {
        data(val) {
            if (Array.isArray(val) && !val.length) {
                setTimeout(() => {
                    this.isShow = true
                }, 300)
            } else {
                this.isShow = false
            }
        }
    },
    components: {
        WxcResult
    },
    methods: {
        // 下拉刷新
        // 当加载完数据  .done()  告知完成
        handleFresh(e) {
            setTimeout(() => {
                this.$emit('refresh', {
                    done: () => {
                        this.$refs['list'].refreshEnd()
                    }
                })
            }, 100)
        },
        // 上拉刷新
        // 当加载完数据  .done()  告知完成
        loadmore(e) {
            this.$emit('loadmore', e)
        },
        handleClick(e) {
            this.$emit('emptyClick', e)
        }
    }
}
</script>
