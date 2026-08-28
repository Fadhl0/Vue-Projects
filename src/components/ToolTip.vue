<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

defineProps<{ tip: string }>()
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="400">
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p class="font-semibold">{{ tip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
