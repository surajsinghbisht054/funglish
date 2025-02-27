<script setup>
import { UseScreenSafeArea } from '@vueuse/components'

</script>

<template>
    <UseScreenSafeArea top right bottom left>
        <RouterView />
    </UseScreenSafeArea>
</template>
<style>
:root {
    --font-size: 16px;
}
</style>