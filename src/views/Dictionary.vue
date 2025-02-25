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
    const query = searchQuery.value.toLocaleLowerCase();
    items.value = itemKeys.filter(e => e.startsWith(query)).sort(function(a, b){return b.length - a.length}).slice(0, 5);

}
</script>

<template>
    <h2 class="text-center">Dictionary</h2>

    <InputGroup>
        <AutoComplete forceSelection  size="large" v-model="searchQuery" :suggestions="items" placeholder="Search" @complete="suggestionSearch" />
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