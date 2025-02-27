<script setup>
import { ref } from 'vue';
import IdiomationArray from '../data/idiomation.json';
const Idioms = ref();
const drawVisible = ref(false);
</script>

<template>
    <div class="flex justify-content-between align-items-center px-1">
        <span class="p-2 cursor-pointer" @click="$router.push({name:'home' })"><i class="pi pi-arrow-left"></i></span>
        <h2 class="text-center">Idiomation</h2>
        <span  class="p-3"></span>
    </div>
    <div class="p-2">
        <div v-for="data in IdiomationArray"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center"
            :key="data.idiom" @click="Idioms = data; drawVisible = true">
            <div>{{ data.idiom }}</div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
    </div>
    <Drawer v-model:visible="drawVisible" header="Idiomation" class="surface-ground" position="full">
        <Card class="my-4">
            <template #title>
                Idiom
            </template>
            <template #content>
                <p>{{ Idioms.idiom }}</p>
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Meaning
            </template>
            <template #content>
                {{ Idioms.meaning }}
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Example
            </template>
            <template #content>
                {{ Idioms.example }}
            </template>
        </Card>





    </Drawer>

</template>