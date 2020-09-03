<template>
    <div id="app" class="container">
        <router-view/>
    </div>
</template>

<script>
import router from '@/router'

export default {
    router
}
</script>

<style>
html, body, .container {
    width:100%;
    height:100%;
    overflow:hidden;
    padding:0;
    margin:0;
    font-size:12px;
    box-sizing:border-box;
}
</style>
