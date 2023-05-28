<template>
    <div>
        <m-waterfall :data="pexelsList" :picturePreReading="false" class="w-full px-1" :column="isMobileTerminal ? 2 : 5">
            <template v-slot="{ item, width }">
                <itemVue :data="item" :width="width" />
            </template>
        </m-waterfall>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'


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