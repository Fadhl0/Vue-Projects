const naturl = new Set(["ب", "ت", "ث", "ج", "ح", "خ", "ن", "ه", "ي", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ئ"]);
const left = new Set(["ا", "د", "ذ", "ر", "ز", "ة", "و", "ؤ", "ى"]);
const none = new Set(["ء"]);

export const allLetters = new Set([...naturl, ...left, ...none])

const buffer = 3;
const paddingValue = 10;

export const connecter = (letter: string, index: number, previous: string | null) => {
  if (!letter) return "";
  if (!allLetters.has(letter)) return "";

  const padding = paddingValue * buffer;
  const connect = "ـ".repeat(buffer);

  // connection
  const prevCanConnectLeft = previous ? naturl.has(previous) : false;
  const currCanConnectRight = naturl.has(letter) || left.has(letter);
  const currCanConnectLeft = naturl.has(letter);

  // boundaries
  const connectsToPrev = prevCanConnectLeft && currCanConnectRight && index > 0;
  const connectsToNext = currCanConnectLeft && index < 4;

  const leading = connectsToPrev ? connect : padding;
  const trailing = connectsToNext ? connect : padding;

  return [leading, letter, trailing];
}
