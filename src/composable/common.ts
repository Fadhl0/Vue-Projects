import { toast } from 'vue-sonner';
import { useFetch } from '@vueuse/core';

export function copy(link: string) {
  navigator.clipboard.writeText(link);
  toast.success('Copied to clipboard');
}

export async function downloadGif(url: string, name: string, extension: string = 'gif') {
  toast.info('Downloading GIF...')

  const { data, error } = await useFetch(url).blob()

  if (error.value || !data.value) {
    return toast.error('Failed to download GIF')
  }

  const a = document.createElement('a')
  a.href = URL.createObjectURL(data.value)
  a.download = name.replaceAll(" ", "-") + '.' + extension;
  a.click()
  URL.revokeObjectURL(a.href)

  toast.success('GIF saved to downloads')
}
