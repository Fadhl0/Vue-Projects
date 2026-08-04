import { useActiveStore } from "@/stores/activeAdhan";
import { onMounted, onUnmounted } from "vue";

type Pare = [string, string];

export function getActiveAdhan(prayers: Pare[]) {
  let timer: number | null = null;
  const active = useActiveStore();

  // this function written by Gemini
  function update() {
    if (!prayers || prayers.length !== 6) return;

    const now = new Date().getTime();
    let currentActiveIndex = -1;
    let nextPrayerTime: number | null = null;

    for (let i = 0; i < 6; i++) {
      const prayerDate = parseDate(prayers[i] as Pare).getTime();

      if (now >= prayerDate) {
        currentActiveIndex = i;
      } else {
        nextPrayerTime = prayerDate;
        break;
      }
    }

    if (currentActiveIndex === -1) {
      currentActiveIndex = 5;
    }

    active.setActive(currentActiveIndex);

    if (nextPrayerTime !== null) {
      const delay = nextPrayerTime - now;

      if (timer) clearTimeout(timer);

      timer = window.setTimeout(update, delay + 100);
    }
  }


  onMounted(() => {
    update();
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { update };
}


function parseDate([timeStr, period]: Pare): Date {
  const [hourStr, minStr] = timeStr.split(":") as Pare;
  let hour = Number.parseInt(hourStr, 10);
  const min = Number.parseInt(minStr, 10);

  if (period === "\u200B\u200B \u200B م" && hour < 12) {
    hour += 12;
  } else if (period === "ص" && hour === 12) {
    hour = 0;
  }

  const dateObject = new Date();
  dateObject.setHours(hour, min, 0, 0);
  return dateObject;
}
