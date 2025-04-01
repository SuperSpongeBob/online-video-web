<template>
    <h3>forgetPassword</h3>
    该功能暂未实现
    <button @click="returnLogin">返回</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router=useRouter()
const returnLogin=()=>{
    router.push('/login')
}
</script>