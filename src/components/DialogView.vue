<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check, Copy } from '@lucide/vue'
import { ref } from 'vue'
import type { IGif } from '@giphy/js-types'
import { copy } from '@/composable/common'
import { useTimeoutFn } from '@vueuse/core'
import SaveAs from './SaveAs.vue'

const open = defineModel<boolean>('open', { default: false })
const copied = ref(false);
const props = defineProps<{ curr: IGif | null }>();

const { start } = useTimeoutFn(() => {
  copied.value = false
}, 2000, { immediate: false });

function triggerCopy() {
  copied.value = true;
  copy(props.curr?.url ?? '');
  start();
}
</script>

<template>
  <Dialog v-model:open="open">
    <form>
      <DialogContent class="sm:max-w-106.25">
        <Tabs default-value="link">
          <DialogHeader>
            <DialogTitle>
              <TabsList>
                <TabsTrigger value="link">
                  Link
                </TabsTrigger>
                <TabsTrigger value="download">
                  Download
                </TabsTrigger>
              </TabsList>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div class="flex w-full flex-col gap-6">
            <TabsContent value="link">
              <div class="title mb-5">
                <h3 class="leading-none font-semibold pb-2">Share link</h3>
                <p class="text-muted-foreground text-sm">
                  Anyone who has this link will be able to view this.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 gap-2 flex flex-nowrap items-center flex-row">
                  <Input id="link" :default-value="curr?.url" readonly />
                  <Button variant="outline" class="w-fit" @click="triggerCopy">
                    <Copy v-show="!copied" />
                    <Check v-show="copied" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="download">
              <div class="flex flex-col items-center gap-7">
                <img :src="curr?.images.original?.webp" class="w-55 h-auto">
                <SaveAs :title="curr?.title ?? ''" :links="curr" />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
