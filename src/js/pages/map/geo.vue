<!-- 开启地理位置 -->
<style lang="css" scoped>
.cs-geo{
  justify-content: center;
  align-items: center;
  flex:1;
  background-color:#fff8e4;
  position: relative;
  padding: 10px;
}
.cs-geo__title{
  font-size: 54;
  font-weight: 700;
  margin-bottom: 100;
}
.cs-geo--img{
  width: 300px;
  height: 300px;
  position: absolute;
  bottom: 100;
  right: 0;
}
.cs-geo__cover{
  width: 300;
  height: 420;
  transform: scale(2);
}
.cs-geo__btn {
  margin-top: 25;
  align-items: center;
  text-align: center;
}
.cs-geo__btn--inner{
  width: 600px;
}
</style>
<template>
<div>
    <wxc-mask height="800" width="702" border-radius="0" duration="200" mask-bg-color="#FFFFFF" :has-overlay="true" :show-close="true" :show="show" @wxcMaskSetHidden="wxcMaskSetHidden">
        <div class="cs-geo">
            <!-- <c-footer> -->
            <div class="cs-geo__btn">
                <text class="cs-geo__title">打开定位权限</text>
                <image src="bmlocal://assets/geo.png" class="cs-geo__cover"></image>
                <wxc-button class="cs-geo__btn--inner" text="马上设置" type="yellow" @wxcButtonClicked="handleGetGEO"></wxc-button>
            </div>
        </div>
    </wxc-mask>
</div>
</template>
<script>
import {
    WxcButton,
    WxcMask
} from 'weex-ui'
import {
    gaode_android_key
} from 'Const/key'
var amap = weex.requireModule('amap')
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    created() {
        amap.initAmap(gaode_android_key)
    },
    methods: {
        wxcMaskSetHidden() {
            this.$emit('update:show', false)
        },
        handleGetGEO() {
            this.$geo.get().then(
                data => {
                    let {
                        locationLng,
                        locationLat
                    } = data
                    let geo = {
                        x: locationLng,
                        y: locationLat
                    }
                    this.$storage.setSync('userGeo', geo)
                    this.wxcMaskSetHidden()
                },
                error => {
                    this.$notice.toast({
                        message: error
                    })
                    this.wxcMaskSetHidden()
                }
            )
        }
    },
    components: {
        WxcButton,
        WxcMask
    }
}
</script>
