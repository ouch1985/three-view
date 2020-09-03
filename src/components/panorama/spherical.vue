<template>
    <div class="panorama">

    </div>
</template>

<script>
import SphericalPanorama from './spherical.js'

export default {
    props: {
        // 全景图的URL
        src: {
            type: String,
            default: null
        },


        /*
            热点
            [
                {type: 'icon', src: 'xxxx', position: {theta: xxx, phi: xxx}}
            ]
        */
        hotspots: {
            type: Array,
            default(){
                return [];
            }
        },

        // 全景图加载效果, 可选 planet(小行星开场)
        affect: {
            type: String,
            default: null
        },

        // 绕Y轴的水平转角
        theta: {
            type: Number,
            default: 0
        },

        // 与Y轴的垂直夹角
        phi: {
            type: Number,
            default: 0
        },

        // 自动转动
        auto: {
            type: Boolean,
            default: false
        },

        // 电子罗盘
        compass: {
            type: Boolean,
            default: false
        }
    },

    mounted(){
        this.panorama = new SphericalPanorama(this.$el);
        this.panorama.reload(this.src);
    },

    beforeDestroy(){
        this.panorama.dispose();
    },

    methods: {

    }
}
</script>

<style>
.panorama{
    width:100%;
    height:100%;
    overflow:hidden;
}
</style>
