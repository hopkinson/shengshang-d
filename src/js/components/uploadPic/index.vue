<!-- 上传图片 -->
<style lang="css" scoped>
.cs-upload {
  justify-content: center;
  margin: 10px;
}
.is-multiple {
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap:wrap;
}
.cs-upload__single{
  align-items: center;
  justify-content: center;
}
.cs-upload__single--inner {
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #666;
  background-color: #fff;
  margin: 10px;
}
.cs-upload--img{
    margin: 10px;
}
.cs-upload__popover--text{
text-align: center;
}
.delete{
  color: red;
}
</style>
<template>
<div class="cs-upload" :class="setMultipleClass">
    <!-- 单张图片 -->
    <div class="cs-upload__single" @click="handleClick">
        <div class="cs-upload__single--inner" v-if="multiple" :style="setStyle" @click="handleClick">
            <wxc-icon name="add" size="large" @wxcIconClicked="handleClick"></wxc-icon>
        </div>
        <image :style="setStyle" class="cs-upload--img" v-if="showOnlyone" :src="src" @click="handleClickMulitiple"></image>
        <slot>
        </slot>
    </div>
    <!-- 显示 - 多张图片 -->
    <image :style="setStyle" class="cs-upload--img" v-for="(item, index) in src" v-if="!onlyOne" :src="item" @click="handleClickMulitiple(item,index)"></image>
    <!-- 底部操作 - popup -->
    <wxc-popup :show="Pic.showPop" @wxcPopupOverlayClicked="handleClosePop" pos="bottom" :height="setPopHeight">
        <wxc-cell @wxcCellClicked="handleViewPic">
            <text class="cs-upload__popover--text" slot="title">查看图片</text>
        </wxc-cell>
        <wxc-cell @wxcCellClicked="handleClick" v-if="onlyOne">
            <text class="cs-upload__popover--text" slot="title">更换图片</text>
        </wxc-cell>
        <wxc-cell @wxcCellClicked="handleDelete" :has-bottom-border="false" v-if="onlyOne">
            <text class="cs-upload__popover--text delete" slot="title">删除图片</text>
        </wxc-cell>
    </wxc-popup>
</div>
</template>
<script>
import {
    WxcIcon,
    WxcPopup,
    WxcCell
} from "weex-ui"
var axios = weex.requireModule("bmAxios")
export default {
    data: () => ({
        Form: {},
        Pic: {
            showPop: false,
            index: 0
        }
    }),
    props: {
        boderStyle: {
            type: String,
            default: "dotted"
        },
        src: {
            type: [Array, String]
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        tip: {
            type: String
        },
        maxCount: {
            type: Number,
            default: 1
        },
        showUpload: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        setStyle() {
            return {
                borderStyle: this.boderStyle,
                width: `${this.width}px`,
                height: `${this.height}px`
            }
        },
        setMultipleClass() {
            return [this.maxCount > 1 ? 'is-multiple' : '']
        },
        multiple() {
            return (!this.src || this.maxCount > this.src.length) && this.showUpload
        },
        onlyOne() {
            return this.maxCount === 1
        },
        showOnlyone() {
            return this.maxCount === 1 && this.src.length
        },
        setPopHeight() {
            return this.onlyOne ? '300' : '100'
        }
    },
    methods: {
        // 1.上传图片
        handleClick() {
            this.Pic.showPop = false
            this.$image
                .pick({
                    maxCount: this.maxCount
                })
                .then(
                    pics => {
                        //    2.获取token
                        this.loadToken(pics);
                    },
                    error => {
                        this.$notice.toast({
                            message: "选择图片失败"
                        });
                    }
                );
        },
        // 获取token
        loadToken(pics) {
            this.$notice.loading.show("图片上传中");
            this.$fetch({
                method: "POST",
                name: "sys/file/upload/param"
            }).then(data => {
                this.Form = {
                    ...data,
                    token: data.uploadToken
                };
                this.handleUplaod(pics);
            });
        },
        // 上传到七牛云
        handleUplaod(pics) {
            axios.uploadImage({
                    url: "",
                    params: this.Form,
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    images: pics
                },
                picArr => {
                    let {
                        data
                    } = picArr
                    let imgUrl = data.map(item => `${this.Form.accessDomain}/${item.key}`)
                    if (this.maxCount > 1) {
                        this.src = this.src.concat(imgUrl)
                        this.$emit("update:src", this.src)
                    } else {
                        this.src = imgUrl
                        this.$emit("update:src", this.src.toString())
                    }
                    this.$notice.loading.hide()
                }
            );
        },
        handleClickMulitiple(item, index) {
            this.Pic.showPop = true
            this.index = index || 0
        },
        handleDelete() {
            if (this.multiple) {
                this.src.splice(this.index, 1)
            } else {
                this.src = ''
            }
            this.$emit("update:src", this.src)
            this.handleClosePop()
        },
        handleViewPic(obj, item, index) {
            if (!Array.isArray(this.src)) {
                this.src = [this.src]
            }
            this.$image.preview({
                index: this.index,
                images: this.src
            })
            this.handleClosePop()
        },
        handleClosePop() {
            this.Pic.showPop = false
        },
    },
    components: {
        WxcIcon,
        WxcPopup,
        WxcCell
    }
};
</script>
