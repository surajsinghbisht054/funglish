<script setup>
import { ref } from 'vue';
import dictionary from '../data/dictionary.json';
const searchQuery = ref('');
const itemKeys = Object.keys(dictionary);
const searchResult = ref();

const performWordSearch = () => {
    searchResult.value = null;
    const query = searchQuery.value.toLocaleLowerCase();
    searchResult.value = dictionary[query];
}
const items = ref([]);
const suggestionSearch = () => {
    const query = searchQuery.value.toLocaleLowerCase().trim();
    items.value = itemKeys.filter(e => e.startsWith(query)).sort((a, b) => a.length - b.length).slice(0, 5);
    if(items.value.length === 1) {
        performWordSearch();
    }
}
</script>

<template>
    <div class="flex justify-content-between align-items-center px-1">
        <span class="p-2 cursor-pointer" @click="$router.push({name:'home' })"><i class="pi pi-arrow-left"></i></span>
        <h2 class="text-center">Dictionary</h2>
        <span  class="p-3"></span>
    </div>


    <InputGroup>
        <AutoComplete forceSelection  size="large" v-model="searchQuery" :suggestions="items" placeholder="Search" @option-select="performWordSearch" @complete="suggestionSearch" />
        <InputGroupAddon>
            <Button icon="pi pi-search" @click="performWordSearch" text />
        </InputGroupAddon>
    </InputGroup>

    <Card v-if="searchResult" style="margin-top: 20px">
        <template #title>
            {{searchResult.w.join(',')}}
        </template>
        <template #subtitle>
            {{ searchResult.p }}
        </template>
        <template #content>
            <p class="m-0" v-for="line in searchResult.e" :key="line">
                {{ line }}
            </p>
        </template>

    </Card>

</template>