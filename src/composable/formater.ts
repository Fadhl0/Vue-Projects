
export const formater = (num: Date) => {

  const date = num.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const spliter: string[] = date.split(" ");
  const state = spliter[1]?.toLowerCase() === "pm" ? "\u200B\u200B \u200B م" : "ص";

  return [spliter[0], state];
}
