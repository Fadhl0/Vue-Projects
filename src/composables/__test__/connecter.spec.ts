import { describe, it, expect } from 'vitest'
import { connecter } from "../connecter";

describe('connecter arabic letter', () => {

  it.each(["ب", "ت", "ث", "ج", "ح", "خ", "ن", "ه", "ي", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ئ"])
    ('all linked letters must have linked in both side', (val) => {
      expect(connecter(val, 1, 'ت')).toEqual(["ـــ", val, "ـــ"]);
      expect(connecter(val, 0, null)).toEqual([30, val, "ـــ"]);
      expect(connecter(val, 4, 'ت')).toEqual(["ـــ", val, 30]);
    });

  it.each(["ا", "د", "ذ", "ر", "ز", "ة", "و", "ؤ", "ى"])
    ('all rigth linked letters must have padding at least once', (val) => {
      expect(connecter(val, 1, 'ت')).toEqual(["ـــ", val, 30]);
      expect(connecter(val, 0, null)).toEqual([30, val, 30]);
      expect(connecter(val, 4, 'ت')).toEqual(["ـــ", val, 30]);
      expect(connecter(val, 4, 'ر')).toEqual([30, val, 30]);

    });

  it.each(["ء"])
    ('all unlinked letters must have padding in both side', (val) => {
      expect(connecter(val, 1, 'ت')).toEqual([30, val, 30]);
      expect(connecter(val, 0, null)).toEqual([30, val, 30]);
      expect(connecter(val, 4, 'ت')).toEqual([30, val, 30]);
    });

});
