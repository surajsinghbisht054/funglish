<script setup>
import { UseScreenSafeArea } from '@vueuse/components'

</script>

<template>
    <UseScreenSafeArea top bottom>
        <main style="padding-bottom: 5rem;">
            <RouterView />
        </main>
    </UseScreenSafeArea>
</template>
<style>
:root {
    --font-size: 16px;
}
</style>