<template>
    <div v-for="item in pexelsList" :key="item.id">
        <item-vue :data="item" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'


const query = {
    page: 1,
    size: 20
}

const pexelsList = ref([])
const getPexelsData = async () => {
    const res = await getPexelsList(query)
    pexelsList.value = res.list
}
getPexelsData()
</script>

<style lang="scss" scoped></style>