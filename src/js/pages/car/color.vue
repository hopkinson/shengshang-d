<!-- 选择车牌颜色 -->
<style lang="css" scoped>
.cs-choose{
  flex:1;
  padding: 10px;
}
.cs-choose__img{
  justify-content: center;
  align-items: center;
  margin-bottom: 130px;
  margin-top: 130px;
}
.cs-choose__img--img{
  width:400px;
  height: 234px;
}
.cs-choose__info{
  margin-top: 130px;
  margin-bottom: 130px;
}
</style>
<template>
<scroller>
    <div class="cs-choose">
        <!-- 车 - 图片 -->
        <div class="cs-choose__img">
            <image class="cs-choose__img--img" :src="plateColor.url"></image>
        </div>
        <!-- 车 - 选项 -->
        <wxc-grid-select single :customStyles="customStyles" :list="Data.plateColorList" @select="handleChoose">
        </wxc-grid-select>
    </div>
</scroller>
</template>
<script>
import {
    WxcGridSelect,
    wxcButton
} from 'weex-ui'
export default {
    data: () => ({
        Data: {
            plateColor: '',
            plateColorList: []
        },
        Params: {
            plateColor: ''
        },
        customStyles: {
            lineSpacing: '14px',
            icon: '',
            borderColor: '#eaeaea',
            backgroundColor: '#ffffff',
        },
    }),
    eros: {
        beforeAppear(params) {
            // 右侧导航条
            this.$navigator.setRightItem({
                text: '保存',
                fontSize: 26,
            }, () => {
                this.handleConfirm()
            })
            this.setDefault()
        }
    },
    watch: {
        Data: {
            handler(val) {
                this.Params.plateColor = val.plateColor.value
            },
            deep: true
        }
    },
    methods: {
        handleChoose(e) {
            this.Data.plateColor = e.checkedList[0]
        },
        handleConfirm() {
            this.$router.setBackParams({
                ...this.Params,
                fromType: 'car.color'
            })
            setTimeout(() => {
                this.$router.back()
            }, 400)
        },
        // 如果没有值，则以第一个为值
        setDefault() {
            this.Data.plateColorList = this.dict.plateColor.map((item, index) => {
                return {
                    ...item,
                    checked: !index
                }
            })
            this.Data.plateColor = this.dict.plateColor[0]
        }
    },
    created() {

    },
    computed: {
        plateColor() {
            return this.Data.plateColor && this.Data.plateColor.extVariable
        },
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    components: {
        WxcGridSelect,
        wxcButton
    }
}
</script>
