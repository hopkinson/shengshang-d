<!-- 二维码 -->
<style lang="css" scoped>
.cs-qrcode{
  justify-content: center;
  align-items: center;
}
.cs-qrcode__name{
  font-size: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cs-qrcode__tip{
  font-size: 36px;
  color: orange;
}
.cs-qrcode--img{
  border-width: 1px;
  border-style: dotted;
  border-color: #eaeaea;
  background-color: #fff;
  width: 600px;
  height: 600px;
}
</style>
<template>
<div class="cs-qrcode">
    <image class="cs-qrcode--img" :src="setQrcode"></image>
    <text class="cs-qrcode__name">货品二维码</text>
    <text class="cs-qrcode__tip">请将此二维码提供给司机</text>
</div>
</template>
<script>
const qrCodeUrl = 'http://qr.liantu.com/api.php?text='
export default {
    data: () => ({
        Data: {
            qrcode: ''
        }
    }),
    eros: {
        beforeAppear(params, options) {
            if (Object.keys(params).length) {
                this.Data.qrcode = params.goodsQrcode
            }
        }
    },
    computed: {
        setQrcode() {
            return this.Data.qrcode ? qrCodeUrl + this.Data.qrcode : ''
        }
    }
}
</script>
