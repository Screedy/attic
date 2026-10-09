<script setup lang="ts">
// The one currency picker; attributes such as aria-label and size pass through to USelectMenu.
const model = defineModel<string>({ required: true })
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="currencies"
    class="w-28 shrink-0"
  />
</template>
