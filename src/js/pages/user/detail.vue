<!-- 个人中心 -->
<style lang="css" scoped>
.cs-info__user {
  margin-left: 30px;
}
.cs-info__user--detail {
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.cs-info__user--name {
  font-size: 46px;
  padding-left: 10px;
  padding-right: 10px;
}
.cs-info__user--tel {
  color: grey;
  font-size: 30px;
}
.cs-info__money {
  color: red;
  font-weight: 700;
  font-size: 36px;
}
.cs-info__menu {
  margin-top: 40px;
}
.cs-info__img{
  width: 150px;
  height: 150px;
  border-radius: 150px;
}
</style>
<template>
<div class="cs-info">
    <div>
        <wxc-cell @wxcCellClicked="go('user.info')" :has-bottom-border="false" :cell-style="setInfoStyle" :has-arrow="true">
            <image slot="label" class="cs-info__img" :src="userInfo.headImgUrl" />
            <div slot="title" class="cs-info__user">
                <div class="cs-info__user--detail">
                    <c-icon value="&#xe634;" :color="isVerify"></c-icon>
                    <text class="cs-info__user--name">{{userInfo.userName}}</text>
                    <wxc-tag type="hollow" tag-color="#ff5000" font-color="#ff5000" :value="userInfo.level | formatLevel"></wxc-tag>
                </div>
                <text class="cs-info__user--tel">{{userInfo.mobile}}</text>
            </div>
        </wxc-cell>
    </div>
    <wxc-cell label="账户余额" :has-arrow="true" @wxcCellClicked="go('money.remaining')">
        <text class="cs-info__money" slot="title">{{userInfo.money | filterMoney}}</text>
    </wxc-cell>
    <div class="cs-info__menu">
        <wxc-cell label="用户商城" :has-arrow="true" @wxcCellClicked="go('other.store')"></wxc-cell>
        <wxc-cell label="系统通知" :has-arrow="true" @wxcCellClicked="go('other.system')"></wxc-cell>
    </div>
    <div class="cs-info__menu">
        <wxc-cell label="设置" has-top-border has-arrow @wxcCellClicked="go('setting.setting')"></wxc-cell>
    </div>
</div>
</template>
<script>
import {
    WxcCell,
    WxcButton,
    WxcRadio,
    WxcTag
} from "weex-ui"
import launch from 'Mixins/launch'
export default {
    mixins: [launch],
    data: () => ({
        Show: {
            money: false,
            avatar: false
        },
        setInfoStyle: {
            height: 240,
            backgroundColor: "#ffd000"
        },
        userInfo: {}
    }),
    computed: {
        isVerify() {
            return this.userInfo.isVerify === "1" ? "orange" : "grey"
        }
    },
    created() {
        this.loadUserInfo(data => {
            this.userInfo = data
        })
    },
    eros: {
        beforeBackAppear(params) {
            this.loadUserInfo(data => {
                this.userInfo = data
            })
        }
    },
    methods: {
        go(name) {
            this.$router.open({
                name: name,
                params: this.userInfo
            });
        }
    },
    components: {
        WxcCell,
        WxcRadio,
        WxcButton,
        WxcTag
    }
};
</script>
