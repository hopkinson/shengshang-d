<!-- iconfont 封装 -->
<style lang="css" scoped>
.cs-icon {
 font-size: 36;
 font-family:iconfont;
 color: #666;
 margin-left: 6px;
 margin-right: 6px;
}
</style>
<template>
<text @click="handleClick" :style="getStyle" class="cs-icon">{{getIcon}}</text>
</template>
<script>
import {
   Utils
} from 'weex-ui'
const dom = weex.requireModule('dom')
export default {
   beforeCreate() {
       dom.addRule('fontFace', {
           'fontFamily': 'iconfont',
           'src': 'url(\'//at.alicdn.com/t/font_622685_y5i5h2o56jb2csor.ttf\')'
       })
   },
   props: {
       value: {
           type: String,
           default: ''
       },
       color: {
           type: String,
           color: '#333'
       },
       size: {
           type: String,
           default: '48px'
       }
   },
   methods: {
       handleClick(e) {
           this.$emit('click', e)
       }
   },
   computed: {
       getIcon() {
           const {
               value
           } = this
           return Utils.decodeIconFont(value)
       },
       getStyle() {
           return {
               fontSize: this.size,
               color: this.color
           }
       }
   }
}
</script>
