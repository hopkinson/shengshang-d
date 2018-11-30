<style lang="css" scoped>
.cs-img__skip {
    width: 120px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-color: #fff;
    border-radius: 20px;
    background-color: grey;
    position: absolute;
    right: 30px;
    top: 80px;
}

.cs-img__skip--text {
    color: #fff;
}

.cs-img--img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.modal-top {
    align-items: flex-start;
    flex: 1;
    justify-content: flex-start;
}
</style>

<template>
<bmmask class="mask" animation="scale" position="center" ref="bmmask" @show="showMask" @hide="jump" :disableMaskEvent="true">
    <bmpop class="modal-top">
        <image resize="cover" ref="cover" @load="onLoad" class="cs-img--img" :src="imgUrl" />
        <div class="cs-img__skip">
            <text class="cs-img__skip--text" @click="jump">跳过{{number}}</text>
        </div>
    </bmpop>
</bmmask>
</template>

<script>
import {
    Utils
} from 'weex-ui'
export default {
    data: () => ({
        timer: null,
        number: 5,
        hasShown: false
    }),
    props: {
        imgUrl: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean
        }
    },
    watch: {
        show(val) {
            this.$nextTick(() => {
                if (val) {
                    !this.hasShown && this.$refs['bmmask'].show()
                } else {
                    this.$refs['bmmask'].hide()
                    this.jump()
                }
            })
        }
    },
    methods: {
        showMask() {
            this.timer = setInterval(() => {
                this.number--;
                if (!this.number) {
                    this.jump()
                }
            }, 1000)
        },
        jump() {
            this.$emit('jump')
            // 1.清定时器
            clearInterval(this.timer)
            this.timer = null
            this.number = 5
            this.hasShown = true
            this.$emit('update:show', false)
        }
    }
}
</script>
