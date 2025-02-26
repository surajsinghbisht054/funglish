<script setup>
import { ref } from 'vue';
import DiscussionArray from '../data/discussion.json';
const conversation = ref();
const drawVisible = ref(false);
</script>

<template>
    <h2 class="text-center">Practice Conversation</h2>
    <div class="p-4">
        <div v-for="data in DiscussionArray"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center"
            :key="data.scenario" @click="conversation = data; drawVisible = true">
            <div>{{ data.scenario }}</div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
    </div>
    <Drawer v-model:visible="drawVisible" header="Conversation" class="surface-ground" position="full">
        <Card class="my-4">
            <template #title>
                Scenario
            </template>
            <template #content>
                <p>{{ conversation.scenario }}</p>
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Context
            </template>
            <template #content>
                <p>{{ conversation.context }}</p>
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Conversation
            </template>
            <template #content>
                <div v-for="line in conversation.conversation">
                    <div class="font-semibold">{{ line.speaker }}</div>
                    <p>{{ line.text }}</p>
                </div>
            </template>
        </Card>





    </Drawer>

</template>