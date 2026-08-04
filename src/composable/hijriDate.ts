import { useAdjectStore } from "@/stores/adjestTime";
import { computed } from "vue";

export const days: Array<string> = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "{}", "{@", "{#", "{$", "{%", "{^", "{&", "{*", "{(", "P", "O}", "O@", "O#", "O$", "O%", "O^", "O&", "O*", "O(", "I", "U}", "U@"];

const hijriDate = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
  day: 'numeric',
  month: 'numeric',
});

export const getHijri = computed(() => {
  const adject = useAdjectStore().getAdject;
  const date = new Date();
  date.setDate(date.getDate() + adject);

  const hijriArr = hijriDate.formatToParts(date);
  const hijriDay = hijriArr.find(p => p.type === 'day')?.value;
  const hijriMonth = hijriArr.find(p => p.type === 'month')?.value;

  const dayNumber = Number(hijriDay);
  const monthNumber = Number(hijriMonth);

  const fontDay = days[dayNumber - 1] ?? '!';
  const fontMonth = monthNumber.toString(16).toUpperCase();

  return { fontDay, fontMonth };
})
