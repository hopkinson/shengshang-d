<style>
.container {
    flex: 1;
}

.map {
    flex: 1;
}

.cs-map__list {
    width: 750px;
    flex: 100;
}

.cs-map__geo {
    position: fixed;
    bottom: 50;
    right: 20;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    border-width: 1;
    border-style: dashed;
    border-color: #eaeaea;
}

.cs-map--value {
    font-size: 20px;
}

.cs-info_window {
    width: 100px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
}
</style>

<template>
<div class="cs-map">
    <wxc-searchbar v-if="readOnly" ref="search" placeholder="搜索城市" @wxcSearchbarInputOnInput="handleSearchPlace" @wxcSearchbarCancelClicked="handleCancelSearch"></wxc-searchbar>
    <scroller class="cs-map__list" v-if="showList">
        <wxc-cell :title="item.name" :key="index" v-for="(item,index) in Data.tips" :desc="item.address | filterAddress" @wxcCellClicked="handleChoosePlace(item)">
            <text class="cs-map--value">{{item.district}}</text>
        </wxc-cell>
    </scroller>
    <weex-amap class="map" ref="map" :zoom="zoom" :center="pos">
        <weex-amap-marker :position="pos" icon="http://p3j4k9r3e.bkt.clouddn.com/icon_dd_in.png"  >
        </weex-amap-marker>
    </weex-amap>
    <c-icon value="&#xe71b;" size="50" v-if="readOnly" color="grey" class="cs-map__geo" @click="handleGetGEO(pos)"></c-icon>
</div>
</template>

<script>
import {
    WxcSearchbar,
    WxcCell
} from "weex-ui"
import {
    gaode_web_key,
    gaode_android_key,
    gaode_icon
} from 'Const/key'
const url_tip = 'http://restapi.amap.com/v3/assistant/inputtips'
const regeo_tip = 'http://restapi.amap.com/v3/geocode/regeo'
const axios = weex.requireModule('bmAxios')
var amap = weex.requireModule('amap')

export default {
    data() {
        return {
            icon: gaode_icon,
            pos: [],
            zoom: 13,
            Data: {
                tips: [],
                regeo: [],
                choose: {}
            },
            Show: {
                loading: false
            },
            Type: {}
        };
    },
    components: {
        WxcSearchbar,
        WxcCell
    },
    created() {
        amap.initAmap(gaode_android_key)
    },
    eros: {
        beforeAppear(params) {
            if (params.hasOwnProperty('page')) {
                this.Type = params.page
                if (this.Type.readOnly && this.Type.fromType.includes('end')) {
                    this.pos = [params.destinationX, params.destinationY]
                }
                if (this.Type.readOnly && this.Type.fromType.includes('start')) {
                    this.pos = [params.originX, params.originY]
                }
                // 如果 只读 => 不显示右导航条
                if (!this.Type.readOnly) {
                    this.handleGetGEO()
                    this.$navigator.setRightItem({
                        text: '确定地点',
                        fontSize: '28'
                    }, () => {
                        this.$router.setBackParams(this.choose)
                        this.$router.back()
                    })
                }
            }
        }
    },
    filters: {
        filterAddress(val) {
            if (!val || !val.length) {
                return ''
            }
            return val
        }
    },
    computed: {
        readOnly() {
            return Object.keys(this.Type).length !== 0 && !this.Type.readOnly
        },
        showList() {
            return this.Data.tips.length
        }
    },
    methods: {
        // 取消 - 搜索
        handleCancelSearch() {
            this.$tools.resignKeyboard()
            this.Data.tips = []
            this.$refs.search.setValue('')
        },
        // 单元格 - 择地方
        handleChoosePlace(item) {
            let {
                location,
                name
            } = item
            this.pos = location.split(',').map(i => Number(i))
            this.handleCancelSearch()
            this.choose = {
                ...item,
                originX: this.pos[0],
                originY: this.pos[1],
                ...this.Type
            }
        },
        handleSearchPlace(e) {
            this.loadTip(e.value)
        },
        loadTip(value) {
            axios.fetch({
                method: 'GET',
                url: url_tip,
                data: {
                    key: gaode_web_key,
                    keywords: value
                },
                timeout: 3000
            }, resData => {
                let {
                    tips
                } = resData.data
                this.Data.tips = tips
            })
        },
        // 获取当前位置
        handleGetGEO() {
            this.$geo.get().then(
                data => {
                    let {
                        locationLng,
                        locationLat
                    } = data
                    this.pos = [locationLng, locationLat]
                    this.loadRegeo(this.pos)
                },
                error => {
                    this.$notice.toast({
                        message: "获取位置失败"
                    })
                    error()
                }
            )
        },
        loadRegeo(value) {
            this.Show.loading = true
            axios.fetch({
                method: 'GET',
                url: regeo_tip,
                data: {
                    key: gaode_web_key,
                    location: value.toString(),
                    extensions: 'all'
                },
                timeout: 3000
            }, resData => {
                let {
                    addressComponent,
                    pois
                } = resData.data.regeocode
                this.pos = pois[0].location.split(',').map(i => Number(i))
                this.Show.loading = false
                this.choose = {
                    ...addressComponent,
                    ...pois[0],
                    district: addressComponent.province + addressComponent.city + addressComponent.district,
                    originX: this.pos[0],
                    originY: this.pos[1],
                    ...this.Type
                }
            })
        }
    }
}
</script>
