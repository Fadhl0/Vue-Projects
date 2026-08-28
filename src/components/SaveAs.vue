<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { IGif } from '@giphy/js-types';
import { downloadGif } from '@/composable/common';

const saveAs = [
  { name: 'gif', id: 1 },
  { name: 'mp4', id: 2 },
  { name: 'webp', id: 3 },
];

const props = defineProps<{ links: IGif | null, title: string }>();

async function downloading(extension: string) {
  let link = "";
  switch (extension) {
    case 'webp':
      link = props.links?.images.original.webp || ''
      break;
    case 'mp4':
      link = props.links?.images.original.mp4 || ''
      break;
    default:
      link = props.links?.images.original.url || ''
      break;
  }

  await downloadGif(link, props.title, extension)
}
</script>

<template>
  <ButtonGroup>
    <Button variant="outline" @click="downloading('')">
      Download
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="icon">
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="[--radius:1rem]">
        <DropdownMenuGroup>
          <DropdownMenuItem v-for="v in saveAs" :key="v.id" @click="downloading(v.name)">
            Save as {{ v.name }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
