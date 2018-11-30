<template>
<slider :style="setSliderStyle" :interval="interval" :auto-play="autoplay" :infinite="infinite" @change="handleChange">
    <image @click="handleClick(item,index)" :style="setImgStyle" :placeholder="placeholder" :src="item" v-for="(item,index) in data" :key="index" />
    <indicator class="indicator" :style="indicatorStyle"></indicator>
</slider>
</template>

<style>
.indicator {
    width: 750px;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    item-color: #ffffff;
    item-selectedColor: #747474;
    item-size: 20px;
    opacity: 0.8;
}
</style>

<script>
export default {
    props: {
        setSliderStyle: {
            type: Object,
            default: {
                "width": "750px",
                "height": "400px"
            }
        },
        indicatorStyle: {
            type: Object,
            default: {}
        },
        data: {
            type: Array
        },
        interval: {
            type: Number,
            default: 6000 //ms
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        infinite: {
            type: Boolean,
            default: true
        },
        imgResize: {
            type: String,
            default: "stretch"
        },
        imgWidth: {
            type: String,
            default: '750px'
        },
        imgHeight: {
            type: String,
            default: '400px'
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    computed: {
        setImgStyle() {
            return {
                width: this.imgWidth,
                height: this.imgHeight
            }
        }
    },
    methods: {
        handleChange(e) {
            this.$emit("change", e)
        },
        handleClick(e, index) {
            this.$image.preview({
                index: index,
                images: this.data
            })
            this.$emit("click", e)
        }
    }
}
</script>
