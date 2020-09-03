<template>
<div class="container index">
    <div class="links">
        <router-link to="/panorama/spherical" class="link">2:1球面全景图 Spherical Panorama</router-link>
        <router-link to="/foo" class="link">GLTF模型</router-link>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.index{
    padding:12px;
}
.links{
    display:flex;
    flex-flow:column;
}

.link{
    line-height:24px;
    padding:0 12px;
    text-decoration:none;
}
</style>
