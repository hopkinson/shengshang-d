<template>
<div class="cs-choose">
    <!-- 搜索框 -->
    <wxc-searchbar placeholder="搜索城市" ref="searchbar" @wxcSearchbarInputOnInput="handleSearchPlace" @wxcSearchbarCancelClicked="handleCancelSearch"></wxc-searchbar>
    <city-tip :data="setHeader" v-if="customGeo"></city-tip>
    <!-- 城市列表 -->
    <scroller>
        <am-list :header="item.areaName" v-for="(item,index) in Data.areaList" :key="index">
            <am-list-radio v-for="(sub,e) in item.children" :key="e" :title="sub.areaName" :checked="checked(sub)" @change="handleChoosePlace(sub)"></am-list-radio>
        </am-list>
    </scroller>

</div>
</template>

<script>
import {
    WxcSearchbar
} from 'weex-ui'
import {
    fuzzyQuery,
    jsonTree
} from 'Utils/utils'
import {
    AmList,
    AmListRadio
} from 'weex-amui'
import CityTip from './components/Tip'
import cache from 'Mixins/cache'
export default {
    mixins: [cache],
    data: () => ({
        Search: {
            text: ''
        },
        Data: {
            areaList: [],
            areaListDeep: []
        },
        Type: {
            from: ''
        }
    }),
    created() {
        this.loadCity()
    },
    eros: {
        beforeAppear(params) {
            if (Object.keys(params).length) {
                this.Type.from = params.fromType
            }
        }
    },
    computed: {
        setHeader() {
            return this.customGeo ? this.customGeo.areaName : ''
        }
    },
    methods: {
        checked(item) {
            return this.customGeo && (this.customGeo.areaCode === item.areaCode)
        },
        // 过滤地方
        handleSearchPlace(e) {
            let tmp = !e.value || ''
            this.Data.areaList = tmp ?
                this.Data.areaListDeep :
                fuzzyQuery(this.Data.areaList, 'areaName', e.value)
        },
        // 取消搜索地方
        handleCancelSearch(e) {
            this.Data.areaList = this.Data.areaListDeep
            this.$tools.resignKeyboard()
        },
        // 选择地方
        handleChoosePlace(e) {
            this.$storage.setSync('customGeo', e)
            // 如果是注册过来就返回，否则去到主页
            setTimeout(() => {
                if (this.Type.from.includes('register')) {
                    this.$router.back()
                } else {
                    this.$router.setHomePage('/pages/home/index.js')
                }
            }, 200)
        },
        // 读取 - 城市数据
        loadCity(params) {
            this.$notice.loading.show("城市数据加载中")
            this.$fetch({
                method: "POST",
                name: "sys/city/online/list",
                data: this.userGeo
            }).then(
                data => {
                    this.Data.areaList = jsonTree(data.areaList, {
                        id: 'areaCode',
                        pid: 'parentCode',
                        children: 'children'
                    })
                    this.Data.areaListDeep = JSON.parse(JSON.stringify(this.Data.areaList))
                    this.$notice.loading.hide()
                },
                error => {
                    // 错误回调
                    this.$notice.toast({
                        message: "获取城市失败"
                    })
                }
            )
        }
    },
    components: {
        WxcSearchbar,
        AmList,
        CityTip,
        AmListRadio
    }
}
</script>
