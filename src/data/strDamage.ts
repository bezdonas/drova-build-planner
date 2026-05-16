// Physical damage % by STR.
// Values 27..111 are taken from the in-game table.
// STR < 27: pattern continues backward from STR 27 = 44 with alternating -1, -2 deltas.
// STR > 111: every additional point of STR adds 1%.

const STR_DAMAGE_TABLE: Record<number, number> = {
  27: 44, 28: 45, 29: 47, 30: 48, 31: 50, 32: 51, 33: 52, 34: 54, 35: 55,
  36: 56, 37: 58, 38: 59, 39: 60, 40: 62, 41: 63, 42: 64, 43: 65, 44: 67,
  45: 68, 46: 69, 47: 71, 48: 72, 49: 73, 50: 74, 51: 76, 52: 77, 53: 78,
  54: 79, 55: 80, 56: 82, 57: 83, 58: 84, 59: 85, 60: 87, 61: 88, 62: 89,
  63: 90, 64: 91, 65: 93, 66: 94, 67: 95, 68: 96, 69: 97, 70: 99, 71: 100,
  72: 101, 73: 102, 74: 103, 75: 104, 76: 106, 77: 107, 78: 108, 79: 109,
  80: 110, 81: 111, 82: 112, 83: 114, 84: 115, 85: 116, 86: 117, 87: 118,
  88: 119, 89: 120, 90: 122, 91: 123, 92: 124, 93: 125, 94: 126, 95: 127,
  96: 128, 97: 130, 98: 131, 99: 132, 100: 133, 101: 134, 102: 135, 103: 136,
  104: 138, 105: 139, 106: 140, 107: 141, 108: 142, 109: 143, 110: 144, 111: 146,
}

export function strDamagePercent(str: number): number {
  if (str >= 27 && str <= 111) return STR_DAMAGE_TABLE[str]
  if (str > 111) return 146 + (str - 111)

  let value = 44
  let useTwo = false
  for (let s = 26; s >= str; s--) {
    value -= useTwo ? 2 : 1
    useTwo = !useTwo
  }
  return value
}
