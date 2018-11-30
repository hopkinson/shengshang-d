<template>
<image @load="onLoad" :src="src" :style="getStyle" />
</template>
<script>
export default {
    data: () => ({
        width: 100,
        height: 100
    }),
    props: ['src'],
    computed: {
        getStyle() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    methods: {
        onLoad(e) {
            if (e.success && e.size && e.size.naturalWidth > 0) {
                this.width = e.size.naturalWidth
                this.height = e.size.naturalHeight
            }
        }
    }
}
</script>
