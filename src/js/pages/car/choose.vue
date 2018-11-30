<!-- 选择车型 -->
<style lang="css" scoped>
.cs-choose{
  padding: 10px;
}
.cs-choose__img{
  justify-content: center;
  align-items: center;
  margin-bottom: 130px;
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
        <!-- 车 - 详细信息 -->
        <car-info class="cs-choose__info" :data="carInfo"></car-info>
        <!-- 车 - 图片 -->
        <div class="cs-choose__img">
            <image class="cs-choose__img--img" :src="carInfo.url"></image>
        </div>
        <!-- 车 - 选项 -->
        <wxc-grid-select :single="true" :customStyles="customStyles" :list="Data.carTypeList" @select="handleChoose">
        </wxc-grid-select>
    </div>
</scroller>
</template>
<script>
import {
    WxcGridSelect,
    wxcButton
} from 'weex-ui'
import CarInfo from './modules/CarInfo'
export default {
    data: () => ({
        Data: {
            carType: '',
            carTypeList: []
        },
        Params: {
            carType: ''
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
            // 读取 & 创建
            // if (Object.keys(params).length !== 0) {
            //     if (!params.carType.length) {
            //         this.setDefault()
            //     } else {
            //         this.Params.carType = params.carType
            //         this.Data.carType = this.dict.carType.find(item => item.value === this.Params.carType)
            //         this.Data.carTypeList = this.dict.carType.map((item, index) => {
            //             return {
            //                 ...item,
            //                 checked: item.value === this.Params.carType
            //             }
            //         })
            //     }
            // }
        },
    },
    watch: {
        Data: {
            handler(val) {
                this.Params.carType = val.carType.value
            },
            deep: true
        }
    },
    methods: {
        handleChoose(e) {
            this.Data.carType = e.checkedList[0]
        },
        handleConfirm() {
            this.$router.setBackParams({
                ...this.Params,
                fromType: 'car.choose'
            })
            setTimeout(() => {
                this.$router.back()
            }, 400)
        },
        // 如果没有值，则以第一个为值
        setDefault() {
            this.Data.carTypeList = this.dict.carType.map((item, index) => {
                return {
                    ...item,
                    checked: !index
                }
            })
            this.Data.carType = this.dict.carType[0]
        }
    },
    created() {

    },
    computed: {
        carInfo() {
            return this.Data.carType && this.Data.carType.extVariable
        },
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    components: {
        WxcGridSelect,
        wxcButton,
        CarInfo
    }
}
</script>
