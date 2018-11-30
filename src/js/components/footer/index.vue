<!-- 底部 -->

<style scoped>
.fm-footer {
    flex-direction: row;
    height: 144px;
    justify-content: center;
    align-items: center;
    padding: 0 48px;
}

.is-fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
}

.is-static {
    margin-top: 40px;
}
</style>
<template>
<div class="fm-footer" :class="setTypeClass" :style="{ backgroundColor: backgroundColor }">
    <slot></slot>
</div>
</template>


<script>
export default {
    computed: {
        setTypeClass() {
            return [this.type === 'fixed' ? 'is-fixed' : 'is-static']
        }
    },
    props: {
        backgroundColor: {
            type: String,
            default: 'transparent'
        },
        type: {
            type: String,
            default: 'fixed'
        }
    }
};
</script>
