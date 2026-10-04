<script setup lang="ts">
const props = defineProps<{ values: Record<string, number> }>()

const VISIBLE = 3
const expanded = ref(false)
const formatted = computed(() => formatPurchaseValues(props.values))
const shown = computed(() => expanded.value ? formatted.value : formatted.value.slice(0, VISIBLE))
</script>

<template>
  <p class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
    <span
      v-for="value in shown"
      :key="value"
      class="whitespace-nowrap"
    >{{ value }}</span>
    <button
      v-if="formatted.length > VISIBLE"
      type="button"
      :aria-expanded="expanded"
      class="text-xs font-bold tracking-normal text-white/80 underline-offset-2 hover:text-white hover:underline"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : `Show ${formatted.length - VISIBLE} more` }}
    </button>
  </p>
</template>
