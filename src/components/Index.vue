<template>
    <div class="index-container">
        <!-- 头部区域 -->
        <Header></Header>
        <!-- 主体区域 -->
        <div class="index-main-box">
            <!-- 左侧边栏区域 -->
            <Aside></Aside>
            <!-- 右侧内容主体区域 -->
            <div class="index-main-body">
                <!-- 路由的视图 -->
                <router-view></router-view>
            </div>
        </div>
        <!-- <Foot></Foot> -->

    </div>
</template>

<script setup>
import Header from "./subcomponents/Header.vue";
import Foot from './subcomponents/Foot.vue';
import Aside from "./subcomponents/Aside.vue";
</script>

<style scoped>
.index-container {
    overflow-y: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .index-main-box {
        height: 55vh;
        display: flex;
    }
}
</style>