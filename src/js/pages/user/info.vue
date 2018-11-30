<style lang="css" scoped>
.cs-info__img{
  width: 100;
  height: 100;
  border-radius: 3;
}
</style>
<template>
<div class="cs-info">
    <wxc-cell label="昵称" :has-arrow="true" @wxcCellClicked="handleGo('user.editName')">
        <text>{{User.userName}}</text>
    </wxc-cell>
    <wxc-cell label="头像"  has-arrow @wxcCellClicked="handleGo('user.avatar')">
        <image class="cs-info__img" :src="User.headImgUrl" />
    </wxc-cell>
    <wxc-cell label="身份认证" has-top-border :has-arrow="hasNoArrow" @wxcCellClicked="handleGoVerfied">
        <wxc-tag type="solid" :tag-color="setVerify.color" font-color="#fff" :value="setVerify.title"></wxc-tag>
    </wxc-cell>
    <wxc-cell label="手机号">
        <text>{{User.mobile}}</text>
    </wxc-cell>
</div>
</template>
<script>
import {
    WxcCell,
    WxcTag
} from 'weex-ui'
import {
    Verify
} from 'Const'
export default {
    data: () => ({
        User: {}
    }),
    computed: {
        // storage => 用户信息
        userInfo() {
            return this.$storage.getSync('userInfo')
        },
        // 实名认证 是否显示
        hasNoArrow() {
            return this.User.isVerify !== '1'
        },
        // 实名认证 名字
        setVerify() {
            return Verify.find(item => item.value === this.User.isVerify)
        }
    },
    created() {
        this.User = this.userInfo
    },
    eros: {
        beforeBackAppear(params) {
            if (Object.keys(params).length) {
                this.User = this.$storage.getSync('userInfo')
            }
        },
        beforeDisappear(options) {
            this.$router.setBackParams(this.User)
        }
    },
    methods: {
        setVerifyColor() {

        },
        handleGo(name) {
            this.$router.open({
                name: name,
                params: this.User
            })
        },
        handleGoVerfied() {
            if (this.hasNoArrow) {
                this.$router.open({
                    name: this.User.isVerify === '0' ? 'verified.form' : 'verified.finish',
                    params: this.User
                })
            }
        }
    },
    components: {
        WxcCell,
        WxcTag
    }
}
</script>
