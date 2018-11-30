<style lang="css" scoped>
    .cs-place--title {
        font-weight: 700;
        font-size: 32px;
        lines: 1;
        text-overflow: ellipsis;
    }
    
    .cs-place--subtitle {
        color: #666;
        lines: 2;
        text-overflow: ellipsis;
    }
    
    .cs-place--value {
        color: red;
        width: 140px;
        lines: 2;
        padding-right: 4px;
        padding-left: 4px;
        text-overflow: ellipsis;
        font-size: 24px;
    }
    
    .cs-place--tip {
        color: #666;
        font-size: 28px;
    }
</style>

<template>
    <div class="cs-place">
        <wxc-cell :has-arrow="true" @wxcCellClicked="handleChoose('start', '起点位置')">
            <c-icon value="&#xe6ed;" color="green" size="60" slot="label"></c-icon>
            <div slot="title">
                <text class="cs-place--title">{{data.originName}}</text>
                <text class="cs-place--subtitle">{{data.originAddress | filterAddress}}</text>
                <text class="cs-place--tip" v-if="originEmpty">请选择起点</text>
            </div>
            <text slot="value" class="cs-place--value">{{data.originDistrict}}</text>
        </wxc-cell>
        <wxc-cell :has-arrow="true" :has-bottom-border="false" @wxcCellClicked="handleChoose('end', '终点位置')">
            <c-icon value="&#xe6ed;" color="red" size="60" slot="label"></c-icon>
            <div slot="title">
                <text class="cs-place--title">{{data.destinationName}}</text>
                <text class="cs-place--subtitle">{{data.destinationAddress | filterAddress}}</text>
                <text class="cs-place--tip" v-if="destinationEmpty">请选择终点</text>
            </div>
            <text slot="value" class="cs-place--value">{{data.destinationDistrict}}</text>
        </wxc-cell>
    </div>
</template>

<script>
    import {
        WxcCell
    } from 'weex-ui'
    export default {
        data: () => ({
    
        }),
        props: {
            data: {
                type: Object
            },
            readOnly: {
                type: Boolean,
                default: false
            }
        },
        filters: {
            filterAddress(val) {
                if (!val || !val.length) {
                    return ''
                }
                return val
            }
        },
        computed: {
            destinationEmpty() {
                return !this.data.destinationName || !this.data.destinationName.length
            },
            originEmpty() {
                return !this.data.originName || !this.data.originName.length
            }
        },
        methods: {
            handleChoose(fromType, title) {
                this.$router.open({
                    name: 'map.choose',
                    navShow: true,
                    navTitle: title,
                    params: {
                        ...this.data,
                        page: {
                            readOnly: this.readOnly,
                            fromType: fromType
                        }
                    }
                })
            }
        },
        components: {
            WxcCell
        }
    }
</script>
