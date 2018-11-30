<!-- 用户头像 -->
<style lang="css" scoped>
.cs-avatar {
    justify-content: flex-start;
    flex-direction: row;
    padding: 30px;
}

.cs-avatar--img {
    margin: 10px;
    width: 150px;
    height: 150px;
    border-radius: 2px;
    border-style: solid;
    border-color: transparent;
    border-width: 5px;
}

.is-active {
    border-color: orange;
}
</style>

<template>
<div>
    <div class="cs-avatar">
        <image class="cs-avatar--img" :style="setChooseStyle(item,index)" :key="index" v-for="(item,index) in dict.headImg" @click="handleChoose(item,index)" :src="item.extVariable.url" />
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        userInfo: {
            headImgUrl: ''
        }
    }),
    eros: {
        beforeAppear(params) {
            // 右上角保存
            this.$navigator.setRightItem({
                text: '保存',
                textColor: '#333'
            }, () => {
                this.$tools.resignKeyboard()
                this.hanldeConfirm()
            })
            if (Object.keys(params).length !== 0) {
                this.userInfo = Object.assign({}, this.userInfo, params)
            }
        }
    },
    computed: {
        dict() {
            return this.$storage.getSync('dict')
        }
    },
    methods: {
        setChooseStyle(item, index) {
            return {
                borderColor: item.extVariable.url === this.userInfo.headImgUrl ? 'orange' : 'transparent'
            }
        },
        handleChoose(item) {
            this.userInfo.headImg = item.label
            this.userInfo.headImgUrl = item.extVariable.url
        },
        // 保存
        hanldeConfirm() {
            this.$fetch({
                method: 'POST',
                name: 'user/info/update',
                data: this.userInfo
            }).then(data => {
                this.$storage.setSync('userInfo', this.userInfo)
                this.$router.setBackParams(this.userInfo)
                this.$router.back()
            })
        },
    }
}
</script>
