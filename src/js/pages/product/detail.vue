<!-- 货品信息 -->
<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-detail__tip {
    margin: 20px;
    color: #666;
}
</style>
<template>
<div class="cs-vehicles">
    <!-- 基本信息 -->
    <wxc-cell label="货品类别">
        <text slot="title">{{Data.goodsType | filterDict(dict.goodsType)}}</text>
    </wxc-cell>
    <wxc-cell label="货品重量">
        <text slot="title">{{Data.goodsWeight | filterDict(dict.goodsWeight)}}</text>
    </wxc-cell>
    <wxc-cell label="其他要求" :cell-style="setCellStyle" :has-bottom-border="false">
        <textarea class="textarea" :disabled="true" slot="title" :rows="3" v-model="Data.goodsMemo" />
    </wxc-cell>
    <!-- 上传图片 -->
    <text class="cs-detail__tip">货品照片</text>
    <c-upload-pic :showUpload="false" :maxCount="6" :width="200" :height="200" :src.sync='Data.goodsPhoto' />
</div>
</template>
<script>
import {
    WxcCell,
    WxcMask,
    WxcRadio
} from 'weex-ui'
import {
    Validator
} from 'Utils/validator'
export default {
    data: () => ({
        Data: {
            goodsType: '',
            goodsWeight: '',
            goodsMemo: '',
            goodsPhoto: ''
        }
    }),
    computed: {
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    eros: {
        beforeAppear(params, options) {
            if (Object.keys(params).length !== 0) {
                this.Data = params
            }
        }
    },
    components: {
        WxcCell
    }
}
</script>
