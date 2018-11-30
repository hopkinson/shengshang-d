<style lang="css" scoped>
.map {
    flex: 1;
}
</style>
<template>
<weex-amap class="map" ref="map" :zoom="zoom" :center="geo">
    <weex-amap-marker :position="geo" :icon="icon">
    </weex-amap-marker>
</weex-amap>
</template>
<script>
import {
    gaode_andriod_key,
    gaode_icon
} from 'Const/key'
var amap = weex.requireModule('amap')
export default {
    props: {
        icon: gaode_icon,
        geo: {
            type: Array,
            default: []
        },
        zoom: {
            type: Number,
            default: 13
        }
    },
    created() {
        amap.initAmap(gaode_andriod_key)
    },
    methods: {

    },
    components: {

    }
}
</script>
